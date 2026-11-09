# Structured Chaos — canonical design specification

Version: **1.15** · Updated: **2026-11-09**

## Authority and change policy

This Markdown file is the source of truth for design direction and recorded
showcase changes. The DOCX is a synchronized companion for document review;
`structuredChaos.html` is an exploratory visual implementation. If they diverge, this
specification governs. Update this specification first, then synchronize the
DOCX and affected showcase content in the same change.

The original v1.3 art direction remains conditionally approved. Version 1.4
records the HTML exploration; it does not approve production tokens, component
APIs, motion timings, or accessibility conformance. Original charter sections
below are retained for continuity; section 12 clarifies the new implementation boundary.

## Change history

| Version | Date | Change |
| --- | --- | --- |
| 1.3 | Original charter; date not recorded here | Conditional art-direction baseline. |
| 1.4 | 2026-11-09 | Establish canonical Markdown; record the six-expression HTML showcase and verification limits; synchronize DOCX. |
| 1.5 | 2026-11-09 | Add selectable accent families for all identities with light/dark mappings and independent semantic colors. |
| 1.6 | 2026-11-09 | Refine Nocturne layers, decorative refraction, and spatial transitions while keeping functional planes quiet. |
| 1.7 | 2026-11-09 | Refine Brutalism graphic rules, condensed hierarchy, controlled asymmetry, and mechanical motion. |
| 1.8 | 2026-11-09 | Add an accent-aware editorial vector illustration for Brutalism, including a narrow-screen composition. |
| 1.9 | 2026-11-09 | Record renamed showcase and shared Forma/Structured Chaos component library. |
| 1.10 | 2026-11-09 | Expand catalog, original identity iconography, and local interaction/motion studies. |
| 1.11 | 2026-11-09 | Carry foundation identity through component anatomy and add simultaneous live comparison. |
| 1.12 | 2026-11-09 | Add official shadcn React primitives, themed core/AI compositions, and browser verification. |
| 1.13 | 2026-11-09 | Add project documentation, focused identity references/skills and release/MCP architecture proposals; no runtime changes. |
| 1.14 | 2026-11-09 | Build/test a self-contained private npm artifact with readable source, peers, compiled CSS and clean-consumer Playwright verification. |

| 1.15 | 2026-11-09 | Configure public MIT package identity and implement locally tested version/candidate/approval workflows; publication and external setup remain pending. |

## Retained master art-direction charter

DESIGN SYSTEM / MASTER ART-DIRECTION CHARTER

STRUCTUREDCHAOS

Three philosophies. Six expressions. One semantic foundation.

Version 1.15 | Conditionally approved | Design direction with exploratory showcase record

PURPOSE

This document consolidates the accepted Structured Chaos Identity Lab decisions for Minimal (The Architect), Nocturne (The Dreamer), and Brutalism (The Rebel). It defines visual and experiential intent for future design exploration without establishing design tokens, component APIs, implementation technology, or verified accessibility conformance.

Executive decisions

| Area | Decision |
| --- | --- |
| Identity | Three independent visual systems, not three color themes. |
| Expressions | Blueprint / Command; Daydream / Nebula; Manifesto / Underground. |
| Density | Balanced across all identities; Minimal favors a continuous architectural grid. |
| Motion | Minimal measured; Nocturne spatial; Brutalism abrupt; ambient animation selective. |
| Semantics | Errors, success, warning, information and recovery have equivalent meaning and prominence. |
| Approval | Art direction conditionally approved; outstanding tests are listed at the end. |

## 1. Foundational philosophy

| System | Concept | Defining characteristics |
| --- | --- | --- |
| MINIMAL / The Architect | Order in Control | Architectural precision; continuous structural divisions; measured neutral surfaces; configurable derived accent. |
| NOCTURNE / The Dreamer | Control in Chaos | Dimensional layers; controlled refraction; ultraviolet-centered prismatic atmosphere; quiet functional planes. |
| BRUTALISM / The Rebel | Chaos in Order & Control | Swiss-industrial editorial typography; hard rules; concentrated signal accent; controlled asymmetry. |

Shared foundation: consistent interaction semantics, strong actionable validation, readable dense information, accessible recovery patterns, predictable keyboard/focus behavior, and a common engineering foundation. Expression-specific composition, typography, geometry, surfaces and motion remain independent.

## 2. Minimal — The Architect

Identity statement: Structure is the interface. Order should be visible through alignment, proportional divisions, grid relationships, technical annotation and purposeful motion.

### 2.1 Light and dark expressions

