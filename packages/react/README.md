# Design Library React package

React 19 components and AI interface patterns built on shadcn/ui, with Forma,
Minimal, Nocturne, and Brutalism identities. Design values remain exploratory.
The package is configured for public npm publication as
`@inverse_ratio/design-system` under MIT, with upstream notices retained.
Version 0.1.0 is published. Future releases use the approval-gated GitHub
workflows after npm trusted publishing and environment protection are configured.

## Build and verify the installable artifact

From the repository root, using Node 22.12+ and npm:

```sh
npm install
npm run build:lib
npm run test:package
```

`build:lib` produces ESM JavaScript, TypeScript declarations, compiled/scoped CSS,
an optional reset, and theme JSON under `packages/react/dist/`.
`test:package` builds and packs that output, installs the actual tarball into a
fresh temporary application outside the workspace, typechecks/builds the consumer,
and runs Playwright against it. No publication occurs.

The tarball and verification report are written to `artifacts/package/` at the
repository root. Install the resulting tarball in another application with
`npm install /absolute/path/to/inverse_ratio-design-system-0.1.0.tgz`.
React and React DOM are external peer dependencies (`^19.0.0`); a consuming app
must use compatible versions. CSS does not require Tailwind or a plugin in the
consumer. No CommonJS build or older-React compatibility is claimed.

## Use components

In a browser application entry point:

```tsx
import '@inverse_ratio/design-system/styles.css';
import { applyReactTheme } from '@inverse_ratio/design-system/theme';
import { Button } from '@inverse_ratio/design-system/ui/button';
import { TooltipProvider } from '@inverse_ratio/design-system/ui/tooltip';

applyReactTheme({ system: 'minimal', mode: 'dark', accent: 1 });

export function Example() {
  return (
    <TooltipProvider>
      <Button>Create project</Button>
    </TooltipProvider>
  );
}
```

The main entry also exports Button, Card anatomy, Input, Label, Badge, Switch and
theme helpers. Individual subpaths avoid collecting unrelated components.
All UI/hook/AI entries preserve a client boundary. The separate `theme` entry can
resolve variables without a DOM; `applyReactTheme()` itself requires a browser
root. No Next.js/RSC compatibility claim follows from the Node SSR import smoke test.

## Choose a design identity

The same component imports work across all four systems. Apply a selection on
browser initialization or in your application’s theme-switch handler:

```ts
applyReactTheme({ system: 'forma', mode: 'light', accent: 0 });
applyReactTheme({ system: 'minimal', mode: 'dark', accent: 1 });
applyReactTheme({ system: 'nocturne', mode: 'dark', accent: 2 });
applyReactTheme({ system: 'brutalism', mode: 'light', accent: 0 });
```

These calls demonstrate alternatives; the last selection applied owns the root.

| System | Light / dark expression | Accent indices |
| --- | --- | --- |
| Forma | Light / Dark | 0: fresh green |
| Minimal | Blueprint / Command | 0: Blueprint Blue; 1: Terracotta Orange; 2: Emerald Green |
| Nocturne | Daydream / Nebula | 0: Ultraviolet / Iris; 1: Orchid / Magenta; 2: Iris / Cool Refraction |
| Brutalism | Manifesto / Underground | 0: Acid Lime; 1: Industrial Orange; 2: Electric Violet |

Pass `light` or `dark` as the mode, rather than the display expression name.
The theme changes component geometry, icon strokes, typography and motion as
well as colors. Load any desired fonts yourself; font files are not bundled.

For custom application surfaces, use `--background`, `--foreground`, `--card`,
`--border`, `--font-sans` and `--radius`. The identity accent is `--signal`;
shadcn’s `--accent` is the quieter hover/selection surface. Primary actions use
`--primary` and `--primary-foreground`: Forma light uses ink, while the other
expressions follow the selected signal. Use packaged components to inherit the
full identity anatomy rather than recreating it with generic token styling.

## Public entry points

