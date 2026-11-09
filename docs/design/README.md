# Structured Chaos design reference

The [Markdown design specification](STRUCTURED_CHAOS_DESIGN_SPEC.md) is the
**source of truth**, version 1.14 (2026-11-09). It preserves the original charter
and records the current HTML showcase, provisional implementation choices,
verification status, and outstanding work.

The [master DOCX](Structured_Chaos_Master_Design_Document.docx) is a synchronized
review companion. The [HTML showcase](../../structuredChaos.html) is an exploratory
implementation. If documents or implementation diverge, the specification
governs. Update Markdown first, then synchronize the DOCX and affected showcase
content in the same change. Record changes in the specification's history.

| Identity | Philosophy | Light expression | Dark expression |
| --- | --- | --- | --- |
| Minimal / The Architect | Order in Control | Blueprint | Command |
| Nocturne / The Dreamer | Control in Chaos | Daydream | Nebula |
| Brutalism / The Rebel | Chaos in Order & Control | Manifesto | Underground |

These are independent visual systems with shared interaction semantics.
The art direction remains conditionally approved. Palettes and showcase CSS
values are not approved production tokens; implementation values remain exploratory. Representative React browser checks
pass; exhaustive contrast, screen-reader and cross-browser verification remains open.

Place supporting imagery and studies in `references/`, recording their origin
and purpose. `test.html` is a preserved prototype, not an authoritative reference.

The [shared library specification](LIBRARY_SPEC.md) governs the multi-system catalog
and components. [Forma](FORMA_DESIGN_SPEC.md) has an independent design reference.
Open the [Design Library](../../index.html) to browse both families.

The primary React/shadcn implementation lives in `packages/react/` and
`apps/react-library/`. Follow `docs/design/REACT_COMPONENT_COVERAGE.md` for
core/AI boundaries and `packages/react/UPSTREAM.md` for source provenance.
Preserve generated upstream modules when extending identity styles; AI fixtures
must remain clearly distinguished from live model/tool execution.

Start with the [identity map](DESIGN_SYSTEMS.md) for separate system references
and skills. The [documentation index](../README.md) includes project structure,
GitHub contribution routing, and release/MCP architecture proposals.
