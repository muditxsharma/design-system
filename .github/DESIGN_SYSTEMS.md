# Design Library — central GitHub guide

This is the repository entry point for humans and agents reviewing changes across
Forma and Structured Chaos. It is guidance, not a GitHub workflow or MCP implementation.

## Read the right authority

| Work | Reference | Repository skill |
| --- | --- | --- |
| Repository layout/integration | [Project structure](../docs/architecture/PROJECT_STRUCTURE.md) | [Central GitHub skill](../.agents/skills/design-library-github/SKILL.md) |
| Forma | [Forma spec](../docs/design/FORMA_DESIGN_SPEC.md) | [Forma](../.agents/skills/design-system-forma/SKILL.md) |
| Minimal | [Minimal spec](../docs/design/systems/MINIMAL_DESIGN_SPEC.md) | [Minimal](../.agents/skills/design-system-minimal/SKILL.md) |
| Nocturne | [Nocturne spec](../docs/design/systems/NOCTURNE_DESIGN_SPEC.md) | [Nocturne](../.agents/skills/design-system-nocturne/SKILL.md) |
| Brutalism | [Brutalism spec](../docs/design/systems/BRUTALISM_DESIGN_SPEC.md) | [Brutalism](../.agents/skills/design-system-brutalism/SKILL.md) |
| Shared design rules | [Central map](../docs/design/DESIGN_SYSTEMS.md), [charter](../docs/design/STRUCTURED_CHAOS_DESIGN_SPEC.md) | Load only affected identity skills |
| npm releases | [Release architecture](../docs/architecture/NPM_RELEASE_ARCHITECTURE.md) | Architecture only until implementation is requested |
| Cross-application MCP | [MCP architecture](../docs/architecture/MCP_ARCHITECTURE.md) | Architecture only until implementation is requested |

## Make changes at the correct layer

- `packages/foundations/`: implementation values and native mirror.
- `packages/react/src/theme.ts`: native-to-shadcn semantic mapping and root state.
- `packages/react/src/identity.css`: reusable identity anatomy and motion.
- `packages/react/src/ui/`: upstream shadcn code; preserve license/provenance.
- `packages/react/src/ai/`: local compositions, preserving explicit fixture/live boundaries.
- `apps/react-library/`: consuming examples and their visualization.

Do not fix only a specimen wrapper when the reusable component is wrong. Do not
change application auth, data, model configuration or handlers as a side effect of
a visual migration. Keep accepted direction distinct from exploratory values.

## Reviewable changes

A PR should identify the problem, affected identities/expressions/accents, final
behavior, source-layer changes and validation evidence. For visual changes,
include representative before/after views and note unverified contrast/focus or
screen-reader behavior. When examples change, regenerate their TSX snippets.
When design decisions change, update focused references and the shared charter
when affected; synchronize its DOCX companion. Skills should change only when
implementation guidance changes, rather than duplicating the full specification.

Use existing commands proportionately: `npm run typecheck`, `npm run build`,
`npm run check:react-sources`, `npm run test:react`, `npm run test:static`.
Documentation-only edits need reference/skill validation, not an unchanged UI rebuild.

## Current delivery boundaries

The React library is configured as public MIT `@inverse_ratio/design-system`.
Changesets, CI and approval-gated release workflows are implemented locally.
See [release setup](../docs/architecture/RELEASE_SETUP.md) before enabling
publication. Account protection/trust and the first remote release remain
unverified. MCP remains architecture only.

The skills are checked into `.agents/skills/`. Discovery varies by host; pass an
exact skill path or configure repository-local discovery if needed. They are not
installed into a user's global skill directory by this commit.
