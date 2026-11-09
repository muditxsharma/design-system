# Component library

Exploratory native HTML components for Forma and Structured Chaos identities.
Load `components.css`, `components.js`, and the foundations theme registry.
Copy a catalog example into a `.ds` container, set `data-system`/`data-mode`,
and apply the theme CSS properties shown in the library app. Call
`DesignComponents.init(container)` for switches, tabs, local validation, and dialogs.
`catalog.js` contains the reusable markup and powers the gallery.

67 catalog entries cover the shadcn/ui index plus Iconography. See
`docs/design/COMPONENT_COVERAGE.md` for behaviors and limits. This native library
is not shadcn API compatible. Load `icons.js` before `components.js` for original
identity-aware SVG symbols; call `DesignIcons.render(root)` after a theme change.
Use unique IDs when repeating examples; update label and ARIA references together.
Native dialogs provide Escape dismissal and focus handling in supporting browsers.
Status colors are separate from identity accents. Browser/accessibility verification
is still required before production use. No framework or build step is required.

## Consume without the catalog app

```html
<link rel="stylesheet" href="packages/components/components.css">
<div id="my-ui" class="ds">
  <button class="ds-button primary">Create project</button>
</div>
<script src="packages/foundations/themes.js"></script>
<script src="packages/foundations/apply-theme.js"></script>
<script src="packages/components/icons.js"></script>
<script src="packages/components/components.js"></script>
<script>
  const root = document.getElementById('my-ui');
  DesignLibrary.applyTheme(root, { system: 'minimal', mode: 'dark', accent: 1 });
  DesignComponents.init(root);
</script>
```

`accent` is a zero-based family index; `1` selects Terracotta for Minimal.
Adjust asset paths to your consuming page. Multiple independently themed roots
can coexist. Native dialog examples need a browser with `showModal()` support.

## Foundation continuity

The component stylesheet includes four identity treatments. Use
`DesignLibrary.applyTheme(root, {system, mode, accent})` to set scoped theme data
and variables. The treatment affects anatomy and grouping (cards, tabs, fields,
tables, calendars, overlays and feedback), not just palette or corner radius.
Minimal is continuously ruled; Nocturne uses stable layered planes; Brutalism
uses hard framing and reversed graphic hierarchy; Forma uses soft grouping and
ink-led light actions. No catalog wrapper is required for these styles.
The catalog adds only specimen framing and the four-way live comparison.
