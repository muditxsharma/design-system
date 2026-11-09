import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const outputDirectory = resolve(packageRoot, 'dist');
const packageManifest = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'));
const legacySourceAlias = '@design-library/react';

function run(command, args) {
  const result = spawnSync(command, args, { cwd: packageRoot, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}.`);
}

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? filesIn(path) : [path];
    }),
  );
  return groups.flat();
}

/** Scope generated utilities and default theme values; never scope keyframe percentages. */
function scopeStylesheet(css) {
  const tree = postcss.parse(css);
  tree.walkRules((rule) => {
    if (rule.parent?.type === 'rule') return; // Native CSS nesting already inherits its scope.
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === 'atrule' && parent.name.endsWith('keyframes')) return;
    }
    rule.selector = selectorParser((selectors) => {
      selectors.each((selector) => {
        let scoped = false;
        selector.walkClasses((node) => {
          if (node.value === 'design-theme') scoped = true;
        });
        selector.walkPseudos((node) => {
          if (node.value === ':root' || node.value === ':host') {
            node.replaceWith(selectorParser.className({ value: 'design-theme' }));
            scoped = true;
          }
        });
        if (!scoped) {
          const scope = selectorParser().astSync(':where(.design-theme)').first.first.clone();
          selector.prepend(selectorParser.combinator({ value: ' ' }));
          selector.prepend(scope);
        }
      });
    }).processSync(rule.selector);
  });
  return tree.toString();
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

// Preserve every supported public module and share internal chunks, leaving React and
// other runtime dependencies external so a consumer owns the React instance.
const sourceFiles = (await filesIn(resolve(packageRoot, 'src'))).filter((file) =>
  /\.(ts|tsx)$/.test(file),
);
const entryPoints = Object.fromEntries(
  sourceFiles.map((file) => [
    relative(resolve(packageRoot, 'src'), file).replace(/\.(ts|tsx)$/, ''),
    file,
  ]),
);
await build({
  entryPoints,
  alias: { [legacySourceAlias]: packageManifest.name },
  outdir: outputDirectory,
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  packages: 'external',
  chunkNames: 'chunks/[name]-[hash]',
  logOverride: { 'ignored-bare-import': 'silent', 'ignored-annotations': 'silent' },
});

// UI/hook entry points are client components; the pure theme subpath remains SSR-safe.
for (const file of await filesIn(outputDirectory)) {
  const name = relative(outputDirectory, file);
  if (file.endsWith('.js') && (name === 'index.js' || /^(ui|ai|hooks)\//.test(name))) {
    await writeFile(file, '"use client";\n' + (await readFile(file, 'utf8')));
  }
}

const tsc = fileURLToPath(import.meta.resolve('typescript/bin/tsc'));
run(process.execPath, [tsc, '--project', 'tsconfig.build.json']);

// NodeNext consumers also need explicit relative extensions in declarations.
for (const file of (await filesIn(outputDirectory)).filter((path) => path.endsWith('.d.ts'))) {
  const text = (await readFile(file, 'utf8')).replaceAll(
    legacySourceAlias + '/',
    packageManifest.name + '/',
  );
  await writeFile(
    file,
    text.replace(/(from\s+["'])(\.{1,2}\/[^"']+)(["'])/g, (match, before, path, after) =>
      /\.[a-z]+$/.test(path) ? match : `${before}${path}.js${after}`,
    ),
  );
}

const tailwind = resolve(
  dirname(fileURLToPath(import.meta.resolve('@tailwindcss/cli/package.json'))),
  'dist/index.mjs',
);
run(process.execPath, [tailwind, '-i', 'src/styles.css', '-o', 'dist/styles.css', '--minify']);
await writeFile(
  resolve(outputDirectory, 'styles.css'),
  scopeStylesheet(await readFile(resolve(outputDirectory, 'styles.css'), 'utf8')),
);
run(process.execPath, [tailwind, '-i', 'src/reset.css', '-o', 'dist/reset.css', '--minify']);
await cp(
  resolve(packageRoot, '../foundations/themes.json'),
  resolve(outputDirectory, 'themes.json'),
);

console.log(
  `Library built: ${Object.keys(entryPoints).length} ESM entries, declarations, scoped CSS, optional reset, and bundled theme data.`,
);
