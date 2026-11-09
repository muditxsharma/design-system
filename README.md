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
- [npm approval/release architecture](docs/architecture/NPM_RELEASE_ARCHITECTURE.md)
- [Proposed cross-application design MCP](docs/architecture/MCP_ARCHITECTURE.md)

npm release workflows are implemented; account setup is documented in
[Release setup](docs/architecture/RELEASE_SETUP.md). MCP remains a proposal.
Skills are versioned under `.agents/skills/`.

## Design-system style reference

Forma is an independent system. Minimal, Nocturne and Brutalism form the
Structured Chaos family. Their component anatomy changes along with their
foundations; switching systems changes more than accent color and radius.

This reference describes **current exploratory implementation values**, not
approved production tokens or verified accessibility conformance. The focused
specifications linked below remain authoritative for design intent. Palette
values come from [themes.json](packages/foundations/themes.json); React mappings
come from [theme.ts](packages/react/src/theme.ts), and component treatments from
[identity.css](packages/react/src/identity.css).

| System | Light expression | Dark expression | Character |
| --- | --- | --- | --- |
| Forma | Light | Dark | Natural surfaces, friendly groups, soft controls |
| Minimal / The Architect | Blueprint | Command | Continuous divisions, technical labels, precise controls |
| Nocturne / The Dreamer | Daydream | Nebula | Dimensional layers, controlled refraction, quiet functional planes |
| Brutalism / The Rebel | Manifesto | Underground | Hard framing, condensed hierarchy, mechanical state changes |

### Install and apply a stylesheet

```sh
npm install @inverse_ratio/design-system react@^19 react-dom@^19
```

```tsx
import '@inverse_ratio/design-system/styles.css';
import { applyReactTheme } from '@inverse_ratio/design-system/theme';
import { Button } from '@inverse_ratio/design-system/ui/button';

// Run in browser initialization, before rendering the application.
applyReactTheme({ system: 'minimal', mode: 'light', accent: 1 });

export function Example() {
  return <Button>Create project</Button>;
}
```

`styles.css` is compiled and requires no Tailwind setup in the consuming app.
For an intentional global reset, import `@inverse_ratio/design-system/reset.css`
**before** `styles.css`; otherwise the app keeps its existing reset and margins.
The default document root receives `.design-theme`, `data-system`, `data-mode`
and `.dark` in dark mode, so portaled dialogs and menus inherit the same theme.
Independent widget themes need coordinated portal containers.

Use `mode: 'light' | 'dark'`, not display names such as `nebula` or `command`.
Accent indices are listed below. Changing an accent updates its signal, signal
text, border and wash; background and main text retain the system's base palette.

### Semantic CSS contract

| React CSS variable | Role |
| --- | --- |
| `--background`, `--foreground` | Page background and primary text |
| `--card`, `--card-foreground` | Grouped component surface and text |
| `--popover`, `--popover-foreground` | Overlay surface and text; mapped to the card palette |
| `--muted`, `--muted-foreground` | Wash surface and secondary text |
| `--signal`, `--signal-foreground` | Identity accent and text on that accent |
| `--primary`, `--primary-foreground` | Primary action; follows signal except Forma light's ink action |
| `--secondary`, `--secondary-foreground` | Wash surface and foreground text |
| `--accent`, `--accent-foreground` | shadcn hover/selection surface: wash and foreground, **not** the signal color |
| `--border`, `--input` | Rules and input boundaries |
| `--ring` | Focus accent, mapped to signal |
| `--radius` | Foundation radius; individual component anatomy can override it |
| `--font-sans`, `--font-display`, `--font-mono` | Body, display and technical font stacks |
| `--destructive`, `--success`, `--warning`, `--info` | Independent status colors |

For custom application UI, consume these variables rather than copying hex values:

```css
.application-panel {
  color: var(--card-foreground);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-family: var(--font-sans);
}

.application-panel__title {
  font-family: var(--font-display);
}

.application-panel__signal {
  color: var(--signal-foreground);
  background: var(--signal);
}
```

