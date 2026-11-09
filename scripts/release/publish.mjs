import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import {
  registry,
  repository,
  verifyCandidate,
  registryVersion,
  verifyRegistryIntegrity,
} from './contracts.mjs';

assert.equal(
  process.env.GITHUB_ACTIONS,
  'true',
  'Publishing is only supported in the approved CI job.',
);
assert.equal(process.env.GITHUB_REPOSITORY, repository);
assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
assert.equal(process.env.NPM_RELEASE_ENABLED, 'true', 'Repository release enablement is required.');
assert(
  process.env.ACTIONS_ID_TOKEN_REQUEST_URL && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
  'The protected job must have npm OIDC credentials. No token fallback is implemented.',
);
const { candidate, tarball } = await verifyCandidate(resolve('artifacts/release'), {
  commit: process.env.GITHUB_SHA,
  repository: process.env.GITHUB_REPOSITORY,
});
const existing = await registryVersion(candidate.version);
if (existing) {
  verifyRegistryIntegrity(existing, candidate.integrity);
  console.log(
    'Exact package bytes already exist; continuing with release verification, not republishing.',
  );
} else {
  const result = spawnSync(
    'npm',
    [
      'publish',
      tarball,
      '--registry',
      registry,
      '--access',
      'public',
      '--tag',
      'latest',
      '--ignore-scripts',
    ],
    { stdio: 'inherit' },
  );
  // Even an interrupted publish may have succeeded. Verify before deciding whether a retry is safe.
  if (result.error)
    console.error('npm publish returned an execution error; checking registry state.');
  let verified = false;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (attempt) await new Promise((done) => setTimeout(done, 1000 * 2 ** attempt));
    const metadata = await registryVersion(candidate.version);
    if (metadata) {
      verifyRegistryIntegrity(metadata, candidate.integrity);
      verified = true;
      break;
    }
  }
  assert(
    verified,
    `Publication was not verified (npm exit ${result.status}). Rerun only after checking registry state.`,
  );
}
console.log(
  `Verified ${candidate.packageName}@${candidate.version} with the approved artifact integrity.`,
);
