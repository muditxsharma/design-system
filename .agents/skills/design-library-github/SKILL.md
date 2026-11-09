---
name: design-library-github
description: "Route multi-system Design Library repository changes and GitHub contribution documentation to the correct source, identity skills, provenance, and checks; handle release/MCP planning within the requested scope."
---

# Coordinate Design Library changes

Start with [the GitHub guide](../../../.github/DESIGN_SYSTEMS.md),
[project structure](../../../docs/architecture/PROJECT_STRUCTURE.md) and
[system map](../../../docs/design/DESIGN_SYSTEMS.md). Use only the focused system
references/skills relevant to the user's selected identity or requested comparison.
If a request names no identity, inspect established application theme state before
choosing one. Do not activate all four identity skills for an unrelated small edit.

Route values to foundations, React mappings to `theme.ts`, reusable anatomy to
`identity.css`, interactions to upstream/local components, and demos to catalog
files. Respect native-versus-React API boundaries and document-root portal behavior.
Preserve upstream licensing/provenance and mark AI fixtures as fixtures.

Keep PR descriptions concrete: problem, final behavior, affected systems and
verification. Regenerate snippets when examples change. Update focused references,
shared charter and DOCX when their decisions are affected. Skills should retain
instructions that change implementation decisions, not duplicate full history.
Use existing checks proportionately and preserve unrelated work.

For npm release or MCP planning, read the respective documents in
`docs/architecture/`. They are proposals, not implemented services. An architecture-
only request authorizes documentation, not workflow/server code, publishing,
registration or cross-application mutations. Follow any later explicit task scope;
a skill invocation itself does not authorize an external release.

The current release proposal packages a fixed tested artifact behind a human gate.
The MCP proposal supplies pinned references/audits/plans; the host performs its
already-authorized edits. Do not invent successful releases, registrations or tests.
