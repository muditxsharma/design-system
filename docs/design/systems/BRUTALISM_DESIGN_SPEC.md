# Brutalism — The Rebel

Focused implementation reference · 2026-11-09 · Exploratory values

Brutalism expresses **Chaos in Order & Control**: hard graphic rules, condensed
display typography, controlled asymmetry, strong contrast and abrupt mechanical
motion. Controlled confrontation must retain clear navigation and recovery.
This reference specializes the [Structured Chaos charter](../STRUCTURED_CHAOS_DESIGN_SPEC.md).

## Expressions and signal

| Display expression | Runtime mode | Material |
| --- | --- | --- |
| Manifesto | `light` | Paper/ink, hard graphic structure |
| Underground | `dark` | Carbon/off-white, the same graphic geometry |

| Runtime accent index | Signal | Illustrative anchor |
| --- | --- | --- |
| 0 | Acid Lime | `#D9FF36` |
| 1 | Industrial Orange | `#F26B2E` |
| 2 | Electric Violet | `#8955E8` |

Choose one stable signal per composition and retain it across light/dark. The
current UI uses explicit selection, not automatic randomization. Signal is not
status: lime is not success, orange is not warning, violet is not information.
Exact values are exploratory; use mapped foreground/background pairs from the registry.

## Component anatomy

- Build from hard divisions, heavy structural frames, reversed headers and stamps.
- Use controlled editorial proportions and offset framing while preserving stable
  control targets; do not rotate or jitter input fields to create personality.
- Use assertive actions, square fields/switches, framed calendars and industrial tables.
- Use condensed display hierarchy for headings, not condensed dense body/data text.
- Barlow Condensed is display direction; IBM Plex Sans is interface/body; IBM Plex Mono
  is technical/data. Rendering uses local font availability and fallbacks.
- Use heavy angular icon strokes and structural geometry. Mechanical cuts are brief,
  decisive and non-flashing. Critical feedback remains immediate and persistent.
- Decorative halftone/collage belongs to editorial/showcase areas such as the hero
  poster. Keep forms and functional surfaces clean and readable.
- Preserve static equivalents for reduced motion. Maintain the same geometry in both expressions.

## React integration

```tsx
import '@inverse_ratio/design-system/styles.css'
import { applyReactTheme } from '@inverse_ratio/design-system/theme'

// Existing workspace API, not an already-published npm package.
applyReactTheme({ system: 'brutalism', mode: 'dark', accent: 2 })
```

Keep identity treatment in `packages/react/src/identity.css` and mapped theme
values in the foundations/React adapter. A thicker catalog wrapper alone is not
component identity. Preserve event handlers, focus, validation, data and AI transport.

## Review

Compare Manifesto/Underground and affected signals. Verify hard hierarchy without
semantic collisions, clean functional text, keyboard focus, narrow reflow and
reduced motion. Existing browser checks do not establish full accessibility.

[System map](../DESIGN_SYSTEMS.md) · [Brutalism skill](../../../.agents/skills/design-system-brutalism/SKILL.md)