| Blueprint / Light | Command / Dark |
| --- | --- |
| Airy paper-like neutrals, slate-blue technical lines, quiet blue-derived emphasis. | Deep slate and navy-neutral planes, consistent structural lines and measured contrast. Never a glowing cyberpunk reinterpretation. |

Illustrative palette only — not tokens

| Paper#F1F5FA | Line#B9CEE5 | Blueprint#3972C3 | Command#243142 |
| --- | --- | --- | --- |

### 2.2 Typography

Geist Sans for interface and display; Geist Mono for technical labels, code, identifiers and aligned data. Numerals can carry subtle character in display contexts, while tables prioritize alignment and legibility.

### 2.3 Layout and surfaces

Prefer continuous architectural grids with shared boundaries over isolated floating KPI cards.

Use fine but perceptible rules, neutral tonal separation and purposeful proportional hierarchy.

Allow standalone cards only when interaction grouping or actual elevation justifies separation.

A configurable accent (e.g., Blueprint Blue, Terracotta, Emerald) should derive selected states, chart emphasis, structural lines and subtle washes. Neutrals remain dominant.

### 2.4 Interaction and motion

Measured, nearly invisible movement for routine operations. Precise positional continuity for navigation; clean modal elevation; concise feedback; stable errors. Light and dark retain the same geometry and motion intent.

## 3. Nocturne — The Dreamer

Identity statement: Depth is identity; color is atmosphere. Spatial relationships must make the UI recognizable even when illustrative artwork is absent.

### 3.1 Light and dark expressions

| Daydream / Light | Nebula / Dark |
| --- | --- |
| Porcelain, lavender and soft refracted daylight; layered planes must remain distinguishable. | Deep plum and ultraviolet-tinted surfaces; internal dimensionality without excessive luminous outlines or glow. |

Illustrative palette only — not tokens

| Daydream#F0EAF9 | Lilac#DCCDF0 | Nebula#21133B | Plane#503471 |
| --- | --- | --- | --- |

### 3.2 Typography

Space Grotesk for display and headings; Sora for interface/body; Space Mono for technical/data contexts. Preserve crisp text and practical numeric readability in dense applications.

### 3.3 Layout and surfaces

Depth emerges through layered planes, relative elevation, soft separation and selective edge refraction.

Functional notifications and dense panels must be quieter than spacious showcase compositions.

Keep critical text on stable, readable planes. Avoid refraction through text, perpetual glow and literal planets as a required motif.

Use an adaptive prismatic spectrum centered on ultraviolet; semantic status colors remain independent.

### 3.4 Interaction and motion

Fluid spatial continuity and gentle plane-to-plane transitions; stable foreground text; restrained loading; immediate error announcements. Ambient parallax belongs selectively in spacious/showcase contexts, not routine dense workflows.

## 4. Brutalism — The Rebel

Identity statement: Controlled confrontation. Graphic interruption creates personality, while the interface stays navigable, readable and semantically consistent.

### 4.1 Light and dark expressions

| Manifesto / Light | Underground / Dark |
| --- | --- |
| Paper and black ink, industrial divisions, strong typographic interruption. | Carbon and off-white, the same hard structural geometry and controlled graphic disruption. |

Illustrative palette only — not tokens

| Paper#F2F0E9 | Ink#111111 | Signal#D9FF36 | Carbon#242424 |
| --- | --- | --- | --- |

### 4.2 Typography

Barlow Condensed for display, IBM Plex Sans for body/interface and IBM Plex Mono for technical/data content. Condensed expressive numerals are appropriate for headlines; data tables need practical scanning and alignment.

### 4.3 Layout and surfaces

Hard rules, deliberate offsets, editorial hierarchy and strong section separation.

Choose one dominant randomized signal accent per composition; keep it stable within that composition.

Never repurpose the signal accent as the automatic success, error or warning color.

Distressed textures and collage are limited to headers, editorial or showcase contexts—not forms and critical functional UI.

### 4.4 Interaction and motion

Abrupt graphic cuts, sharp selection changes, decisive status reveals and mechanical progress rhythms. No unstable controls, flashing, jitter or gratuitous disruption in critical workflows.

## 5. Cross-system comparison

| Dimension | Minimal | Nocturne | Brutalism |
| --- | --- | --- | --- |
| Composition | Continuous architectural grid | Spatially layered grid | Controlled editorial asymmetry |
| Surface | Neutral structural planes | Quiet dimensional planes | Hard graphic panels |
| Color | Derived configurable accent | Adaptive prismatic atmosphere | Single stable signal accent |
| Motion | Measured | Spatial / fluid | Abrupt / mechanical |
| Dense UI | Compact, continuous divisions | Layered but efficient | Bold but organized |
| Light/dark | Same architecture | Same depth hierarchy | Same graphic geometry |

