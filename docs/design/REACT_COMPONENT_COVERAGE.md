# React component coverage

The primary implementation is `packages/react/` with 64 official shadcn source
modules installed using CLI 4.23.0. See the package's upstream manifest for paths,
initial hashes, registry styles and license. These files are actual upstream code,
not the earlier native component approximations.

## Core UI

The catalog has 68 core examples: the 66 entries in the shadcn component index,
plus Iconography and Form. Composite entries such as Data Table, Date Picker,
Typography and Form compose installed primitives. They are local examples, not
separate claims of upstream modules. Data Table supports client-side filter and
sort, not server pagination/virtualization. All controls use the real upstream
implementations for focus, selection and overlay behavior.

See `apps/react-library/src/ui-demos.tsx` for the complete list and compositions.
Each example exposes generated working TSX and its source reference in the UI.

## AI patterns

22 examples: Chain of Thought, Chat, Checkpoint, Confirmation, Context, File Tree,
Inline Citation, AI Message, Model Selector, Plan, Prompt Input, Queue, Reasoning,
Sources, Stack Trace, Subagent, Suggestion, Task, Terminal, Test Results, Tool,
and Artifact. See `packages/react/src/ai/index.tsx` for typed reusable exports;
Artifact is a direct Card/Button composition. These are local wrappers built on
actual shadcn primitives using the current pattern approach, not a vendored copy
of every former AI SDK Elements API.

The fixtures are labeled. Chat simulates text streaming locally and supports
stop. Prompt attachments remain local. No live model calls, uploads, agent runs,
tools, commands, persistence, auth, or credentials are implemented. Context/plan
progress reflects supplied fixture data, not invented background percentages.
Reasoning displays a supplied process summary, not private model internals.

## References

- [Core index](https://ui.shadcn.com/docs/components)
- [AI patterns](https://ui.shadcn.com/docs/ai-elements)
- [Vite integration](https://ui.shadcn.com/docs/installation/vite)

## Verification

Production build and typecheck pass. The browser suite mounts all 90 examples and
checks representative interaction flows across the four systems. It covers 20
system/mode/accent combinations for portaled dialogs, validation recovery,
keyboard tabs, data filter, local streaming/stop, and a 390px reduced-motion
layout. Identity card screenshots were reviewed. This does not establish full
keyboard/assistive-technology, contrast or cross-browser conformance.
