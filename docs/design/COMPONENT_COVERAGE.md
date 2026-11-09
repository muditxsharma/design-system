# Component coverage and interaction notes

Catalog version 0.2 · 2026-11-09

The coverage benchmark is the [official shadcn/ui component index](https://ui.shadcn.com/docs/components),
checked 2026-11-09. All 66 names on that index are represented, plus Iconography.
These are original native HTML/CSS/JS studies, not shadcn implementations or API
compatibility. Matching catalog breadth does not establish matching feature depth.

| Component | Category | Implementation |
| --- | --- | --- |
| Accordion | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Alert | Feedback | Native semantic HTML with shared identity styling and relevant local state. |
| Alert Dialog | Overlay | Native confirm/cancel dialog for a simulated operation. |
| Aspect Ratio | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Attachment | Forms | Native local file selection; never uploads. |
| Avatar | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Badge | Feedback | Native semantic HTML with shared identity styling and relevant local state. |
| Breadcrumb | Navigation | Native semantic HTML with shared identity styling and relevant local state. |
| Bubble | Communication | Native semantic HTML with shared identity styling and relevant local state. |
| Button | Actions | Native semantic HTML with shared identity styling and relevant local state. |
| Button Group | Actions | Native semantic HTML with shared identity styling and relevant local state. |
| Calendar | Forms | Local month navigation, date selection, arrow/Home/End keyboard movement. |
| Card | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Carousel | Data | Manual three-slide navigation; no autoplay. |
| Chart | Data | Static SVG bar chart with text values and accessible description. |
| Checkbox | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Code Block | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Collapsible | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Combobox | Forms | Native editable datalist suggestions; platform behavior. |
| Command | Overlay | Modal with searchable actions; scoped to demo button, no global shortcut. |
| Context Menu | Overlay | Right-click/Shift F10 and visible disclosure fallback; action preview. |
| Data Table | Data | Client-side text filter and ascending/descending project sort. |
| Date Picker | Forms | Native date input and local selection confirmation. |
| Dialog | Overlay | Native modal, focus restore, Escape, explicit cancel/confirmation. |
| Direction | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Drawer | Overlay | Bottom-anchored native dialog; no swipe gesture. |
| Dropdown Menu | Navigation | Native semantic HTML with shared identity styling and relevant local state. |
| Empty | Feedback | Native semantic HTML with shared identity styling and relevant local state. |
| Field | Forms | Persistent inline email validation; preserves entered values. |
| Hover Card | Overlay | Hover/focus profile details and Escape dismissal. |
| Input | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Input Group | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Input OTP | Forms | Single six-digit native input; no remote verification. |
| Item | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Kbd | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Label | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Marker | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Menubar | Navigation | Native disclosure navigation with keyboard handling; not ARIA menubar roles. |
| Message | Communication | Native semantic HTML with shared identity styling and relevant local state. |
| Message Scroller | Communication | Local text entry and scroll-to-new-message; no persistence. |
| Native Select | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Navigation Menu | Navigation | Native semantic HTML with shared identity styling and relevant local state. |
| Pagination | Navigation | Page selection updates a 30-item range indicator; no remote data. |
| Popover | Overlay | Native semantic HTML with shared identity styling and relevant local state. |
| Progress | Feedback | Explicit user-controlled sample, not invented task progress. |
| Questionnaire | Forms | Required radio selection with local confirmation. |
| Radio Group | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Resizable | Layout | Keyboard/pointer range control changes panel split; no drag handle. |
| Scroll Area | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Select | Forms | Styled native single select; not a custom ARIA listbox. |
| Separator | Layout | Native semantic HTML with shared identity styling and relevant local state. |
| Sheet | Overlay | Side-anchored native dialog. |
| Sidebar | Navigation | Native semantic HTML with shared identity styling and relevant local state. |
| Skeleton | Feedback | Static loading-state specimen. |
| Slider | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Spinner | Feedback | Visible loading-state specimen; reduced motion becomes static. |
| Switch | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Table | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Tabs | Navigation | Roving tab stops, arrow keys, Home/End, linked panels. |
| Textarea | Forms | Native semantic HTML with shared identity styling and relevant local state. |
| Toast | Feedback | Dismissible noncritical status only; errors remain inline. |
| Toggle | Actions | Native semantic HTML with shared identity styling and relevant local state. |
| Toggle Group | Actions | Native semantic HTML with shared identity styling and relevant local state. |
| Tooltip | Overlay | Hover/focus description and Escape dismissal; no essential hidden content. |
| Trace | Data | Native semantic HTML with shared identity styling and relevant local state. |
| Typography | Foundations | Native semantic HTML with shared identity styling and relevant local state. |
| Iconography | Foundations | 24 specimens from an original SVG set; geometry and strokes vary by identity. |

## Shared limits

Local action buttons that would normally call a backend explicitly say
“previewed”; they do not create, export, duplicate, archive, or save real data.
Attachment, date, select, file, and dialog behavior depend on browser support.
Reused snippets must receive unique IDs and matching label/ARIA references.
Browser rendering, pointer/keyboard flows, contrast, responsive layouts, and
assistive-technology behavior remain to be verified before production use.
