import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import YAML from 'yaml';
import {
  hashes,
  packageName,
  repository,
  registryVersion,
  validateEnvironment,
  validatePackage,
  verifyCandidate,
  verifyRegistryIntegrity,
} from '../scripts/release/contracts.mjs';
import { verifyGithubGuards } from '../scripts/release/github-guards.mjs';

const commit = 'a'.repeat(40);
const manifest = {
  name: packageName,
  version: '0.1.0',
  license: 'MIT',
  repository: { url: `git+https://github.com/${repository}.git` },
  publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' },
};
const protectedEnvironment = {
  can_admins_bypass: false,
  deployment_branch_policy: { protected_branches: true },
  protection_rules: [
    {
      type: 'required_reviewers',
      prevent_self_review: true,
      reviewers: [{ type: 'User', reviewer: { id: 123 } }],
    },
  ],
};

async function fixture(run) {
  const directory = await mkdtemp(resolve(tmpdir(), 'design-release-test-'));
  try {
    await mkdir(resolve(directory, 'package'));
    await writeFile(resolve(directory, 'package/package.json'), JSON.stringify(manifest));
    const packed = spawnSync('tar', [
      '-czf',
      resolve(directory, 'candidate.tgz'),
      '-C',
      directory,
      'package',
    ]);
    assert.equal(packed.status, 0);
    const digest = hashes(await readFile(resolve(directory, 'candidate.tgz')));
    const proof = JSON.stringify({ status: 'passed', sha256: digest.sha256 });
    await writeFile(resolve(directory, 'verification.json'), proof);
    const candidate = {
      schemaVersion: 1,
      packageName,
      version: manifest.version,
      repository,
      commit,
      filename: 'candidate.tgz',
      tag: `${packageName}@${manifest.version}`,
      ...digest,
      verificationSha256: hashes(proof).sha256,
    };
    const save = () => writeFile(resolve(directory, 'candidate.json'), JSON.stringify(candidate));
    await save();
    await run({ directory, candidate, save });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('only the approved public MIT package metadata is publishable', () => {
  validatePackage(manifest);
  for (const invalid of [
    { private: true },
    { name: '@other/package' },
    { license: undefined },
    { version: '0.1.0-beta.1' },
    { publishConfig: { access: 'restricted' } },
  ]) {
    assert.throws(() => validatePackage({ ...manifest, ...invalid }));
  }
});

test('candidate verification binds tested bytes, source SHA and packed metadata', async () =>
  fixture(async ({ directory }) => {
    const result = await verifyCandidate(directory, { commit, repository });
    assert.equal(result.manifest.name, packageName);
    await assert.rejects(
      verifyCandidate(directory, { commit: 'b'.repeat(40), repository }),
      /source changed/,
    );
    await writeFile(resolve(directory, 'candidate.tgz'), 'tampered');
    await assert.rejects(verifyCandidate(directory, { commit, repository }), /digest changed/);
  }));

test('traversal and unverified/stale test evidence are rejected', async () =>
  fixture(async ({ directory, candidate, save }) => {
    candidate.filename = '../candidate.tgz';
    await save();
    await assert.rejects(verifyCandidate(directory, { commit, repository }));
    candidate.filename = 'candidate.tgz';
    const falseProof = JSON.stringify({ status: 'failed', sha256: candidate.sha256 });
    await writeFile(resolve(directory, 'verification.json'), falseProof);
    candidate.verificationSha256 = hashes(falseProof).sha256;
    await save();
    await assert.rejects(verifyCandidate(directory, { commit, repository }), /did not pass/);
  }));

test('required reviewers, no bypass and branch protection remain mandatory with self-review allowed', () => {
  validateEnvironment(protectedEnvironment, { protected: true });
  assert.throws(() =>
    validateEnvironment({ ...protectedEnvironment, protection_rules: [] }, { protected: true }),
  );
  assert.throws(() =>
    validateEnvironment({ ...protectedEnvironment, can_admins_bypass: true }, { protected: true }),
  );
  assert.throws(() => validateEnvironment(protectedEnvironment, { protected: false }));
  validateEnvironment(
    {
      ...protectedEnvironment,
      protection_rules: [
        { type: 'required_reviewers', prevent_self_review: false, reviewers: [{}] },
      ],
    },
    { protected: true },
  );
  assert.throws(() =>
    validateEnvironment(
      {
        ...protectedEnvironment,
        protection_rules: [
          { type: 'required_reviewers', prevent_self_review: false, reviewers: [] },
        ],
      },
      { protected: true },
    ),
  );
});

test('a candidate is rejected when main advanced while waiting for approval', async () => {
  const github = {
    rest: {
      repos: {
        getEnvironment: async () => ({ data: protectedEnvironment }),
        getBranch: async () => ({ data: { protected: true, commit: { sha: 'b'.repeat(40) } } }),
      },
    },
  };
  await assert.rejects(
    verifyGithubGuards(github, {
      repo: { owner: 'muditxsharma', repo: 'design-system' },
      sha: commit,
    }),
    /Main advanced/,
  );
});

test('npm not-found differs from registry/auth failures; conflicting bytes are rejected', async () => {
  assert.equal(await registryVersion('0.1.0', async () => ({ status: 404 })), null);
  await assert.rejects(
    registryVersion('0.1.0', async () => ({ status: 403, ok: false })),
    /stopped/,
  );
  const integrity = hashes('approved').integrity;
  verifyRegistryIntegrity({ dist: { integrity } }, integrity);
  assert.throws(() => verifyRegistryIntegrity({ dist: { integrity: 'different' } }, integrity));
});

test('publishing cannot be invoked from a local shell', () => {
  const result = spawnSync(process.execPath, ['scripts/release/publish.mjs'], {
    encoding: 'utf8',
    env: { ...process.env, GITHUB_ACTIONS: 'false' },
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /only supported in the approved CI job/);
});

test('workflow actions are pinned and publication has isolated permissions and approval dependencies', async () => {
  const pins = JSON.parse(await readFile('scripts/release/action-pins.json', 'utf8'));
  const workflows = {};
  for (const name of ['ci', 'version', 'release']) {
    workflows[name] = YAML.parse(await readFile(`.github/workflows/${name}.yml`, 'utf8'));
    for (const job of Object.values(workflows[name].jobs))
      for (const step of job.steps || []) {
        if (!step.uses) continue;
        const [action, sha] = step.uses.split('@');
        assert.match(sha, /^[a-f0-9]{40}$/);
        assert.equal(sha, pins[action].sha);
      }
  }
  const release = workflows.release;
  assert.equal(release.jobs.publish.environment, 'npm-production');
  assert.deepEqual(release.jobs.publish.needs, ['candidate', 'protection']);
  assert.match(release.jobs.publish.if, /NPM_RELEASE_ENABLED/);
  assert.equal(release.jobs.publish.permissions['id-token'], 'write');
  assert.equal(release.jobs.publish.permissions.contents, 'read');
  assert.equal(release.jobs.publish.concurrency['cancel-in-progress'], false);
  for (const [name, job] of Object.entries(release.jobs)) {
    if (name !== 'publish') assert.notEqual(job.permissions?.['id-token'], 'write');
  }
  const version = workflows.version.jobs.version;
  assert.notEqual(version.permissions['id-token'], 'write');
  const action = version.steps.find((step) => step.uses?.startsWith('changesets/action@'));
  assert.equal(action.with.publish, undefined);
  assert.equal(action.with.version, 'npm run version-packages');
  const candidateRuns = release.jobs.candidate.steps.map((step) => step.run).filter(Boolean);
  assert(candidateRuns.includes('npm run test:package'));
  assert(candidateRuns.includes('npm run test:react'));
});

test('Changesets versions the scoped library and updates its private consumer dependency', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'design-version-test-'));
  try {
    await mkdir(resolve(directory, 'packages/library'), { recursive: true });
    await mkdir(resolve(directory, 'apps/catalog'), { recursive: true });
    await mkdir(resolve(directory, '.changeset'));
    await writeFile(
      resolve(directory, 'package.json'),
      JSON.stringify({ private: true, workspaces: ['packages/*', 'apps/*'] }),
    );
    await writeFile(resolve(directory, 'packages/library/package.json'), JSON.stringify(manifest));
    await writeFile(
      resolve(directory, 'apps/catalog/package.json'),
      JSON.stringify({
        name: 'private-catalog',
        version: '0.1.0',
        private: true,
        dependencies: { [packageName]: '0.1.0' },
      }),
    );
    await writeFile(
      resolve(directory, '.changeset/config.json'),
      await readFile('.changeset/config.json'),
    );
    await writeFile(
      resolve(directory, '.changeset/example.md'),
      `---\n"${packageName}": minor\n---\n\nAdd a fixture component.\n`,
    );
    assert.equal(spawnSync('git', ['init', '-q'], { cwd: directory }).status, 0);
    assert.equal(spawnSync('git', ['add', '.'], { cwd: directory }).status, 0);
    assert.equal(
      spawnSync(
        'git',
        [
          '-c',
          'user.name=Fixture',
          '-c',
          'user.email=fixture@example.invalid',
          'commit',
          '-qm',
          'Fixture',
        ],
        { cwd: directory },
      ).status,
      0,
    );
    const result = spawnSync(
      process.execPath,
      [resolve('node_modules/@changesets/cli/bin.js'), 'version'],
      { cwd: directory, encoding: 'utf8' },
    );
    assert.equal(result.status, 0, result.stderr + result.stdout);
    const library = JSON.parse(await readFile(resolve(directory, 'packages/library/package.json')));
    const app = JSON.parse(await readFile(resolve(directory, 'apps/catalog/package.json')));
    assert.equal(library.version, '0.2.0');
    assert.equal(app.dependencies[packageName], '0.2.0');
    assert.match(
      await readFile(resolve(directory, 'packages/library/CHANGELOG.md'), 'utf8'),
      /fixture component/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
