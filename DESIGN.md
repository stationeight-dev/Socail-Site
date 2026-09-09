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
- Mint accent `--accent` `#D1FFCA` — tags, "view all" links, one mark on the hero object
- Voltage `--voltage` `#FFF100` — email highlight only
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

Eight isometric cubes (2×2×2 = one byte) in flat-shaded CSS 3D — three palette tones per cube, no gradients or shadows. Carbon cubes are the `1` bits of `0x38` (ASCII "8"), the front corner is the single mint mark. Decorative and `aria-hidden`.

## Motion

Quiet decode-in (opacity + rise). Hero object floats and turns slowly. One inverted marquee (`aria-hidden`). Mega panel fades 180ms. Everything honours `prefers-reduced-motion`.

## Accessibility

- Visible focus: 2px ink outline, 2px offset, everywhere (`:focus-visible`). White outline on black surfaces.
- Skip link to `#main`.
- Icons are `aria-hidden`; decorative marks and the marquee are hidden from AT.

## Do not

- Change the logo mark, braces, or brand PNGs.
- Fill large surfaces with mint or yellow (form success is a white card + mint tag, not a mint card).
- Use `.display` below 48px or with mixed case.
- Add gray borders to cards; use surface contrast.
