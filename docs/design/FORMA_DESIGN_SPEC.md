# Forma — design reference

Version 0.3 · Exploratory · 2026-11-09

Forma is an independent system, separate from Structured Chaos. Its supplied
`forma.html` establishes the current visual reference: fresh lime #B8F36B,
ink #20231E, canvas #F6F7F3, lavender #E4DDF7, and white #FFFFFF.
The dark expression uses near-black botanical neutrals and the same lime accent.

Direction: approachable sans-serif type, soft rounded grouping, generous spacing,
subtle dividers, natural neutral surfaces. Arial/system sans-serif is the current
font implementation. Spacing uses a 4px base in the original showcase. Radius
values and scales remain provisional; shared components use a 12px study radius.

The library adapts the supplied design into common semantic HTML components.
Success, error, warning and information retain explicit text and independent
meaning. Light/dark toggle retains grouping and geometry. There is no alternate
Forma accent selector yet. No formal brand approval or accessibility verification
is inferred from the standalone prototype.

See [the library spec](LIBRARY_SPEC.md) for component APIs, interaction behavior,
source locations, reuse instructions and verification limits. Future Forma
decisions should update this document and the registry together.

## Iconography and interaction study — v0.2

Library icons use rounded strokes and soft geometric motifs. Buttons provide
subtle surface/inset feedback; switches and disclosures transition briefly
without moving targets. Functional validation remains immediate and persistent.
The shared catalog now has 67 entries; see COMPONENT_COVERAGE.md for scope and
native approximations. Motion values remain exploratory and respect reduced motion.

## Component continuity — v0.3

The reusable library carries Forma through softly grouped cards/disclosures,
natural input surfaces, round avatars and switches, quiet badge grouping, and
relaxed tables. Primary actions use ink in light mode and green in dark mode,
matching the standalone reference. The comparison row uses the actual reusable
controls; it does not replace them with a static picture. Visual values remain
exploratory and locally available fonts determine exact typography.

## React implementation — v0.4

Forma now also maps into shadcn semantic variables in `packages/react/src/theme.ts`.
Identity data-slot styles preserve soft grouping, ink-led light actions, green
dark actions, natural inputs and gentle surfaces through real React components
and AI compositions. Native references remain separate. Chromium specimen and
representative interaction checks pass; exhaustive accessibility remains open.

## Focused reference and agent routing

Forma is the fourth independently documented identity in the
[central system map](DESIGN_SYSTEMS.md). Its
[repository skill](../../.agents/skills/design-system-forma/SKILL.md) applies this
reference to components and consuming applications.

Runtime selection is `system: 'forma'`, `mode: 'light' | 'dark'`, `accent: 0`.
There are no alternate Forma accent families in the current registry. Use softly
rounded grouping, natural fields, round switches/avatars and restrained shadows;
primary actions use ink in light mode and the green accent in dark mode.
Do not copy Nocturne's refractive atmosphere, Minimal's instrument-grid divisions,
or Brutalism's reversed hard frames into Forma merely to make it feel distinctive.

For React, import `@inverse_ratio/design-system/styles.css` and use `applyReactTheme()`
from the workspace package. It applies root variables for portal coherence.
The native adapter is a different API: `.ds` and `--accent` there are not the React
`.design-theme`/shadcn surface contract. See the central map before mixing styles.
Keep real handlers, validation, focus and AI transport unchanged during visual work.