| Import | Output |
| --- | --- |
| `@inverse_ratio/design-system` | Common components and theme helpers, with declarations |
| `@inverse_ratio/design-system/ui/button` | Individual shadcn module; all 64 UI modules are exported |
| `@inverse_ratio/design-system/ai` | Typed local AI compositions |
| `@inverse_ratio/design-system/theme` | Pure variable resolver and browser theme applicator |
| `@inverse_ratio/design-system/themes.json` | Packaged registry data |
| `@inverse_ratio/design-system/styles.css` | Compiled utilities, component baseline and identity styles |
| `@inverse_ratio/design-system/reset.css` | Optional global Tailwind Preflight |
| `@inverse_ratio/design-system/hooks/*` | Public hook entries with declarations |
| `@inverse_ratio/design-system/lib/*` | Public helpers/highlighter with declarations |

## CSS and theme ownership

Import `styles.css` once. It contains compiled utilities and identity anatomy,
scoped to `.design-theme`; it has no unprocessed framework directives and needs
no consumer-side Tailwind scan. The default stylesheet does not import a global
Preflight reset or change host paragraph/body margins. Only opted-in component
anatomy receives its minimal baseline. Utility classes used internally are an
implementation detail, not an application-wide utility API.

If the application deliberately wants an application-wide reset, import
`reset.css` **before** `styles.css`. It is separate because existing applications
may own their resets and typography. The catalog uses its own Tailwind pipeline.

`applyReactTheme()` sets variables, system/mode attributes and `.dark` on the
root document element by default. This includes portaled dialogs and menus.
An isolated per-widget theme requires a coordinated portal container; the package
does not solve mixed independent portal themes automatically.

The build embeds the shared JSON into the theme JavaScript and includes a copy
as `themes.json`. Consumers never need `packages/foundations/`, a source alias,
or access to this repository. `getThemeVariables()` is safe to call without a DOM.
Invalid system/mode/accent selections raise descriptive errors; Forma supports
only accent 0. Exact fonts depend on local availability and system fallbacks.

## AI compositions

```tsx
import { Chat, type ChatTransport } from '@inverse_ratio/design-system/ai';

const transport: ChatTransport = async function* (prompt, signal) {
  if (signal.aborted) return;
  yield `Local preview: ${prompt.text}`;
};

export function Assistant() {
  return <Chat transport={transport} />;
}
```

Exports include Chat, Conversation, Message, PromptInput, AgentTrace, Reasoning,
ChainOfThought, Plan, Queue, Task, Tool, Subagent, Confirmation, Checkpoint, Context,
Sources, InlineCitation, FileTree, ModelSelector, Suggestion, Terminal, StackTrace
and TestResults. They compose installed shadcn primitives following the current
[AI pattern approach](https://ui.shadcn.com/docs/ai-elements).

The catalog and consumer tests use labeled fixtures. No model, upload, tool,
terminal command or backend is connected. A consumer supplies its own abort-aware
transport. Messages render text rather than arbitrary HTML; rich Markdown,
authentication and persistence are not part of this implementation.

## Maintain and review

- Run `npm run build` for both library and catalog output.
- Run `npm run test:react` for the catalog browser suite.
- Run `npm run test:package` for the actual installed artifact.
- Run `npm run format:react` for local React/app/build/test code. Vendored upstream
  source and generated snippets are excluded from formatting.
- Run `npm run snippets` after example changes or formatting; snippets are generated
  with the TypeScript AST and browser discovery uses generated metadata.

The build generates readable, unminified ESM modules with shared chunks and keeps
runtime packages external. Package contents are explicitly allowlisted; source,
fixtures, apps, dependencies and build scripts do not ship. `prepack` builds when
packing from the source workspace; the isolated verification runner builds first
and then packs with scripts disabled to test the exact prepared bytes.

See `UPSTREAM.md`, `upstream-manifest.json` and `LICENSE.shadcn` for preserved
source provenance. See the repository’s `docs/architecture/RELEASE_SETUP.md` for Changesets,
GitHub approval protection, npm trusted publishing and recovery. Account
settings must be verified before enabling publication.
