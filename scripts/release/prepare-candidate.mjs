import assert from 'node:assert/strict';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { appendFileSync } from 'node:fs';
import {
  hashes,
  packageName,
  repository,
  readJson,
  validatePackage,
  verifyCandidate,
} from './contracts.mjs';

const root = process.cwd();
const commit = process.env.GITHUB_SHA;
assert.match(
  commit || '',
  /^[a-f0-9]{40}$/,
  'Candidate preparation requires the exact CI source SHA.',
);
assert.equal(process.env.GITHUB_REPOSITORY, repository);
const manifest = await readJson(resolve(root, 'packages/react/package.json'));
validatePackage(manifest);
const report = await readJson(resolve(root, 'artifacts/package/last-run.json'));
assert.equal(report.status, 'passed');
const bytes = await readFile(report.tarball);
const digest = hashes(bytes);
assert.equal(digest.sha256, report.sha256, 'The packed test report is stale.');
const directory = resolve(root, 'artifacts/release');
await mkdir(directory, { recursive: true });
const filename = basename(report.tarball);
await cp(report.tarball, resolve(directory, filename));
const verification =
  JSON.stringify(
    {
      status: report.status,
      sha256: report.sha256,
      verified: report.verified,
      started: report.started,
      finished: report.finished,
    },
    null,
    2,
  ) + '\n';
await writeFile(resolve(directory, 'verification.json'), verification);
const candidate = {
  schemaVersion: 1,
  packageName,
  version: manifest.version,
  repository,
  commit,
  workflowRun: process.env.GITHUB_RUN_ID || null,
  filename,
  ...digest,
  verificationSha256: hashes(verification).sha256,
  tag: `${packageName}@${manifest.version}`,
};
await writeFile(resolve(directory, 'candidate.json'), JSON.stringify(candidate, null, 2) + '\n');
await verifyCandidate(directory, { commit, repository });
const artifact = `release-candidate-${commit}-${process.env.GITHUB_RUN_ATTEMPT || '1'}`;
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `artifact=${artifact}\n`);
const notes = await readFile(resolve(root, 'packages/react/CHANGELOG.md'), 'utf8');
await writeFile(resolve(directory, 'release-notes.md'), notes);
const summary = `## Release candidate\n\n- Package: \`${packageName}@${manifest.version}\`\n- Commit: \`${commit}\`\n- SHA-256: \`${digest.sha256}\`\n- Tests: catalog plus isolated packed consumer\n- Artifact: \`${artifact}\`\n\nPublishing requires the protected npm-production approval and explicit release enablement.\n`;
await writeFile(resolve(directory, 'summary.md'), summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
console.log(summary);
