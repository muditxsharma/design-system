# Minimal — The Architect

Focused implementation reference · 2026-11-09 · Exploratory values

Minimal expresses **Order in Control**. Structure is the interface: visible
alignment, proportional divisions and purposeful technical annotation.
This reference specializes the [Structured Chaos charter](../STRUCTURED_CHAOS_DESIGN_SPEC.md)
and does not supersede its conditional approval or semantic requirements.

## Expressions and accent family

| Display expression | Runtime mode | Material |
| --- | --- | --- |
| Blueprint | `light` | Paper-like neutral planes, technical divisions |
| Command | `dark` | Deep slate/navy-neutral planes with the same architecture |

| Runtime accent index | Family | Illustrative anchor |
| --- | --- | --- |
| 0 | Blueprint Blue | `#3972C3` |
| 1 | Terracotta Orange | `#C46A4A` |
| 2 | Emerald Green | `#27866C` |

Derive selected controls, architectural emphasis, focus, chart emphasis and quiet
washes from the family. Keep neutrals dominant. Exact light/dark mappings are in
`packages/foundations/themes.json`; anchors are illustrative, not approved tokens.
Terracotta is not error; Emerald is not success. Command is not a neon reinterpretation.

## Component anatomy

- Compose continuous regions with shared boundaries rather than floating every item.
- Use thin perceptible rules, rectilinear controls and proportional hierarchy.
- Subdivide card headers/content/actions with structural boundaries. Use a standalone
  card where its grouping has a real purpose, not for every data point.
- Use divided tabs, ruled calendars/tables, technical labels and stable numeric alignment.
- Keep avatars/badges precise and restrained; avoid soft floating shadows and pillow controls.
- Geist Sans is the display/interface direction; Geist Mono is technical/data direction.
  Local availability determines rendering; do not claim bundled fonts or a final scale.
- Use fine square-ended icon strokes and rectilinear motifs. Motion is measured and
  concise; position and feedback remain predictable in both expressions.

## React integration

```tsx
import '@inverse_ratio/design-system/styles.css'
import { applyReactTheme } from '@inverse_ratio/design-system/theme'
import { Button } from '@inverse_ratio/design-system/ui/button'

// Existing workspace API, not an already-published npm package.
applyReactTheme({ system: 'minimal', mode: 'dark', accent: 1 })
// Render <Button>Create project</Button> within the themed application.
```

Apply the theme at the application theme entry, including portal behavior.
Component identity is in `packages/react/src/identity.css`. Native reference
styles are separate in `packages/components/components.css`. Do not make an identity
fix only in the catalog wrapper. Preserve handlers, validation, focus, data and AI
transport; change appearance within the authorized UI scope.

## Review

Compare Blueprint/Command and all affected accent families. Confirm continuous
composition, readable labels/data, persistent errors and reduced motion. Existing
React tests cover representative behavior, not exhaustive conformance.

[System map](../DESIGN_SYSTEMS.md) · [Minimal skill](../../../.agents/skills/design-system-minimal/SKILL.md)
