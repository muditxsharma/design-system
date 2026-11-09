# Upstream provenance

Official source was installed using shadcn CLI 4.23.0 on 2026-11-09. The registry
files and initial SHA-256 values are recorded in `upstream-manifest.json`.
`LICENSE.shadcn` retains the upstream MIT notice. Dependency packages retain their
own licenses; `package-lock.json` pins the resolved installation.

- Existing UI source: shadcn `new-york` config, served as `new-york-v4`.
- New Trace/Code Block/Questionnaire primitives: `base-nova` registry. Existing
  Button and Collapsible files were retained when the CLI asked about overwrites.
- `src/identity.css`, `src/theme.ts`, and `src/ai/index.tsx` are local extensions.
- Native HTML examples under `packages/components/` remain separate.

References:
[shadcn/ui](https://ui.shadcn.com/docs/components),
[Vite installation](https://ui.shadcn.com/docs/installation/vite),
[current AI patterns](https://ui.shadcn.com/docs/ai-elements).

The AI wrappers are local compositions of the installed primitives, following the
current pattern approach. Their APIs are documented locally; they do not claim
compatibility with every previous AI SDK Elements export. The demos have no live
model integration or credentials.