This generic panel illustrates token usage. Use the packaged Card and other
components to inherit each system's complete anatomy, including sectional rules,
refractive borders or offset shadows. Avoid a universal radius/shadow override
that would erase those differences. Native HTML uses separate `.ds` styles and
`DesignLibrary.applyTheme`; its `--accent` corresponds to React's `--signal`.

### Forma

[Focused specification](docs/design/FORMA_DESIGN_SPEC.md).

Natural surfaces and generous grouping create a friendly, calm interface.
Light mode uses an ink primary button with white text; dark mode uses the green
signal with dark text. Green remains the identity accent in both modes.

- **Controls:** 9px button/input corners; buttons use weight 600. Badges,
  avatars and switches are pill shaped.
- **Groups:** 16px cards with a subtle `0 3px 10px #20231e08` shadow;
  23px, weight-500 card titles with −0.7px tracking.
- **Navigation:** 11px tab groups, 4px inset, 8px triggers; selected tabs use
  the card surface with a small shadow.
- **Icons and motion:** rounded 1.8px Lucide strokes; 150ms color, border and
  shadow transitions using `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- **AI anatomy:** message bubbles use `16px 16px 16px 4px` corners.

| Typography / geometry | Current value |
| --- | --- |
| Body | `Arial, sans-serif` |
| Display | `Arial, sans-serif` |
| Technical | `ui-monospace, monospace` |
| Foundation radius | `12px` |

Base palette (accent index 0):

| Token | Light · light | Dark · dark |
| --- | --- | --- |
| `--background` | `#f6f7f3` | `#171a15` |
| `--card` | `#ffffff` | `#20241d` |
| `--foreground` | `#20231e` | `#edf0e8` |
| `--muted-foreground` | `#64695d` | `#adb5a4` |
| `--border` | `#d5dacd` | `#48513e` |
| `--signal` | `#b8f36b` | `#b8f36b` |
| `--signal-foreground` | `#20231e` | `#20231e` |
| `--muted` | `#eef1e8` | `#2c3426` |

**Accent 0:** fresh green `#b8f36b` in both modes; no other accent indices
are supported.

```ts
applyReactTheme({ system: 'forma', mode: 'dark', accent: 0 });
```

### Minimal

[Focused specification](docs/design/systems/MINIMAL_DESIGN_SPEC.md).

Continuous divisions, proportional organization and restrained emphasis keep
information precise. Blueprint and Command retain the same technical structure.

- **Controls and overlays:** square corners and no decorative shadow, even
  though the foundation radius token is 2px. Labels use 11px monospace text
  with 0.4px tracking.
- **Groups:** 1px ruled cards with no outer padding or inter-section gap;
  headers/content use 18px padding, footers use `14px 18px` padding.
- **Navigation and data:** segmented square tabs, a 2px signal underline on
  selection, continuous table divisions and tabular numerals.
- **Icons and motion:** 1.4px strokes with square caps and miter joins;
  110ms transitions using `cubic-bezier(0.2, 0.6, 0.3, 1)`.
- **AI anatomy:** ruled square message bubbles, a 1px trace rail and square
  code blocks/prompt controls carry the instrument-like structure forward.

| Typography / geometry | Current value |
| --- | --- |
| Body | `"Geist Sans", Arial, sans-serif` |
| Display | `"Geist Sans", Arial, sans-serif` |
| Technical | `"Geist Mono", ui-monospace, monospace` |
| Foundation radius | `2px` |

Base palette (accent index 0):

| Token | Blueprint · light | Command · dark |
| --- | --- | --- |
| `--background` | `#f1f5fa` | `#1c2735` |
| `--card` | `#f7f9fc` | `#243142` |
| `--foreground` | `#243142` | `#eff4fb` |
| `--muted-foreground` | `#566a80` | `#b7c7da` |
| `--border` | `#b9cee5` | `#50647e` |
| `--signal` | `#3972c3` | `#a6c9fb` |
| `--signal-foreground` | `#ffffff` | `#17293f` |
| `--muted` | `#e0eaf7` | `#2c4058` |

Accent mappings below are **signal / signal text / border / wash**. The family
name is a label; use these mode-specific values rather than the swatch color.