## 6. Functional interaction-state charter

| State | Universal semantic requirement | Allowed identity expression |
| --- | --- | --- |
| Success | Outcome and changed result clear. | Surface, typography and icon framing. |
| Error | Explicit cause, impact, correction and recovery. | Different frame and visual rhythm; same severity. |
| Warning | Risk or decision clearly identified. | Different emphasis without changing meaning. |
| Information | Concise contextual update. | Identity-specific neutral or accented surface. |
| Loading | Honest progress; no invented percentages. | Measured / fluid / mechanical indicator. |
| Empty | Explain absence and suggest next step. | Diagrammatic / spatial / editorial composition. |
| Disabled | Unavailable state understandable; rationale when useful. | Distinct inactive treatment without misleading affordance. |
| Modal | Clear consequence, escape/cancel and decision. | Precise elevation / spatial emergence / graphic insertion. |

### 6.1 Universal recovery sequence

DETECT → EXPLAIN → GUIDE → RECOVER → CONFIRM

Validation should be field-adjacent, persistent when critical, actionable and recognizable without color alone. Preserve entered data and context wherever possible. Cross-palette error handling must be comparably strong even when surrounding surfaces differ.

### 6.2 Modal focus hierarchy

Establish severity and title; describe consequences; make cancellation and destructive confirmation clear; visually recess the underlying workspace. This visual hierarchy is distinct from keyboard tab order, which requires later verification. Nocturne backdrops should be quieter; Minimal light/dark modal geometry must match; Brutalism may use assertive framing without distressed functional textures.

## 7. Motion charter — accepted direction

| Interaction | Minimal | Nocturne | Brutalism |
| --- | --- | --- | --- |
| Page entry | Measured structural reveal | Spatial approach | Graphic cut |
| Navigation | Positional continuity | Plane-to-plane continuity | Sharp shift |
| Modal | Clean controlled elevation | Dimensional emergence | Abrupt insertion |
| Hover | Subtle emphasis | Gentle depth response | Immediate contrast |
| Loading | Quiet progress | Restrained fluidity | Mechanical rhythm |
| Success | Concise confirmation | Soft settling | Decisive reveal |
| Error | Immediate and stable | Immediate, no ambient delay | Immediate interruption |
| Exit | Clean withdrawal | Spatial recession | Sharp exit |

Motion is art-direction only: no duration, easing curve or animation mechanics are finalized. Decorative motion is selective, mainly in showcase or spacious contexts. Routine dense workflows should remain calm and predictable.

## 8. Accessibility and semantic invariants

Color is never the sole indicator of meaning; use text, icons and structural cues.

Critical errors remain available until resolved or explicitly dismissed; a disappearing toast is insufficient.

Respect reduced-motion preferences with equivalent static states.

Never delay critical error or destructive-action communication for theatrical animation.

Keep keyboard focus, target position, data readability and assistive status communication predictable.

Validate contrast, focus containment/restoration, announcement behavior and responsive readability before claiming compliance.

Dense interfaces must remain functional without ambient imagery or effects.

## 9. Art-direction decision register

| Area | Status | Notes |
| --- | --- | --- |
| Identity philosophy / six expressions | Accepted | Independent personalities; consistent light/dark structural DNA. |
| Typography families | Accepted direction | No weights, sizes or scales finalized. |
| Chromatic/surface hierarchy | Accepted direction | Exploratory colors only; derived accent behavior remains conceptual. |
| Modal / notifications / semantic feedback | Accepted direction | Nocturne functional glow reduced; strong universal errors. |
| Dense composition | Accepted direction | Minimal continuous-grid refinement incorporated. |
| Motion personality / ambient policy | Accepted direction | Measured / spatial / abrupt; selective ambience. |
| Animated timing and choreography | Open | Requires actual temporal study. |
| Multi-field validation | Open | Simultaneous errors and recovery not stress-tested. |
| Accent edge cases | Open | Extreme combinations and semantic separation. |
| Responsive density | Open | Narrow layouts and reflow not yet evaluated. |
| Measured accessibility | Open | Requires tests, not just visual inspection. |
| Tokens / APIs / implementation | Not started | Explicitly out of scope for this charter. |

## 10. Recommended next visual validation

Priority 1 — Multi-field error and recovery stress test across all six expressions. Priority 2 — Configurable/accent edge cases, including semantic color independence. Priority 3 — Responsive density and narrow-layout composition. Priority 4 — Animated choreography studies with reduced-motion alternatives. These remain art-direction and validation activities; they do not require committing to component implementation or token values.

