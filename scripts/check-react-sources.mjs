import { readFileSync } from 'node:fs';
import ts from 'typescript';
const snippets = JSON.parse(
  readFileSync(new URL('../apps/react-library/src/demo-usage.json', import.meta.url), 'utf8'),
);
const native = JSON.parse(
  readFileSync(new URL('../packages/components/catalog.js', import.meta.url), 'utf8')
    .replace(/^window.ComponentCatalog = /, '')
    .replace(/;\s*$/, ''),
);
for (const { name } of native)
  if (!snippets[name]) throw new Error('Missing React coverage for ' + name);
if (Object.keys(snippets).length !== 90) throw new Error('Expected 90 complete UI and AI examples');
for (const [name, source] of Object.entries(snippets)) {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
    fileName: name + '.tsx',
    reportDiagnostics: true,
  });
  const errors =
    result.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error) || [];
  if (errors.length)
    throw new Error(
      name +
        ': ' +
        errors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, ' ')).join('; '),
    );
}
console.log(
  'All native catalog names have React examples; all 90 extracted TSX compositions parse.',
);