| Index | Family | Light mapping | Dark mapping |
| --- | --- | --- | --- |
| 0 | Blueprint Blue | `#3972c3` / `#fff` / `#b9cee5` / `#e0eaf7` | `#a6c9fb` / `#17293f` / `#50647e` / `#2c4058` |
| 1 | Terracotta Orange | `#a54d31` / `#fff` / `#d8b5a8` / `#f3e4dd` | `#dfa58e` / `#302019` / `#806257` / `#49342e` |
| 2 | Emerald Green | `#216f59` / `#fff` / `#a6cdbf` / `#deeee7` | `#8fcbb7` / `#152e25` / `#4d7566` / `#29483c` |

```ts
applyReactTheme({ system: 'minimal', mode: 'dark', accent: 0 });
```

### Nocturne

[Focused specification](docs/design/systems/NOCTURNE_DESIGN_SPEC.md).

Dimensional layers, controlled refraction, prismatic atmosphere and fluid
spatial transitions define the system. Functional surfaces remain opaque and
quieter than showcase compositions; text does not sit on decorative refraction.

- **Controls:** 11px corners; fields use the background plane and a subtle
  inset shadow. Button hover adds elevation and an inset highlight.
- **Groups:** 20px cards, a 1px gradient border around an opaque card plane,
  and `0 16px 28px #21133b20` elevation. Card titles are 24px, weight 500,
  with −0.8px tracking.
- **Overlays and navigation:** primary overlay treatments use 16px corners,
  signal-tinted top rules and deeper shadows; tabs use a 13px group, 5px inset
  and 9px triggers. Selected tabs occupy a raised card plane.
- **Icons and motion:** rounded 1.8px strokes; 260ms transitions using
  `cubic-bezier(0.2, 0.8, 0.2, 1)`. Supported opening overlays fade from 0.5
  opacity and move upward from a 7px offset.
- **AI anatomy:** dimensional message bubbles, 12px code/attachment groups,
  and a signal-edged prompt surface; tool and confirmation content stays readable.

| Typography / geometry | Current value |
| --- | --- |
| Body | `Sora, Arial, sans-serif` |
| Display | `"Space Grotesk", Arial, sans-serif` |
| Technical | `"Space Mono", ui-monospace, monospace` |
| Foundation radius | `16px` |

Base palette (accent index 0):

| Token | Daydream · light | Nebula · dark |
| --- | --- | --- |
| `--background` | `#f0eaf9` | `#21133b` |
| `--card` | `#fcf9ff` | `#302044` |
| `--foreground` | `#30213f` | `#f6efff` |
| `--muted-foreground` | `#6e587e` | `#c5b4d8` |
| `--border` | `#ccbddc` | `#69527e` |
| `--signal` | `#69429c` | `#d5b4fa` |
| `--signal-foreground` | `#ffffff` | `#29153e` |
| `--muted` | `#e4d8f3` | `#503471` |

Accent mappings below are **signal / signal text / border / wash**. The family
name is a label; use these mode-specific values rather than the swatch color.

| Index | Family | Light mapping | Dark mapping |
| --- | --- | --- | --- |
| 0 | Ultraviolet / Iris | `#69429c` / `#fff` / `#ccbddc` / `#e4d8f3` | `#d5b4fa` / `#29153e` / `#69527e` / `#503471` |
| 1 | Orchid / Magenta | `#854080` / `#fff` / `#d6b6d8` / `#eddaee` | `#e6ade2` / `#30172e` / `#835f85` / `#553255` |
| 2 | Iris / Cool Refraction | `#4f5198` / `#fff` / `#b9c5dc` / `#dde8f4` | `#b9c4f4` / `#201d3d` / `#5d6e90` / `#343e61` |

```ts
applyReactTheme({ system: 'nocturne', mode: 'dark', accent: 0 });
```

### Brutalism

[Focused specification](docs/design/systems/BRUTALISM_DESIGN_SPEC.md).

Hard graphic rules, condensed typography, controlled asymmetry and strong
contrast carry into every component. Manifesto and Underground preserve stable
signal hues while changing neutral surfaces and text.