Document boundary: This charter records decisions from the Structured Chaos Identity Lab. Example palette swatches are illustrative and must not be treated as production-ready colors, accessible contrast claims or approved design tokens.

## 11. Chromatic architecture — accent systems

The color systems below are approved as design behavior, not as finalized production color tokens. Hex values are illustrative moodboard references only; every final value must be tested in both expressions and for accessibility.

Minimal / Configurable derived accent

Default: Blueprint Blue. Optional identity accents include Terracotta Orange and Emerald Green, with room for additional curated palettes. Choosing an accent must derive a coordinated family of emphasis colors rather than merely recoloring the primary button.

| Accent choice | Illustrative anchor | Light / Blueprint behavior | Dark / Command behavior |
| --- | --- | --- | --- |
| Blueprint Blue | #3972C3 | Cool structural lines, selected navigation, data emphasis and pale blue washes | Muted blue emphasis and clear slate-compatible lines; never neon |
| Terracotta Orange | #C46A4A | Warm selection rules, terracotta chart emphasis and warm paper-like washes | Desaturated clay/copper emphasis, controlled contrast on slate surfaces |
| Emerald Green | #27866C | Botanical green selection, chart emphasis and subtle mint-tinted washes | Quiet jade/sea-green emphasis on deep slate surfaces |

Derived accent application: selected navigation, active controls, focus treatment where appropriate, links, nonsemantic chart series, structural emphasis lines, quiet surface washes, and nonsemantic progress accents. Keep neutrals dominant; accent strength is balanced, not saturated across every surface.

Semantic guardrail: Terracotta is NOT automatically error, Emerald is NOT automatically success, and Blueprint Blue is NOT automatically information. Semantic status colors, icons and messages remain separate.

Nocturne / Adaptive prismatic spectrum

Nocturne is not a single purple accent theme. Ultraviolet anchors an adaptive family of lilac, iris, orchid, magenta and restrained cool/cyan refraction. Color describes atmosphere and spatial separation, while depth remains the defining identity.

| Spectrum role | Illustrative reference | Design use |
| --- | --- | --- |
| Ultraviolet anchor | #7450B5 | Primary atmospheric identity and active emphasis |
| Iris / lilac | #A98ADD | Elevated planes, refractive edges and soft gradients |
| Orchid / magenta | #C66AC5 | Sparse chromatic highlights, not routine notification glow |
| Cool refraction | #6DABD3 | Selective secondary prism edge; not automatic information semantics |

Daydream: airy porcelain-lavender planes with distinguishable depth and restrained chromatic gradients. Nebula: deep plum planes with quieter borders and selective internal luminosity. Avoid uniformly glowing outlines, literal cosmic objects in functional UI, and refracted critical text.

Semantic guardrail: Prismatic purple, magenta and cyan remain atmospheric/nonsemantic; error, warning, success and information retain independent semantic roles and accessible contrast.

Brutalism / Stable randomized signal accent

Select ONE dominant signal accent for a composition; the choice may vary between compositions, but must remain stable within each composition and across its corresponding light/dark expression. Do not randomly recolor individual controls, statuses or panels.

| Signal candidate | Illustrative reference | Composition role |
| --- | --- | --- |
| Acid Lime | #D9FF36 | Editorial emphasis, navigation marker and decisive nonsemantic callouts |
| Industrial Orange | #F26B2E | Graphic bars, editorial interruption and selective nonsemantic actions |
| Electric Violet | #8955E8 | Alternate signal identity for a separate composition |

Manifesto: paper/ink contrasts with a concentrated signal. Underground: carbon/off-white uses the same signal identity, adjusted for contrast and restraint. Typography and hard graphic rules must carry the identity even without a signal accent.

Semantic guardrail: Acid Lime does not mean success; Orange does not mean warning; Violet does not mean information. Error red, warning amber, success green and information blue are semantic examples only, subject to later contrast and accessibility verification.

Cross-system accent behavior and validation

| Behavior | Minimal | Nocturne | Brutalism |
| --- | --- | --- | --- |
| Source | User/configuration-selected accent family | Adaptive coordinated prism | One chosen signal per composition |
| Propagation | Derived states, rules, charts, washes | Spatial atmosphere, selective edges, planes | Concentrated graphic markers and accents |
| Light/dark | Same architecture, different tonal mapping | Same depth structure, different illumination | Same graphic composition, contrasting material |
| Avoid | Single-button recolor; neon Command | Every-edge glow; color through text | Random per-element color; semantic collisions |
| Not approved yet | Exact hex/token scales | Exact gradient recipes | Randomization rules and signal scale |

