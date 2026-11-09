# Design Library — source of truth

Version 0.5 · 2026-11-09 · Exploratory implementation

## Authority

This document governs the shared library architecture and catalog behavior.
[Structured Chaos](STRUCTURED_CHAOS_DESIGN_SPEC.md) governs its three identities.
[Forma](FORMA_DESIGN_SPEC.md) records the separate Forma direction from the
user-provided `forma.html`. Existing palette values and implementation choices
remain exploratory; no production readiness or accessibility conformance is claimed.

## Primary React implementation — v0.4

`packages/react/` is the primary reusable React implementation built on actual
shadcn/ui source. Run `npm install` then `npm run dev` at the repository root and
open http://127.0.0.1:5173. `apps/react-library/` contains its Vite/React 19 catalog.
The earlier native library below remains a preserved reference.

There are 64 installed official UI source modules, 68 core UI examples, and 22
local AI compositions built from those primitives. See
[React package documentation](../../packages/react/README.md),
[upstream provenance](../../packages/react/UPSTREAM.md), and
[React coverage](REACT_COMPONENT_COVERAGE.md) for exact boundaries.

Shared identity values map into shadcn variables. `applyReactTheme()` sets global
root theme state so Radix/Base UI portals remain coherent. Identity-specific
`data-slot` styles affect component anatomy and grouping, including AI surfaces.
The React API and native DOM-initializer API are separate implementations.
The active React app supports one document-wide theme at a time.

AI examples use supplied fixtures and an explicit local streaming simulation;
no real model, file upload, tool/agent execution, or backend is connected.
Consumers provide a `ChatTransport` that respects abort signals. Confirmation
records explicit decisions but never invokes a real tool. Messages render text
without unsafe HTML. Core examples expose real typed TSX compositions, extracted
from working demo code by `scripts/generate-react-snippets.mjs`.

Verification: production build and package typecheck pass; Chromium tests cover
all 90 mounts, portal theming across 20 combinations, dialog focus restoration,
form recovery, keyboard tabs, table filter, local chat send/stop and a narrow
reduced-motion layout. Four identity screenshots were inspected. Broader contrast,
screen-reader and cross-browser verification remains outstanding. The demo gallery
loads many primitives and is larger than a focused consuming app; chart code is
loaded separately. Use per-component imports in product code.

## Native reference layout and usage

- Root `index.html`: shared library entry point; open directly in a browser.
- `structuredChaos.html`: preserved Structured Chaos identity showcase.
- `forma.html`: preserved independent Forma showcase.
- `packages/foundations/`: theme JSON and matching buildless JS registry.
- `packages/components/`: reusable scoped CSS, native HTML catalog, behavior initializer.
- `apps/library/`: library UI scripts, styles, and usage documentation.

Four identities support light/dark expressions. Minimal, Nocturne, and Brutalism
retain their nine existing accent studies; Forma retains its green accent.
Theme and accent selection update all examples together without recreating
components or discarding entered form values. Selection is session-memory only.
The HTML markup is the component API; behavior is opt-in through
`DesignComponents.init(root)`. Repeated snippets need unique element IDs.

## Component catalog

67 entries now cover the 66 names on the official shadcn/ui component index,
plus an original Iconography specimen. See [coverage and interaction notes](COMPONENT_COVERAGE.md)
for the full list and implementation limits. These are native HTML studies,
not shadcn API-compatible implementations.
Examples include disabled, selected, invalid, and successful states where relevant.
Search and category filtering combine; zero matches show a clear empty state.
Each entry exposes escaped source markup and a copy action with selection fallback.
Use the shared component stylesheet and theme variables when consuming snippets.

Tab navigation supports Left/Right, Home/End, selected state, roving tab stops,
and linked panels. Dialog uses native showModal, Escape and method=dialog
cancellation. Email errors remain adjacent until resubmission; values are preserved.
Status semantics use text and structure independently of identity accents.
No data is sent, saved, or fetched by examples. Reduced motion is respected.

## Verification limits

Static source checks cover JavaScript syntax when the host JavaScriptCore is
available, registry parity, theme/accent mappings, local asset targets, unique
example IDs, and ARIA/label references. Browser interaction, visual reflow,
computed contrast, screen-reader announcements and focus behavior require
browser verification before production use.

## Identity iconography and microinteractions — v0.2

`packages/components/icons.js` provides original 24px SVG drawings with per-identity
path variants and shared semantics. Icons are decorative beside visible labels;
icon-only controls have explicit accessible names. Forma uses soft rounded
geometry, Minimal technical fine square strokes, Nocturne layered and refractive
motifs, and Brutalism thick angular structural shapes. Core motifs get distinct
geometry; remaining symbols share paths with identity-specific stroke treatment.
Catalog headings, system tiles, and component examples all use this icon system.

