---
name: design-system-minimal
description: "Implement or review Minimal / The Architect interfaces, including Blueprint and Command with configured accent families, when this Structured Chaos identity is selected."
---

# Apply Minimal / The Architect

Read [the Minimal reference](../../../docs/design/systems/MINIMAL_DESIGN_SPEC.md)
and [the system/API map](../../../docs/design/DESIGN_SYSTEMS.md). The shared
Structured Chaos charter governs accepted direction; this skill specializes it.

Use `system: 'minimal'`; `light` means Blueprint, `dark` means Command. Accent
indices are 0 Blueprint Blue, 1 Terracotta Orange, 2 Emerald Green. Derive emphasis
and quiet washes through the shared adapter; avoid button-only recolors and neon
Command. Accent family does not determine semantic status.

Make structure continuous: shared boundaries, proportional divisions, precise
rectilinear controls, technical labels, ruled tables/calendars and structurally
subdivided cards. Avoid independently floating every item. Use measured motion,
fine square-ended icon strokes, practical interface type and aligned data.

Apply reusable anatomy in `packages/react/src/identity.css` and values in the
shared registry/adapter, rather than correcting only a gallery wrapper. Reuse
upstream components without erasing their interaction contracts or provenance.
In a consuming app, use its existing theme entry and account for portals.

Preserve business behavior, field recovery, focus and AI transport. Check both
expressions and affected accents, including reduced motion and narrow composition.
Record design decisions in the focused reference and charter when shared; report
verification limits without treating exploratory values as approved tokens.
