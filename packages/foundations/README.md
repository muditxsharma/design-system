# Foundations

`themes.json` is the exploratory theme registry for Forma, Minimal, Nocturne,
and Brutalism; `themes.js` exposes the same data as `window.DesignLibrary` for
buildless pages. Regenerate the JS assignment when updating the JSON.

Each expression maps to bg, surface, ink, muted, line, accent, accent-ink, wash.
Accent tuples contain label, illustrative anchor, light values, dark values;
the values map to accent, accent-ink, line, wash. These implementation values
are provisional, not approved production tokens. See the canonical design specs.

Load `themes.js` followed by `apply-theme.js`, then call
`DesignLibrary.applyTheme(element, {system, mode, accent})`. System is one of
`forma`, `minimal`, `nocturne`, `brutalism`; mode is `light` or `dark`.
Accent is a zero-based per-identity index. Invalid selections throw an error.

Registry entries include `mono`, `principles`, and `componentCharacter` metadata.
`applyTheme` exposes `--mono` alongside the existing color/type variables.
