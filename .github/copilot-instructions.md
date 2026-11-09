# Design Library repository context

Read [the central GitHub design guide](DESIGN_SYSTEMS.md) and
[AGENTS.md](../AGENTS.md). Resolve the requested identity through
[the system map](../docs/design/DESIGN_SYSTEMS.md); use only the relevant
repository skill under `.agents/skills/`.

The primary implementation is the React/shadcn workspace in `packages/react/`.
Keep independent identity anatomy, shared semantics, upstream provenance and
fixture/live AI boundaries intact. Root HTML/native components are separate references.

Release and MCP architecture documents are proposals. Their presence is not a
request to implement workflows, publish packages, register servers or migrate
other applications. Follow the user's current task scope.