Outstanding chromatic tests: Terracotta and Emerald across Blueprint/Command; low-contrast and extreme accent combinations; Nocturne prismatic readability in dense tables; Brutalism signal versus semantic states; accessible text, focus, chart and status contrast. No final tokens, color ratios or theme APIs are approved.


## 12. HTML showcase record — v1.8

### 12.1 Scope and status

`structuredChaos.html` at the repository root is the current standalone Identity Lab
showcase. Open it directly in a browser. `test.html` remains a separate,
preserved prototype and is not authoritative. No production component package
or application framework has been selected or implemented.

The showcase is an authorized exploratory implementation of the charter.
Its CSS variables, sizes, weights, radii, responsive breakpoint values, transition
timings, and derived surface colors are provisional implementation choices,
not approved tokens or additions to the accepted art-direction baseline.

### 12.2 Identity and expression switching

- Three identity buttons select Minimal, Nocturne, or Brutalism.
- A light/dark button selects Blueprint/Command, Daydream/Nebula, or Manifesto/Underground.
- Initial state is Minimal / Blueprint / Light. The selected light/dark mode persists when changing identity within the current page session.
- Identity changes update composition, surfaces, geometry, type-family stacks, palette annotations, and motion-intent descriptions together.
- State is held in page memory; preferences and form values are not stored persistently.

### 12.3 Visual studies

- Minimal uses continuous shared rules, an architectural grid illustration, quiet neutral planes, and technical annotations.
- Nocturne uses layered functional panels, soft separation, a dimensional illustration, and an ultraviolet-centered atmosphere. Text remains on stable planes.
- Brutalism uses hard divisions, condensed display type when available, assertive framing, deliberate asymmetry, and a stable selected signal accent (Lime, Orange, or Violet).
- All three show typography, illustrative charter palette swatches and the selected accent, an interaction study, shared semantic states, and the recovery sequence.
- The exact charted palette values remain illustrative. Additional page colors are exploratory and require contrast validation.

### 12.4 Typography delivery

The CSS declares the charter's accepted font-family directions: Geist Sans/Mono;
Space Grotesk, Sora, Space Mono; Barlow Condensed, IBM Plex Sans/Mono.
No font assets are bundled or downloaded. Rendering uses locally available
families and system fallbacks, so exact typography is not guaranteed.

### 12.5 Interaction and semantic behavior

The local email study has a visible label, submit action, reset action, and a
disabled invitation action. Submission sends no network request. Empty or
malformed emails produce field-adjacent persistent errors describing the
correction; the field receives focus and an invalid-state attribute. Entered
values remain available for correction. Successful validation provides a
visible confirmation. Reset clears the field and feedback and restores focus.

Errors remain until resubmission or explicit reset. Feedback is connected to
the input and announced through a polite live region. Semantic examples use
text and symbols in addition to color; the signal accent is independent of
success, error, and warning. Identity changes announce the selected expression
and preserve the form state.

### 12.6 Responsive and motion behavior

The layout includes narrow-screen reflow: specimens stack, controls reflow,
and the decorative hero illustration is hidden. Reduced-motion preferences
remove transitions and smooth scrolling. These behaviors are implemented but
have not been verified in a browser. Motion-personality labels describe intent;
the page does not implement a complete choreography study for each identity.

### 12.7 Verification and outstanding work

Static checks verified that the HTML parses, element IDs are unique, label
targets exist, the charter link resolves locally, and all six expressions are
represented. Browser behavior, computed contrast, keyboard/screen-reader
behavior, exact font rendering, and responsive readability remain unverified.
No accessibility conformance is claimed.

The charter's outstanding validation remains open: multi-field recovery across
six expressions; accent edge cases and semantic separation; narrow-layout
density; temporal motion studies; measured accessibility. The current single
email study does not complete the multi-field validation requirement.

### 12.8 Selectable accent studies — v1.5

Each identity now has a visible, keyboard-operable accent selector. Choices
remain in page memory per identity and persist across light/dark switching.
Changing an accent preserves form values and validation feedback. Active choices
use pressed-state semantics, visible text, and a color sample; updates are announced.

| Identity | Selectable studies | Propagation |
| --- | --- | --- |
| Minimal | Blueprint Blue, Terracotta Orange, Emerald Green | Primary action, focus, architectural rules, illustration, and surface washes use coordinated light/dark mappings. |
| Nocturne | Ultraviolet / Iris, Orchid / Magenta, Iris / Cool Refraction | Coordinated prism emphasis, atmospheric gradients, borders, layered planes, and primary action; ultraviolet remains the atmospheric foundation. |
| Brutalism | Acid Lime, Industrial Orange, Electric Violet | One selected signal across the composition, primary action, focus, and illustration; same signal across Manifesto/Underground. |

