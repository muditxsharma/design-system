# Structured Chaos — repository guidance

## Design authority

Read `docs/design/STRUCTURED_CHAOS_DESIGN_SPEC.md` before design work.
It is the canonical source of truth (v1.15). The DOCX in the same directory is
its synchronized review companion; `structuredChaos.html` is the exploratory identity showcase.
If they diverge, the Markdown specification governs. Update the specification
first, then synchronize the DOCX and affected showcase content in the same change.

The underlying art direction remains conditionally approved. Do not present
illustrative palettes or exploratory CSS values as finalized design tokens,
component APIs, motion timings, or verified accessibility conformance.

## System boundaries

- Minimal / The Architect: Blueprint (light), Command (dark).
- Nocturne / The Dreamer: Daydream (light), Nebula (dark).
- Brutalism / The Rebel: Manifesto (light), Underground (dark).

Preserve their independent composition, typography, geometry, surfaces, and
motion intent. Light/dark expressions retain the structural identity of their
system. Maintain shared semantic meaning, actionable validation, recovery,
readable information, and predictable keyboard/focus behavior.

## Implementation and verification

Keep proposals distinct from accepted decisions. The root HTML showcase is
an authorized exploration; do not implement production components without an
explicit request. Preserve existing user work, including `test.html`.
Follow the specification's accessibility requirements, respect reduced motion,
and use text and structural cues in addition to color. Perform focused checks;
do not claim browser or accessibility verification without conducting it.

## Workspace layout

- `docs/design/`: canonical specification, DOCX companion, and references.
- `packages/`: foundations registry and reusable native HTML components.
- `apps/`: library UI assets.
- `structuredChaos.html`: standalone six-expression showcase.
- `index.html`: shared library entry point.
- Read `docs/design/LIBRARY_SPEC.md` for shared components and `docs/design/FORMA_DESIGN_SPEC.md` for Forma.

The primary React/shadcn implementation lives in `packages/react/` and
`apps/react-library/`. Follow `docs/design/REACT_COMPONENT_COVERAGE.md` for
core/AI boundaries and `packages/react/UPSTREAM.md` for source provenance.
Preserve generated upstream modules when extending identity styles; AI fixtures
must remain clearly distinguished from live model/tool execution.

## Focused references and skills

Read `docs/architecture/PROJECT_STRUCTURE.md` for implementation ownership and
`docs/design/DESIGN_SYSTEMS.md` for per-identity references/API distinctions.
The repository skills live in `.agents/skills/`; use only those relevant to the
selected identity. `.github/DESIGN_SYSTEMS.md` is the central contribution guide.

The npm workflows are implemented locally; follow `docs/architecture/RELEASE_SETUP.md`.
GitHub/npm account setup and publication remain separate external actions.
The MCP documents in `docs/architecture/` remain architecture proposals.
Their presence does not authorize workflow/server implementation or external
publication. Follow the user's current task scope; no release/MCP implementation
was requested as part of the documentation/skills task that created them.
