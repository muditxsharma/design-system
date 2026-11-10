import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

export const packageName = '@inverse_ratio/design-system';
export const repository = 'muditxsharma/design-system';
export const environmentName = 'npm-production';
export const registry = 'https://registry.npmjs.org';

export function validatePackage(manifest) {
  assert.equal(manifest.name, packageName, 'Unexpected package name.');
  assert.match(
    manifest.version,
    /^\d+\.\d+\.\d+$/,
    'Stable releases require a plain semantic version.',
  );
  assert.notEqual(manifest.private, true, 'The package is still private.');
  assert.equal(manifest.license, 'MIT', 'Expected the approved local-code license.');
  assert.equal(manifest.publishConfig?.access, 'public');
  assert.equal(manifest.publishConfig?.registry, registry + '/');
  const url = manifest.repository?.url?.replace(/^git\+/, '').replace(/\.git$/, '');
  assert.equal(url, `https://github.com/${repository}`);
}

export function validateEnvironment(environment, branch) {
  const rule = environment.protection_rules?.find((item) => item.type === 'required_reviewers');
  assert(rule?.reviewers?.length > 0, 'Configure required reviewers on npm-production.');
  // Self-review is allowed by repository policy; required approval still applies.
  assert.equal(
    environment.can_admins_bypass,
    false,
    'Disable administrator bypass for the release environment.',
  );
  assert.equal(
    environment.deployment_branch_policy?.protected_branches,
    true,
    'Restrict npm-production to protected branches.',
  );
  assert.equal(branch.protected, true, 'Protect the main branch before enabling releases.');
}

export function hashes(bytes) {
  return {
    sha256: createHash('sha256').update(bytes).digest('hex'),
    integrity: 'sha512-' + createHash('sha512').update(bytes).digest('base64'),
  };
}

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

export async function verifyCandidate(directory, expected) {
  const candidate = await readJson(resolve(directory, 'candidate.json'));
  assert.equal(candidate.schemaVersion, 1);
  assert.equal(candidate.packageName, packageName);
  assert.equal(candidate.repository, repository);
  assert.equal(
    candidate.commit,
    expected.commit,
    'Release source changed; prepare a fresh candidate.',
  );
  assert.equal(candidate.repository, expected.repository);
  assert.match(candidate.commit, /^[a-f0-9]{40}$/);
  assert.match(candidate.version, /^\d+\.\d+\.\d+$/);
  assert.equal(candidate.tag, `${packageName}@${candidate.version}`);
  assert.match(candidate.filename, /^[A-Za-z0-9._-]+\.tgz$/);
  assert.equal(basename(candidate.filename), candidate.filename);
  const tarball = resolve(directory, candidate.filename);
  const actual = hashes(await readFile(tarball));
  assert.equal(actual.sha256, candidate.sha256, 'Tarball digest changed after verification.');
  assert.equal(actual.integrity, candidate.integrity);

  const packed = spawnSync('tar', ['-xOf', tarball, 'package/package.json'], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  assert.equal(packed.status, 0, 'Unable to read packed metadata.');
  const manifest = JSON.parse(packed.stdout);
  validatePackage(manifest);
  assert.equal(manifest.version, candidate.version);
  const proof = await readFile(resolve(directory, 'verification.json'));
  assert.equal(hashes(proof).sha256, candidate.verificationSha256);
  const report = JSON.parse(proof);
  assert.equal(report.status, 'passed', 'Packed consumer tests did not pass.');
  assert.equal(report.sha256, actual.sha256);
  return { candidate, tarball, manifest };
}

export async function registryVersion(version, fetcher = fetch) {
  const response = await fetcher(`${registry}/${encodeURIComponent(packageName)}/${version}`, {
    signal: AbortSignal.timeout(20000),
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`npm lookup failed (${response.status}); publication is stopped.`);
  return response.json();
}

export function verifyRegistryIntegrity(metadata, integrity) {
  assert.equal(
    metadata?.dist?.integrity,
    integrity,
    'The npm version exists with different bytes. Never overwrite/reuse a version.',
  );
}