Nocturne options are exploratory coordinated spectrum studies, not new approved
identity variants. Brutalism selection is explicit and stable, with no automatic
randomization. Palette swatches retain illustrative anchors while actual emphasis
and surface mappings are adjusted for the expression. No production color scales
are approved by this change.

Success, error, warning, and information colors remain independent of accent
selection. Accent changes do not reinterpret semantic meaning. Information now
has a dedicated semantic blue instead of inheriting the identity accent.

Remaining gaps: nonsemantic chart/progress examples, complete accent scales,
measured contrast across all eighteen combinations, dense-layout prism studies,
and browser/assistive-technology validation. The current selectors do not close
the charter's accessibility or chromatic-validation work.

### 12.9 Nocturne spatial refinement — v1.6

Direction: Dimensional layers, controlled refraction, prismatic atmosphere and
fluid spatial transitions. Functional interfaces remain quieter than showcase
compositions.

The decorative hero uses three offset planes, a restrained prismatic edge,
and a coordinated atmospheric field. Accent studies change the decorative
plane orientation through fluid spatial transitions; entering Nocturne introduces
the planes with a single spatial reveal. There is no perpetual ambient animation.
Functional specimens remain opaque, with subdued borders and modest elevation.
Refraction and decorative motion do not pass through functional text, inputs,
or validation feedback. Controls and critical feedback remain stationary.

Daydream and Nebula retain the same layer geometry. Narrow layouts continue
to hide the decorative illustration. Reduced-motion preferences disable the
spatial reveal and transitions, leaving an equivalent static composition.
Transition durations and gradients remain exploratory implementation values.
Browser, contrast, and assistive-technology verification remain pending.

### 12.10 Brutalism graphic refinement — v1.7

Direction: Hard graphic rules, condensed typography, controlled asymmetry,
strong contrast and abrupt mechanical motion.

The showcase uses heavy section rules, an asymmetric hero split, a reversed
identity header, condensed uppercase display stacks, and offset graphic framing.
Manifesto and Underground preserve the same hard geometry and stable selected
signal accent. Body copy, fields, and data retain practical non-condensed stacks.
Actual condensed font rendering depends on local font availability.

The decorative hero enters with a brief stepped mechanical cut. Accent choices
snap its graphic orientation to discrete positions. Buttons change contrast
immediately without moving their targets. No smooth surface transitions, flashing,
continuous jitter, or decorative delays are applied to critical feedback.
Functional controls and validation stay stable; asymmetry collapses cleanly
into stacked sections at narrow widths. Reduced-motion preferences disable
the entry animation while preserving the static graphic composition.

Rule weights, offsets, and motion timing are exploratory implementation choices.
Browser rendering, contrast, keyboard behavior, and accessibility verification
remain pending; no new finalized tokens or conformance claims are introduced.

### 12.11 Brutalism editorial illustration — v1.8

The Brutalism hero replaces its generic rectangular symbol with a responsive
inline vector poster: an offset architectural stack, an oversized 03, a cut-out
arrow, industrial registration marks, hard section rules, and a restrained
halftone field. The composition represents controlled confrontation through
alignment, scale contrast, and deliberate graphic interruption.

The selected Lime, Orange, or Violet signal propagates into the poster while
paper/ink planes follow Manifesto and Underground. Essential illustration labels
use the expression foreground; signal panels use their paired accent foreground.
The poster is decorative and hidden from assistive technology; the adjacent
heading and description provide the identity meaning. Unlike the other decorative
hero studies, it remains visible as a compact stacked panel on narrow screens.

A single stepped reveal replaces the previous shape animation, with no perpetual
motion. Reduced-motion users receive the complete static poster. Graphic effects
remain confined to the showcase; functional specimens remain undistressed.
The illustration is self-contained SVG/CSS with no external assets. Browser and
accessibility verification remain pending.

## 13. Shared design and component library — v1.9

The standalone Structured Chaos showcase is now `structuredChaos.html` (renamed
by the user). The root `index.html` is the shared Design Library entry point.
Forma remains a separate family with its own `forma.html` showcase and
`docs/design/FORMA_DESIGN_SPEC.md` reference. Structured Chaos retains its three
independent identities, six expressions, and nine accent studies.

The requested component implementation now lives in `packages/components/`:
scoped CSS, reusable native HTML examples, and an idempotent behavior initializer.
`packages/foundations/` provides exploratory theme and accent mappings;
`apps/library/` implements the catalog UI. 67 component entries can be searched,
filtered, exercised, inspected, and copied across all four identities. Components
share semantic behavior while preserving identity typography, geometry, and surfaces.

