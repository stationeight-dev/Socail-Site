# Station Eight Labs — DESIGN.md

Visual system follows the **AI for Business / Dayos** brutalist-editorial reference (warm canvas, oversized condensed type, flat surfaces). Logo files in `public/brand/` and `src/components/logo.tsx` are **out of scope** — do not recolor or redraw them.

## Color

Light (default):

- Canvas `--paper` `#E5E5E5` — never pure white behind content
- Cards `--paper-elevated` `#FFFFFF`
- Mist `--mist` `#F3F3F3` — nav pill, hover surfaces
- Field `--field` `#F3F3F3` (dark `#2A2A2A`) — form controls; always placed on a card, never on the canvas
- Text `--ink` `#000000`
- Secondary `--ink-muted` `#444444` — body copy, nav labels
- Meta `--smoke` `#979797`
- Hairline `--line` `#C6C6C6` — list dividers only, never card borders
- Mint accent `--accent` `#D1FFCA` — tags, "view all" links, two blocks on the hero object
- Voltage `--voltage` `#FFF100` — email highlight, and two blocks on the hero object
- Primary CTA is **black fill, white type**, not mint

Dark: canvas `#111111`, cards `#1C1C1C`, white ink. Mint and yellow stay as accents. The footer band is black in both themes and uses fixed colours, not tokens.

## Type

Tokens live in `globals.css` (`@theme`) and generate utilities:

| Utility            | Size  | Leading | Tracking |
| ------------------ | ----- | ------- | -------- |
| `text-caption`     | 12px  | 1.6     | -0.03em  |
| `text-body-sm`     | 14px  | 1.3     | -0.011em |
| `text-body`        | 16px  | 1.25    | —        |
| `text-subheading`  | 18px  | 1.33    | —        |
| `text-subheading-lg` | 20px | 1.2    | —        |
| `text-heading-sm`  | 28px  | 1.3     | -0.03em  |
| `text-heading`     | 40px  | 1.1     | -0.02em  |
| `text-heading-lg`  | 48px  | 0.9     | -0.03em  |
| `text-display`     | 80px  | 0.9     | -0.03em  |
| `text-display-xl`  | 130px | 0.9     | -0.03em  |

- `.display` — Barlow Condensed 700, uppercase, 0.9 leading. Never below 48px; hero clamps `3rem → 8.125rem`.
- `.heading` — Inter 450 (`font-book`), uppercase, 1.1 leading. Section titles 28→40px, card titles 18–28px.
- Body — Inter 500, 16px. Long copy uses `leading-[1.4]`.
- Labels — Geist Mono 12px (`font-mono text-caption`).

## Shape

- Cards 32px, large cards / top-arc sections 64px, nav pill 48px, tags 64px.
- Buttons: filled 8px, ghost-border 4px (1.5px slate border), text link 4px.
- No box-shadows anywhere. Depth = canvas / white / black only.
- Hover is a surface change (`hover:bg-mist`) or underline, never elevation.

## Header

- 8rem tall on desktop, 5rem on mobile. Three-column grid `logo | pill | controls` so the pill is centred and can never overlap the controls.
- Pill contents scale with the viewport: `lg` shows the four hubs + Products; `xl` adds Work, About, chevrons and the second locale segment. Below `lg` everything moves into the hamburger sheet.
- Mega panel is anchored to the pill (not the trigger) so it stays inside the viewport; opens on hover / focus, closes on Escape, blur, or leaving the pill. ArrowDown on a trigger moves focus into the panel.

## Hero object

A software stack built like a building, in flat-shaded CSS 3D — three palette tones per block, softened corners, no gradients or shadows. The base is a three-step carbon plinth — a wide footing, a body carrying the wordmark on all four sides, and a graphite seat the tower stands down into — laid once and never cleared. On it stand three courses of four blocks. Each course carries **two** words, alternating around its four sides — the quality front and back, the layer left and right — so whichever way the tower is turned, the two faces you can see read as a pair: **01 robust architecture**, **02 scalable api**, **03 responsive interface**. The index is set once, on the quality face only, so the pair reads as one line rather than repeating the number. That pairing is the claim the object makes, and it is the reason the word split exists. Courses alternate carbon and concrete, with two mint and two voltage blocks spread through them as the only colour. Five faces per block, because the tower turns right round. The wordmark is the only bitmap on the object, and its light/dark variants swap the *opposite* way to the page, because the plinth tone inverts with the theme. Decorative and `aria-hidden`.

## Motion

Quiet decode-in (opacity + rise). The plinth is laid once, at load, and never leaves. Everything above it runs one 30s cycle: twelve blocks climb one after another — each appears below the base, rides a rising orbit around the *outside* of the tower, spirals in over the top and drops into its slot, filling course by course; the finished tower then holds completely still, turns a full 360 on its own axis at a constant 20°/s, and the blocks clear together, leaving the plinth to be built on again. Timing is generated from the constants in `hero-figure.tsx` so it cannot drift from the geometry. The inverted band below it is a statement, not a marquee: the line is set once, centred, and does not move. Mega panel fades 180ms. Everything honours `prefers-reduced-motion` — the tower stands fully built.

## Accessibility

- Visible focus: 2px ink outline, 2px offset, everywhere (`:focus-visible`). White outline on black surfaces.
- Skip link to `#main`.
- Icons are `aria-hidden`; decorative marks are hidden from AT. The inverted statement band is real copy and is read normally.

## Do not

- Change the logo mark, braces, or brand PNGs.
- Fill large surfaces with mint or yellow (form success is a white card + mint tag, not a mint card).
- Use `.display` below 48px or with mixed case.
- Add gray borders to cards; use surface contrast.
