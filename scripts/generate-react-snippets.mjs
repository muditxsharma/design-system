// Extract real demo compositions and their local dependencies; do not invent API examples.
import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
const result = {};
const catalog = { ui: [], ai: [] };
function identifiers(node) {
  const set = new Set();
  function visit(n) {
    if (ts.isIdentifier(n)) set.add(n.text);
    ts.forEachChild(n, visit);
  }
  visit(node);
  return set;
}
for (const filename of ['ui-demos.tsx', 'ai-demos.tsx']) {
  const source = ts.createSourceFile(
    filename,
    readFileSync(new URL('../apps/react-library/src/' + filename, import.meta.url), 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const declarations = new Map(),
    imports = [];
  let definitions;
  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement)) imports.push(statement);
    if (ts.isFunctionDeclaration(statement) && statement.name)
      declarations.set(statement.name.text, statement);
    if (ts.isVariableStatement(statement))
      for (const decl of statement.declarationList.declarations)
        if (ts.isIdentifier(decl.name)) {
          declarations.set(decl.name.text, statement);
          if (decl.name.text === 'definitions') definitions = decl.initializer;
        }
  }
  for (const entry of definitions.elements) {
    const name = entry.elements[0].text;
    catalog[filename === 'ui-demos.tsx' ? 'ui' : 'ai'].push({
      name,
      group: filename === 'ui-demos.tsx' ? entry.elements[1].text : 'AI Elements',
    });
    const component = entry.elements[filename === 'ui-demos.tsx' ? 3 : 1];
    if (name === 'Chart') {
      result[name] = readFileSync(
        new URL('../apps/react-library/src/ChartDemo.tsx', import.meta.url),
        'utf8',
      );
      continue;
    }
    const selected = new Set(),
      references = new Set();
    function collect(node) {
      for (const identifier of identifiers(node)) {
        references.add(identifier);
        if (
          declarations.has(identifier) &&
          !selected.has(identifier) &&
          identifier !== 'definitions'
        ) {
          selected.add(identifier);
          collect(declarations.get(identifier));
        }
      }
    }
    collect(component);
    const usedImports = imports.filter((statement) => {
      const clause = statement.importClause;
      if (!clause) return false;
      if (clause.name && references.has(clause.name.text)) return true;
      const bindings = clause.namedBindings;
      if (bindings && ts.isNamespaceImport(bindings)) return references.has(bindings.name.text);
      return (
        bindings &&
        ts.isNamedImports(bindings) &&
        bindings.elements.some((element) => references.has(element.name.text))
      );
    });
    const local = [...selected].map((key) => declarations.get(key));
    const ordered = [...new Set(local)].sort((a, b) => a.pos - b.pos);
    let exported;
    if (ts.isIdentifier(component)) exported = 'export default ' + component.text;
    else
      exported =
        'export default function Demo() { return (' + component.body.getText(source) + ') }';
    result[name] =
      [
        ...usedImports.map((n) => n.getText(source)),
        ...ordered.map((n) => n.getText(source)),
        exported,
      ].join('\n\n') + '\n';
  }
}
writeFileSync(
  new URL('../apps/react-library/src/demo-usage.json', import.meta.url),
  JSON.stringify(result, null, 2) + '\n',
);
console.log('Extracted ' + Object.keys(result).length + ' real component and AI compositions.');

writeFileSync(
  new URL('../apps/react-library/src/catalog-manifest.json', import.meta.url),
  JSON.stringify(catalog, null, 2) + '\n',
);
