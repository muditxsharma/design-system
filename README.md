# Design Library — shadcn + AI

The primary implementation uses **React 19, TypeScript, Tailwind 4, and official
shadcn/ui source**, extended with Forma, Minimal, Nocturne and Brutalism identities.
It includes **68 core UI examples and 22 AI patterns**, with light/dark expressions
and the existing accent families carried through component anatomy.


## Understand the project and design guidance

- [Documentation index](docs/README.md)
- [Project structure and data flow](docs/architecture/PROJECT_STRUCTURE.md)
- [Separate design-system references and skills](docs/design/DESIGN_SYSTEMS.md)
- [Central GitHub contribution guide](.github/DESIGN_SYSTEMS.md)
- [Proposed npm approval/release flow](docs/architecture/NPM_RELEASE_ARCHITECTURE.md)
- [Proposed cross-application design MCP](docs/architecture/MCP_ARCHITECTURE.md)

Release and MCP documents are architecture only. No workflow/server implementation
or publication is configured by them. Skills are versioned under `.agents/skills/`.

## Run

Use Node 22.12+ and npm from the repository root:

```sh
npm install
npm run dev
```

Open **http://127.0.0.1:5173**. React requires a server; opening a source HTML file
directly does not run it. `npm run build` builds the reusable package and creates `apps/react-library/dist/`.

## Reuse and references

- [React package and usage](packages/react/README.md)
- [Upstream source/provenance](packages/react/UPSTREAM.md)
- [React core and AI coverage](docs/design/REACT_COMPONENT_COVERAGE.md)
- [Library source of truth](docs/design/LIBRARY_SPEC.md)
- [Structured Chaos specification](docs/design/STRUCTURED_CHAOS_DESIGN_SPEC.md)
- [Forma specification](docs/design/FORMA_DESIGN_SPEC.md)

`packages/react/src/ui/` contains 64 official shadcn modules;
`packages/react/src/ai/` contains local typed AI compositions built on them.
`packages/foundations/` is the shared exploratory theme registry.
`apps/react-library/` is the interactive React catalog.

The earlier [native HTML catalog](index.html), [Structured Chaos showcase](structuredChaos.html),
and [Forma showcase](forma.html) are preserved. Their native component APIs are
separate from the new React implementation.

## Checks

```sh
npm run typecheck
npm run build
npm run test:react
npm run test:static
npm run test:package
npm run check:react-sources
```

Chromium tests cover all 90 example mounts and representative interactions.
Tokens remain exploratory; broader contrast, screen-reader and cross-browser
verification is pending. AI examples are labeled local fixtures with no live
model, backend, upload, or tool execution. Supply your own transport for a product.

## Installable package preparation

`npm run build:lib` creates JavaScript, declarations, compiled/scoped CSS and bundled
foundation data in `packages/react/dist/`. `npm run test:package` packs that output,
installs it into a fresh application outside the workspace, and runs strict
TypeScript/build checks plus Playwright functional tests. See
[package build and testing](docs/architecture/PACKAGE_BUILD_AND_TESTING.md).

React and React DOM are peer dependencies. Package CSS does not require Tailwind
in a consuming application; a global reset is an optional separate import.
The library is configured as public MIT `@inverse_ratio/design-system`; it remains
unpublished. See [release setup](docs/architecture/RELEASE_SETUP.md) for account
configuration before enabling the approval-gated workflows.
Use `npm run format:react` for local source and `npm run snippets` afterward.
