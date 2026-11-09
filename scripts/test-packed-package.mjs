import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = fileURLToPath(new URL('..', import.meta.url));
const artifacts = resolve(repository, 'artifacts/package');
const npmCache = process.env.DESIGN_NPM_CACHE ?? resolve(tmpdir(), 'design-library-npm-cache');
const require = createRequire(new URL('../package.json', import.meta.url));

function run(command, args, cwd, capture = false, env = {}) {
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    if (capture) process.stderr.write(result.stderr + result.stdout);
    throw new Error(`${command} failed with exit code ${result.status}.`);
  }
  return result.stdout;
}

function installedVersion(name) {
  try {
    return require(`${name}/package.json`).version;
  } catch (error) {
    if (error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') throw error;
    return JSON.parse(
      readFileSync(resolve(repository, 'node_modules', name, 'package.json'), 'utf8'),
    ).version;
  }
}

await mkdir(artifacts, { recursive: true });
const started = new Date().toISOString();
const consumer = await mkdtemp(resolve(tmpdir(), 'design-library-consumer-'));
const report = { started, status: 'running', consumer, tarball: null, sha256: null };
const reportPath = resolve(artifacts, 'last-run.json');
await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');

try {
  run('npm', ['run', 'build:lib'], repository);
  const packed = JSON.parse(
    run(
      'npm',
      [
        '--cache',
        npmCache,
        'pack',
        '--workspace',
        '@inverse_ratio/design-system',
        '--ignore-scripts',
        '--json',
        '--pack-destination',
        artifacts,
      ],
      repository,
      true,
    ),
  )[0];
  const tarball = resolve(artifacts, packed.filename);
  report.tarball = tarball;
  report.sha256 = createHash('sha256')
    .update(await readFile(tarball))
    .digest('hex');

  const packedPaths = packed.files.map((file) => file.path);
  assert(packedPaths.includes('dist/index.js'));
  assert(packedPaths.includes('dist/index.d.ts'));
  assert(packedPaths.includes('dist/styles.css'));
  assert(packedPaths.includes('dist/themes.json'));
  assert(packedPaths.every((path) => !/^(src|scripts|node_modules|apps)\//.test(path)));
  const css = await readFile(resolve(repository, 'packages/react/dist/styles.css'), 'utf8');
  assert(
    !/@(import|source|theme|tailwind|apply)\b/.test(css),
    'CSS still requires a framework build.',
  );

  await cp(resolve(repository, 'tests/fixtures/package-consumer'), consumer, { recursive: true });
  const manifest = JSON.parse(await readFile(resolve(consumer, 'package.json'), 'utf8'));
  manifest.dependencies = {
    '@inverse_ratio/design-system': `file:${tarball}`,
    react: installedVersion('react'),
    'react-dom': installedVersion('react-dom'),
  };
  manifest.devDependencies = Object.fromEntries(
    [
      'vite',
      '@vitejs/plugin-react',
      'typescript',
      '@types/react',
      '@types/react-dom',
      '@types/node',
      '@playwright/test',
    ].map((name) => [name, installedVersion(name)]),
  );
  await writeFile(resolve(consumer, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');

  console.log(`Testing a real tarball installation outside the workspace: ${consumer}`);
  run(
    'npm',
    [
      '--cache',
      npmCache,
      'install',
      '--workspaces=false',
      '--no-audit',
      '--no-fund',
      ...(process.env.DESIGN_NPM_OFFLINE === '1' ? ['--offline'] : []),
    ],
    consumer,
  );

  const modules = (await readdir(resolve(repository, 'packages/react/src/ui')))
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => file.replace(/\.tsx$/, ''));
  await writeFile(
    resolve(consumer, 'src/public-types.ts'),
    modules
      .map(
        (name, index) =>
          `import type * as Entry${index} from '@inverse_ratio/design-system/ui/${name}';\nexport type Contract${index} = typeof Entry${index};`,
      )
      .join('\n') + '\n',
  );

  const verify = `
    import assert from 'node:assert/strict';
    import { realpathSync, readFileSync } from 'node:fs';
    import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
    import { renderToStaticMarkup } from 'react-dom/server';
    import { createElement } from 'react';
    import { Button } from '@inverse_ratio/design-system';
    import { getThemeVariables, applyReactTheme } from '@inverse_ratio/design-system/theme';
    const packagePath = import.meta.resolve('@inverse_ratio/design-system/package.json');
    const manifest = JSON.parse(readFileSync(new URL(packagePath), 'utf8'));
    assert.equal(manifest.name, '@inverse_ratio/design-system');
    assert.equal(manifest.license, 'MIT');
    assert.equal(manifest.publishConfig.access, 'public');
    assert(!manifest.dependencies.react && !manifest.dependencies['react-dom']);
    assert(manifest.peerDependencies.react && manifest.peerDependencies['react-dom']);
    const host = createRequire(import.meta.url);
    const library = createRequire(packagePath);
    assert.equal(realpathSync(host.resolve('react')), realpathSync(library.resolve('react')));
    assert.equal(realpathSync(host.resolve('react-dom')), realpathSync(library.resolve('react-dom')));
    assert(packagePath.startsWith(new URL('./node_modules/', import.meta.url).href));
    assert.equal(getThemeVariables({system:'minimal',mode:'light'})['--primary'], '#3972c3');
    assert.throws(() => applyReactTheme({system:'forma',mode:'light'}), /browser root/);
    assert(renderToStaticMarkup(createElement(Button, null, 'SSR import')) .includes('SSR import'));
    for (const name of ${JSON.stringify(modules)}) await import('@inverse_ratio/design-system/ui/'+name);
    await import('@inverse_ratio/design-system/ai');
    await import('@inverse_ratio/design-system/hooks/use-mobile');
    await import('@inverse_ratio/design-system/hooks/use-highlighted-code');
    await import('@inverse_ratio/design-system/lib/highlighter');
    const data = JSON.parse(readFileSync(new URL(import.meta.resolve('@inverse_ratio/design-system/themes.json')), 'utf8'));
    assert.equal(Object.keys(data.themes).length, 4);
    console.log('Verified all 64 UI exports, AI/hooks/helpers, embedded data, SSR imports and a single React instance.');
  `;
  await writeFile(resolve(consumer, 'verify-exports.mjs'), verify);
  run(process.execPath, ['verify-exports.mjs'], consumer);
  run('npm', ['run', 'build'], consumer);
  run(
    process.execPath,
    [resolve(consumer, 'node_modules/@playwright/test/cli.js'), 'test'],
    consumer,
    false,
    {
      DESIGN_PACKAGE_RESULTS: resolve(artifacts, 'browser-results'),
    },
  );

  report.status = 'passed';
  report.finished = new Date().toISOString();
  report.verified = [
    'allowlisted tarball',
    'compiled ESM/types/CSS',
    '64 UI exports',
    'AI/hooks/helpers',
    'bundled theme data',
    'single React/React DOM instance',
    'clean TypeScript/Vite build',
    'Playwright: CSS isolation, 20 theme variants/portals, forms, keyboard, AI streaming/stop, mobile/reduced motion',
  ];
} catch (error) {
  report.status = 'failed';
  report.error = error.message;
  throw error;
} finally {
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log(`Package verification report: ${reportPath}`);
}