`docs/design/LIBRARY_SPEC.md` governs shared catalog architecture and usage.
This specification remains authoritative for Structured Chaos art direction.
The implementations remain exploratory; they do not finalize tokens or establish
verified accessibility conformance. Original showcases are preserved separately.

## 14. Iconography and expanded component studies — v1.10

The shared library now covers 67 entries: all 66 names on the shadcn/ui component
index checked 2026-11-09, plus Iconography. This is coverage breadth, not shadcn
API compatibility or production feature parity. Details and native approximations
are recorded in docs/design/COMPONENT_COVERAGE.md.

Original SVG icons replace catalog symbol placeholders. Minimal uses fine
technical strokes and rectilinear motifs; Nocturne layered geometry and rounded
refraction cues; Brutalism heavy angular rules and structural symbols. Forma
remains independent with soft rounded geometry. Icons retain equivalent meaning
and explicit control labels across identities.

Microinteraction studies use measured Minimal emphasis, spatial Nocturne reveals,
and abrupt mechanical Brutalism changes; Forma uses soft concise feedback.
Keyboard tabs/calendar, dialog focus restoration, popup dismissal, local validation,
search/sort, pagination, counts, toggles, range resizing, and explicit local
feedback broaden interaction coverage. Critical errors remain immediate and
persistent. Reduced motion removes animated transitions while preserving state.
No new production tokens or accessibility conformance are approved.

## 15. Foundation-to-component continuity — v1.11

Component visualization now carries each identity's composition, typography,
geometry, surface hierarchy, grouping, selected states, and data treatment.
Shared semantic markup no longer implies one shared visual treatment.

Minimal uses continuous catalog seams, numbered technical annotations, restrained
rectilinear controls, divided tabs, instrument-like calendars, ruled tables,
monospaced labels, and structurally subdivided cards. Nocturne uses opaque
functional planes, selective refractive card edges, modest elevation, inset
fields, floating tab surfaces, and layered dialogs; critical text stays stable.
Brutalism uses reversed specimen headers, hard graphic rules, stamped badges and
selected states, condensed display hierarchy, offset card framing, heavy field
boundaries, and industrial data grids. Inputs and control targets remain stable.

The library also carries Forma's separate direction through soft grouping,
quiet natural input surfaces, round switches and avatars, gentle tab grouping,
and confident ink-led primary actions. Its dark expression retains a green action.

A live comparison row shows the same action, field, switch, and badge in all
four identities simultaneously. It follows the selected light/dark mode and each
identity's remembered accent. The active catalog retains all 67 entries and
entered values while identity changes update their styling. Reusable package CSS,
not catalog-only illustration, supplies the component expression.

Native checkbox/radio inputs retain label and keyboard behavior with identity
geometry; a forced-colors fallback restores browser-native rendering. Reduced
motion continues to preserve equivalent static states. Rule weights, radii,
elevation, and font sizing remain exploratory values, not approved production
tokens. Browser rendering and accessibility verification remain pending.

## 16. Official shadcn React foundation and AI patterns — v1.12

A new primary React implementation is available in `packages/react/`, with its
catalog in `apps/react-library/`. Run `npm run dev` from the repository root to
open it at http://127.0.0.1:5173. The existing native HTML catalog and standalone
showcases are preserved as separate references, not presented as shadcn source.

The shared React package contains 64 official shadcn UI source modules installed
with CLI 4.23.0. The new catalog provides 68 UI compositions covering the core
component index plus Form/Iconography, and 22 AI compositions. AI wrappers are
local typed compositions of official primitives following shadcn's current AI
pattern approach, rather than an installation of the older AI SDK Elements package.
Provenance, registry styles, license, and source hashes are recorded in the package.

The shared foundations map into shadcn semantic variables. Data-slot anatomy
carries independent Forma/Minimal/Nocturne/Brutalism geometry, hierarchy, grouping,
surfaces, icon strokes, and motion through controls, feedback, data, overlays,
and agentic interfaces. Applying the active theme to the document root also
covers portaled menus and dialogs. Fonts remain local/fallback and values remain
exploratory. A scoped multi-theme portal strategy is not implemented.

AI patterns include conversation, prompt/file input, streaming text display and
stop, messages, process summaries, plans/queues, tools, subagents, explicit
confirmation, checkpoints, context, sources/citations, file trees, model selection,
suggestions, terminal output, stack traces and test results. Demos label fixture
content and local simulated streaming. No live model, tool, upload, backend,
command execution, persistence or credentials are configured. Consumers can
supply an abort-aware ChatTransport for their own backend. Text is rendered safely;
arbitrary HTML and rich Markdown are not enabled by default.

