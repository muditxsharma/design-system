---
name: design-system-forma
description: "Implement or review Forma components and theme integration when Forma is selected, preserving its natural surfaces, soft grouping, and light/dark action treatment."
---

# Apply Forma

Read [the Forma reference](../../../docs/design/FORMA_DESIGN_SPEC.md) and the
[API/authority map](../../../docs/design/DESIGN_SYSTEMS.md). Paths are relative to
this repository skill; keep the references available when sharing it.

Use `system: 'forma'`, runtime mode `light` or `dark`, and accent index 0.
Forma is independent of Structured Chaos. Preserve its natural neutrals, green
accent, soft grouping, quiet fields and round switches/avatars. Light actions
are ink-led; dark actions use green. Do not substitute refractive atmosphere,
instrument-grid composition or reversed industrial headers.

Inspect the consuming app before changing it. For React, prefer exported shadcn
primitives, the shared theme entry and `identity.css` anatomy. For a native-only
consumer, use the separate native adapter; its CSS variables are not interchangeable
with React's shadcn variables. Keep portaled overlays in the selected theme.

Preserve handlers, entered values, validation/recovery, focus, keyboard behavior
and AI transport. Keep functional motion small and provide reduced-motion states.
Treat all current values as exploratory; do not invent approved scales or claim
accessibility from appearance. Check affected light/dark states and relevant
interactions, and report what was actually verified.