- **Controls:** square corners, 2px foreground rules; uppercase 11px buttons
  at weight 750 with 0.5px tracking and a hard 3px offset shadow.
  Pressed buttons lose the shadow; disabled buttons use dashed borders.
- **Groups:** cards have 3px rules, a 9px top rule and 6px hard offset shadows.
  Titles use 30px condensed uppercase display type at line-height 1.
- **Navigation and data:** reversed active tabs and table headings;
  10px bold uppercase monospace labels with 0.6px tracking. Information remains
  in a predictable reading and keyboard order despite visual asymmetry.
- **Icons and motion:** 2.8px strokes with square caps and miter joins;
  70ms `steps(2, end)` timing. Buttons switch state without transitions;
  spinners use stepped timing.
- **AI anatomy:** square ruled message/code/tool surfaces, a 4px trace rail,
  and a prompt frame with a 3px rule and 4px hard offset shadow.

| Typography / geometry | Current value |
| --- | --- |
| Body | `"IBM Plex Sans", Arial, sans-serif` |
| Display | `"Barlow Condensed", Impact, sans-serif` |
| Technical | `"IBM Plex Mono", ui-monospace, monospace` |
| Foundation radius | `0px` |

Base palette (accent index 0):

| Token | Manifesto · light | Underground · dark |
| --- | --- | --- |
| `--background` | `#f2f0e9` | `#242424` |
| `--card` | `#f2f0e9` | `#242424` |
| `--foreground` | `#111111` | `#f2f0e9` |
| `--muted-foreground` | `#515149` | `#c2c0b6` |
| `--border` | `#111111` | `#aaa99e` |
| `--signal` | `#d9ff36` | `#d9ff36` |
| `--signal-foreground` | `#111111` | `#111111` |
| `--muted` | `#e3e0d6` | `#34342f` |

Accent mappings below are **signal / signal text / border / wash**. The family
name is a label; use these mode-specific values rather than the swatch color.

| Index | Family | Light mapping | Dark mapping |
| --- | --- | --- | --- |
| 0 | Acid Lime | `#d9ff36` / `#111` / `#111` / `#e3e0d6` | `#d9ff36` / `#111` / `#aaa99e` / `#34342f` |
| 1 | Industrial Orange | `#f26b2e` / `#111` / `#111` / `#e3e0d6` | `#f26b2e` / `#111` / `#aaa99e` / `#34342f` |
| 2 | Electric Violet | `#8955e8` / `#fff` / `#111` / `#e3e0d6` | `#8955e8` / `#fff` / `#aaa99e` / `#34342f` |

```ts
applyReactTheme({ system: 'brutalism', mode: 'dark', accent: 0 });
```

### Shared interaction and accessibility rules

- Preserve keyboard behavior, visible focus, entered values, field-adjacent
  validation and recovery across themes. Labels and structural cues accompany color.
- Status colors are independent of the selected identity accent:

  | Status | Light | Dark |
  | --- | --- | --- |
  | Error / destructive | `#b62e42` | `#f5939b` |
  | Success | `#216f59` | `#8fcbb7` |
  | Warning | `#865d13` | `#e0c078` |
  | Information | `#3972c3` | `#a6c9fb` |

- `prefers-reduced-motion: reduce` disables identity animations/transitions.
  Timing values above document current CSS behavior, not universal timings for
  every upstream animation.
- Font names are stacks, not bundled font assets. Load the chosen fonts in your
  application or the declared system fallbacks will render.
- The library does not define one authoritative global spacing scale. Preserve
  each component's implemented spacing rather than inventing a shared scale from
  the identity descriptions.
- AI components inherit the same typography, surfaces, status and focus rules.
  Catalog model/tool/terminal activity is fixture data; a product supplies its own
  transport and business behavior.

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
The public MIT package `@inverse_ratio/design-system@0.1.0` is published on npm. See [release setup](docs/architecture/RELEASE_SETUP.md) for account
configuration before enabling the approval-gated workflows.
Use `npm run format:react` for local source and `npm run snippets` afterward.
