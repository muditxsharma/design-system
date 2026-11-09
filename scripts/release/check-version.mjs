import { appendFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { readJson, registryVersion, validatePackage } from './contracts.mjs';

const manifest = await readJson('packages/react/package.json');
validatePackage(manifest);
const notes = (await readdir('.changeset')).filter(
  (file) => file.endsWith('.md') && file !== 'README.md',
);
const published = notes.length ? null : await registryVersion(manifest.version);
const needed =
  notes.length === 0 && (!published || process.env.GITHUB_EVENT_NAME === 'workflow_dispatch');
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `needed=${needed}\n`);
console.log(
  notes.length
    ? 'Pending release notes: wait for the version PR.'
    : needed
      ? 'Prepare a candidate for this exact commit.'
      : 'This version already exists; no automatic candidate needed.',
);