TypeScript and production build pass. Chromium checks cover all 90 example mounts,
all 20 system/mode/accent combinations for portaled dialogs, focus restoration,
validation recovery, keyboard tabs, table filtering, local chat send/stop, and
one narrow/reduced-motion layout. Screenshots of the four card expressions were
reviewed. These checks are not exhaustive contrast, cross-browser, or assistive-
technology conformance testing; those validations remain outstanding.

## 17. Repository documentation, focused references and skills — v1.13

The project architecture and contributor map now live in
`docs/architecture/PROJECT_STRUCTURE.md`. `docs/design/DESIGN_SYSTEMS.md` routes
Forma and the three Structured Chaos identities to separate focused Markdown
references and repository-local skills under `.agents/skills/`. These references
specialize the existing design authority; they do not change appearance or approve
new production tokens. Forma remains an independent family.

`.github/DESIGN_SYSTEMS.md` is the central contribution guide, with a short Copilot
entry point and a central repository skill. Skill discovery depends on the host;
these files are versioned in GitHub, not installed globally by this change.

The npm and MCP architecture documents are proposals only. The npm proposal
packages an immutable tested artifact behind a human-approved GitHub environment
before publication. The MCP proposal supplies pinned design resources, audits and
patch plans; application edits remain in the authorized agent host. No release
workflow, package publication, server implementation, client registration or
application migration is created by this documentation change. Future execution
requires a later task whose scope authorizes that implementation or action.

## 18. Installable distribution and consumer testing — v1.14

`packages/react/` now builds a self-contained private npm tarball: 71 readable
ESM entry points, declarations, compiled/scoped identity CSS, an optional separate
reset, and embedded/copied foundation data. All public exports target `dist`.
React/React DOM are external peers; package contents are allowlisted. No design
values or appearance directions are approved by this distribution work.

The theme resolver has explicit types and validates system, expression mode and
accent index before applying changes. Pure resolution imports safely without a
DOM. The default CSS omits global Preflight and host margin resets; only package
anatomy receives its scoped baseline. The catalog owns its own Tailwind pipeline.
UI/hook/AI entries retain client boundaries; no general RSC compatibility is claimed.

Local React/app/build/test sources have been formatted and compound state
declarations split for readability. Vendored upstream source remains unchanged.
Generated snippet and catalog metadata discovery uses the TypeScript AST rather
than formatting-sensitive regular expressions.

`npm run test:package` packs and installs the real artifact into a fresh app outside
npm workspaces, without aliases or Tailwind. It verifies all 64 UI exports plus
AI/hooks/helpers, strict declarations, bundled themes, a single React/React DOM
instance and SSR imports. Five Playwright tests cover compiled CSS/host margins,
20 theme variants and portals, forms/switch/tabs, explicit AI confirmation and
streaming stop, and narrow reduced-motion layout. The existing four catalog tests
and 326 static/state contracts also pass. Exhaustive accessibility and cross-browser
conformance remain open.

The artifact/report live under ignored `artifacts/package/`. The package remains
private and unpublished. Final scope/name/license/repository metadata, release
workflow and human approval/account settings remain outside this implementation.
The readiness checklist now records 11/20 complete, 3 repository items remaining
(one partially complete), and 6 owner/external items unverified.

## 19. Public package identity and release automation — v1.15

The approved package is `@inverse_ratio/design-system`, public, MIT, initially
0.1.0. Root/apps remain private. Upstream source and notices remain intact; the
build translates legacy internal source aliases to the approved public namespace.

Changesets produces version/changelog PRs. CI and release candidates run source,
static, catalog and clean-tarball browser checks. The candidate carries digests
and test evidence. A separate `npm-production` approval job publishes those exact
bytes with npm OIDC; it performs no dependency install or rebuild. Protection
checks reject missing reviewers, self-approval, admin bypass and stale main SHAs.
Only the publish job receives `id-token: write`; GitHub tags/releases follow
registry integrity verification. Publication defaults off until
`NPM_RELEASE_ENABLED=true` is configured. Nine local release tests pass.

These are implemented workflows, not evidence of GitHub execution or a public
release. npm ownership/trust, environment protection and branch settings remain
unverified. See `../architecture/RELEASE_SETUP.md`. Earlier private-artifact and
architecture-only statements describe their historical milestones; this section
supersedes them for npm release implementation. MCP remains architecture only.
No foundation, component identity or accessibility approval changes here.
