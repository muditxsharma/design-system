# Design systems — central map

Four identities belong to two families. Forma is independent. Minimal, Nocturne
and Brutalism belong to Structured Chaos, with independent visual anatomy and
shared semantics. A system change is not just a color/radius substitution.

| System | Focused Markdown reference | Skill | Expressions |
| --- | --- | --- | --- |
| Forma | [Forma](FORMA_DESIGN_SPEC.md) | [design-system-forma](../../.agents/skills/design-system-forma/SKILL.md) | Light / Dark |
| Minimal | [Minimal](systems/MINIMAL_DESIGN_SPEC.md) | [design-system-minimal](../../.agents/skills/design-system-minimal/SKILL.md) | Blueprint / Command |
| Nocturne | [Nocturne](systems/NOCTURNE_DESIGN_SPEC.md) | [design-system-nocturne](../../.agents/skills/design-system-nocturne/SKILL.md) | Daydream / Nebula |
| Brutalism | [Brutalism](systems/BRUTALISM_DESIGN_SPEC.md) | [design-system-brutalism](../../.agents/skills/design-system-brutalism/SKILL.md) | Manifesto / Underground |

## Authority and scope

- [Structured Chaos charter](STRUCTURED_CHAOS_DESIGN_SPEC.md) governs shared
  accepted art direction and its recorded changes. Its DOCX is the review companion.
- Each focused system MD describes that identity's current implementation direction
  without overriding the shared charter. Forma has its own independent specification.
- [Library specification](LIBRARY_SPEC.md) governs implementation boundaries;
  [coverage](REACT_COMPONENT_COVERAGE.md) separates real React components, AI
  compositions, fixtures and outstanding verification.
- `packages/foundations/themes.json` records actual exploratory implementation
  values. `themes.js` mirrors them for native pages. Skills guide application;
  they do not silently approve new tokens or override the user's latest scope.

Resolve a conflict by recording an explicit design decision in the relevant
system reference and shared charter when affected, then synchronize implementation
and review documents. Do not treat historical example values as production approval.

## Shared invariant

Across all systems, preserve meaning for success/error/warning/information,
field-adjacent persistent error recovery, entered values, predictable focus,
keyboard behavior and reduced-motion alternatives. Text and structural cues carry
meaning alongside color. A signal accent does not automatically become a semantic
status color. AI patterns inherit these rules and preserve their transport/business
behavior; a fixture must not appear to be a live model, tool or agent result.

## Choosing the correct implementation

| API | Native reference | Primary React/shadcn library |
| --- | --- | --- |
| Entry | `DesignLibrary.applyTheme(root, options)` | `applyReactTheme(options, root?)` |
| Owner | `packages/foundations/apply-theme.js` | `packages/react/src/theme.ts` |
| Root state | `.ds`, `data-system`, `data-mode` | `.design-theme`, `.dark` when needed, `data-system`, `data-mode` |
| Identity accent | `--accent` | `--signal` |
| Surface | `--surface` / `--bg` | `--card` / `--background` |
| Text | `--ink` / `--muted` | `--foreground` / `--muted-foreground` |
| Action | `.ds-button.primary` treatment | `--primary` / `--primary-foreground` and shadcn `data-slot` styles |
| Accent surface | `--wash` | `--accent` / `--accent-foreground` (shadcn surface semantics) |
| Appearance | `packages/components/components.css` | `packages/react/src/identity.css`, included by `styles.css` |

Both APIs use `system`, `mode: 'light' | 'dark'`, and numeric `accent` indices.
Forma has one green family; index 0 applies. Other systems expose three families.
Do not pass display expression names such as `command` as the `mode` value.

The React default root is the document element so overlays and menus rendered
through portals share the theme. Native roots can be independently themed;
React per-widget isolation needs a coordinated portal strategy. No global registry
of themes in an arbitrary application is assumed.

## Using the skills

The five skills are repository-local under `.agents/skills/` so GitHub can version
them with the references. Use the central
[GitHub skill](../../.agents/skills/design-library-github/SKILL.md) for repository
changes spanning identities, then load only the relevant identity skills. They
are authored artifacts, not globally installed skills. Discovery depends on the
agent host; another client can be given the exact `SKILL.md` path or configured
to discover this directory. Keep references in the checkout when moving skills.

For GitHub contribution routing, use [.github/DESIGN_SYSTEMS.md](../../.github/DESIGN_SYSTEMS.md).
For the architecture, start with [the project guide](../architecture/PROJECT_STRUCTURE.md).