Motion remains a provisional study: Forma uses soft feedback; Minimal short
precise emphasis; Nocturne gentle depth and spatial reveals; Brutalism immediate
contrast and short stepped reveals. Targets do not jitter, errors do not wait
for animation, and no component autoplays a carousel. The spinner is an explicit
loading specimen. Reduced motion removes transitions and animations, retaining
all states and a static loading indicator. Functional forms remain quieter than
showcase illustrations.

Dialogs restore focus to their opener. Disclosures and popup examples support
Escape and relevant focus navigation; command search, table filtering/sorting,
calendar keyboard selection, OTP sanitization, counts, progress, message entry,
file/date feedback, pagination, selection toggles, and range resizing are local.
Use `DesignComponents.init(root)` after inserting examples; `DesignIcons.render(root)`
refreshes icons after changing a root identity. All behavior initialization is
idempotent. See the coverage document for native approximations and scope limits.

## Foundation-to-component expression — v0.3

Component anatomy and visualization now use four distinct treatments in the
reusable package stylesheet, alongside their shared semantic structure:

| Identity | Composition and grouping | Controls | Data and feedback |
| --- | --- | --- | --- |
| Forma | Soft independent groups; natural surfaces; friendly spacing | Ink-led light actions, quiet rounded fields, pill switches, round avatars | Gentle badges, relaxed tables, softly grouped tabs |
| Minimal | Continuous shared divisions, numbered technical specimen headers | Rectilinear actions, monospaced labels, precise field boundaries | Ruled tables/calendars, divided tabs, structural card subdivisions |
| Nocturne | Layered opaque planes with selective refractive edges | Inset fields, raised actions, floating tab surfaces | Quiet dense tables, restrained functional feedback, dimensional cards/dialogs |
| Brutalism | Hard rules, reversed numbered headers, controlled editorial proportions | Thick boundaries, stamped selections, square switches, assertive actions | Industrial tables, reversed badges, condensed display hierarchy, offset card framing |

These styles are in `packages/components/components.css`; they apply when
consuming components outside the catalog. The app adds identity-specific specimen
framing in `apps/library/library.css`, rather than using that framing to substitute
for component identity. Body text and dense data stay practical and readable.

A simultaneous four-identity comparison shows the same real badge, action, field,
and switch components. All samples follow the selected mode. Each preserves its
own accent and input state, and samples use the same component initializer as
the catalog. The active component catalog has a short identity-character label.
The theme registry adds local monospaced font directions and descriptive metadata.
Fonts remain local/fallback only. This does not establish a final type scale.

Checkbox and radio visuals preserve native input semantics, disabled/checked states,
and a native forced-colors fallback. Motion/reduced-motion policies are unchanged.
Browser comparison, computed contrast, and keyboard/screen-reader verification
remain outstanding; static/state checks are not visual approval.

## Documentation and planning boundary

Start with [project structure](../architecture/PROJECT_STRUCTURE.md) and
[the identity map](DESIGN_SYSTEMS.md) to distinguish shared registry values,
native reference APIs and the primary React/shadcn implementation. Per-system
Markdown and repository-local skills specialize their existing design authority.
The central GitHub guide coordinates changes without replacing the focused specs.

[npm release architecture](../architecture/NPM_RELEASE_ARCHITECTURE.md) and
[MCP architecture](../architecture/MCP_ARCHITECTURE.md) are proposed future flows.
They do not create publishable distributions, workflow approval gates, server code
or registrations. Their preconditions and unresolved choices are recorded for review.

## Installable distribution — v0.5

The React workspace now exports built ESM/declarations/CSS/data. See
[package build/testing](../architecture/PACKAGE_BUILD_AND_TESTING.md) and the
[package README](../../packages/react/README.md) for exact import/runtime boundaries.
The consumer needs no source aliases, sibling foundations or Tailwind build.
React and React DOM are peer dependencies, and optional global reset CSS is separate.
The catalog still uses its own application-level Tailwind setup.

A private tarball was installed in a fresh external app, strictly typechecked and
built, and verified with five Playwright tests. Existing catalog tests (90 mounts)
and static/state contracts pass. Formatting and AST-generated metadata make local
code/source examples readable without altering vendored upstream modules.
No public name/license or release workflow is configured. Remaining publication
prerequisites are tracked independently; MCP architecture remains a proposal.

## Public package and release tooling — v0.6

The library is configured as public MIT `@inverse_ratio/design-system` (0.1.0),
with preserved upstream notices. Changesets and approval-gated candidate/publish
workflows are implemented locally; nine release-contract tests pass. Account
configuration and the first remote release remain unverified. Publication is
disabled until explicitly enabled after setup. See
[release setup](../architecture/RELEASE_SETUP.md). MCP remains a proposal.
