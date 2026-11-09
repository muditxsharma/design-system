# Nocturne — The Dreamer

Focused implementation reference · 2026-11-09 · Exploratory values

Nocturne expresses **Control in Chaos**: dimensional layers, controlled refraction,
prismatic atmosphere and fluid spatial continuity. Functional interfaces remain
quieter than showcase compositions. This reference specializes the
[Structured Chaos charter](../STRUCTURED_CHAOS_DESIGN_SPEC.md).

## Expressions and spectrum

| Display expression | Runtime mode | Material |
| --- | --- | --- |
| Daydream | `light` | Porcelain/lavender planes with distinguishable depth |
| Nebula | `dark` | Deep plum/ultraviolet planes with quieter functional edges |

| Runtime accent index | Coordinated study |
| --- | --- |
| 0 | Ultraviolet / Iris |
| 1 | Orchid / Magenta |
| 2 | Iris / Cool Refraction |

These studies are implementation choices within one ultraviolet-centered identity,
not separate approved brands or a flat purple recolor. Illustrative spectrum roles
include ultraviolet `#7450B5`, iris `#A98ADD`, orchid `#C66AC5` and cool refraction
`#6DABD3`. Use the registry's mapped emphasis/surfaces, not anchor values pasted
into every element. Prismatic colors remain independent of semantic statuses.

## Component anatomy

- Establish depth through opaque layered planes, relative elevation and soft separation.
- Use selective refractive card edges, modest shadows and clear foreground planes.
- Keep fields inset and quiet; use lightly elevated actions and floating tab surfaces.
- Keep tables, validation and notifications calmer than decorative showcase panels.
- Text, focus and control targets remain stable. Never refract through critical text,
  glow every border, or require literal planets/imagery for the identity to work.
- Space Grotesk is display direction; Sora is interface/body; Space Mono is technical/data.
  Fonts currently use local availability/fallbacks, not a bundled approved scale.
- Use layered icon motifs and refined rounded strokes. Transitions express short,
  fluid plane-to-plane movement. Ambient effects are selective, not routine workflow behavior.
- Preserve equivalent static states when reduced motion is requested. Do not delay errors.

## React integration

```tsx
import '@inverse_ratio/design-system/styles.css'
import { applyReactTheme } from '@inverse_ratio/design-system/theme'

// Existing workspace API, not an already-published npm package.
applyReactTheme({ system: 'nocturne', mode: 'dark', accent: 0 })
```

The document-root theme keeps portaled overlays in the same expression. Reusable
anatomy is in `packages/react/src/identity.css`; `theme.ts` maps shared foundation
values. Modify those sources for a system change, not only a gallery gradient.
Preserve validation, focus, handlers and AI transport/business behavior.

## Review

Compare Daydream/Nebula, affected spectrum studies, quiet dense UI and layered
showcase UI. Check narrow reflow, stable text and reduced motion. Existing browser
coverage is representative; contrast/screen-reader conformance remains open.

[System map](../DESIGN_SYSTEMS.md) · [Nocturne skill](../../../.agents/skills/design-system-nocturne/SKILL.md)
