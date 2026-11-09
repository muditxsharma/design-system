import assert from 'node:assert/strict';
import { environmentName, repository, validateEnvironment } from './contracts.mjs';

export async function verifyGithubGuards(github, context) {
  assert.equal(`${context.repo.owner}/${context.repo.repo}`, repository);
  const environment = await github.rest.repos.getEnvironment({
    ...context.repo,
    environment_name: environmentName,
  });
  const branch = await github.rest.repos.getBranch({ ...context.repo, branch: 'main' });
  validateEnvironment(environment.data, branch.data);
  assert.equal(
    branch.data.commit.sha,
    context.sha,
    'Main advanced after this candidate was prepared. Use the newer commit or re-dispatch the release.',
  );
}
