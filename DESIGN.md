# Station Eight Labs — DESIGN.md

Visual system follows the **AI for Business / Dayos** brutalist-editorial reference (warm canvas, oversized condensed type, flat surfaces). Logo files in `public/brand/` and `src/components/logo.tsx` are **out of scope** — do not recolor or redraw them.

## Color

Light (default):

- Canvas `--paper` `#F4F6EC` — off-white with a green cast, never pure white behind content. White cards carry no shadow or border, so they are told apart from the canvas by a 1.09:1 luminance step plus that green cast doing most of the work. Keep the cast if the canvas is ever re-tuned lighter — a neutral off-white at this luminance collapses to 1.02:1 and the cards vanish.
- Cards `--paper-elevated` `#FFFFFF`
- Mist `--mist` `#F3F3F3` — nav pill, hover surfaces
- Field `--field` `#F3F3F3` (dark `#2A2A2A`) — form controls; always placed on a card, never on the canvas
- Text `--ink` `#000000`
- Secondary `--ink-muted` `#444444` — body copy, nav labels
- Meta `--smoke` `#979797`
- Hairline `--line` `#C6C6C6` — list dividers only, never card borders
- Leaf chip `--accent` `#9EEB9E` — the green as a **surface**: tags, "view all" links, selection. A softer shade of `--leaf`, because a chip is a field of colour behind text where the saturated green gets heavy
- Leaf `--leaf` `#80EF80` — the green as a **mark**: the hero object's two green blocks and the solution icons on the black band. Stays saturated because a mark is small and needs to carry. The block faces derive their two darker sides from it with `color-mix`, so changing this one value reshades all of them
- The two greens are deliberately split by role. A green used as a surface and a green used as a mark are not interchangeable — reach for `--leaf` on icons and glyphs, `--accent` on anything text sits on top of
- Voltage `--voltage` `#FFF100` — the header's "book a call", email highlight, and two blocks on the hero object
- In-page CTAs are **black fill, white type** (`.btn-fill`). The header's "book a call" is **voltage fill, black type** (`.btn-voltage`) so the one CTA that follows you down the page is the one that stands out

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
- Depth is canvas / white / black, plus **two** shadows and no others: `.elev-card` for white cards and `.elev-control` for the header's pills and buttons. They exist because the canvas is an off-white — a white card only clears it by 1.09:1, so surface contrast alone no longer separates them. Do not invent a third.
- Hover is a surface change (`hover:bg-mist`) or underline, never elevation.
- Section CTAs — buttons and trailing arrow links alike — sit flush with the content edge at every width, so each one lands directly under the left edge of the card grid it follows. Centring them on phones was tried and removed: a lone centred control among left-aligned headings, body copy and cards reads as misaligned even when it is mathematically dead centre.

## Header

- 6rem tall on desktop, 5.5rem on tablet, 5rem on mobile (`h-20 md:h-22 lg:h-24`) — a steady step rather than a jump, since the controls inside do not change size across those breakpoints. Three-column grid: `logo | pill | controls` from `lg`, and `logo | theme | menu` below it, so the theme toggle stays reachable without opening the sheet. The sheet therefore carries locale and the CTA only.
- Wordmark is `h-6 sm:h-7` — deliberately one step under the header's cap height so it sits with the controls rather than dominating them.
- Pill contents scale with the viewport: `lg` shows the four hubs + Products; `xl` adds Work, About, chevrons and the second locale segment. Below `lg` everything moves into the hamburger sheet.
- The services mega panel shows a curated **twelve** (`menuServiceSlugs` in `content/services.ts`), not the whole catalogue. All twenty services keep their pages and stay on `/services`; the menu is a shortlist. Twenty entries made the panel taller than a laptop viewport, and a panel taller than the viewport is a trap — the pointer can never leave it, so `onMouseLeave` never fires and it stays open over the page. The panel is also capped at `min(72vh,30rem)` with scroll, and the header closes on `onMouseLeave` as a backstop, so no future list length can reintroduce that.
- Nav pill, locale switcher, theme toggle and the CTA all carry `.elev-control` and share a 40px height (the pill is 46px, deliberately, as the nav). The locale switcher is a round container with a round active segment — not `.btn-fill`, whose 8px radius fights it.
- Mega panel is anchored to the pill (not the trigger) so it stays inside the viewport; opens on hover / focus, closes on Escape, blur, or leaving the pill. ArrowDown on a trigger moves focus into the panel.

## Hero object

A software stack built like a building, in flat-shaded CSS 3D — three palette tones per block, softened corners, no gradients or shadows. The base is a three-step carbon plinth — a wide footing, a body carrying the wordmark on all four sides, and a graphite seat the tower stands down into — laid once and never cleared. On it stand three courses of four blocks. Each course carries **two** words, alternating around its four sides — the quality front and back, the layer left and right — so whichever way the tower is turned, the two faces you can see read as a pair: **01 robust architecture**, **02 scalable api**, **03 responsive interface**. The index is set once, on the quality face only, so the pair reads as one line rather than repeating the number. That pairing is the claim the object makes, and it is the reason the word split exists. Courses alternate carbon and concrete, with two mint and two voltage blocks spread through them as the only colour. Five faces per block, because the tower turns right round. The wordmark is the only bitmap on the object, and its light/dark variants swap the *opposite* way to the page, because the plinth tone inverts with the theme. Decorative and `aria-hidden`.

## Motion

Quiet decode-in (opacity + rise). The plinth is laid once, at load, and never leaves. Everything above it runs one 30s cycle: twelve blocks climb one after another — each appears below the base, rides a rising orbit around the *outside* of the tower, spirals in over the top and drops into its slot, filling course by course; the finished tower then holds completely still, turns a full 360 on its own axis at a constant 20°/s, and the blocks clear — each squashing onto its own horizontal plane, widening as it flattens the way a volume does when pressed into a sheet, before that sheet lifts and snaps out. Sequenced top course down, so nothing is ever left standing on a course that has already gone. The plinth stays, to be built on again. Timing is generated from the constants in `hero-figure.tsx` so it cannot drift from the geometry. The inverted band below it is a statement, not a marquee: the line is set once, centred, and does not move. Mega panel fades 180ms. Everything honours `prefers-reduced-motion` — the tower stands fully built.

## App icon

The wordmark is too wide for a square, so the icon is the part of it that still
reads at 16px: the braces alone, `#0061F6` sampled from
`public/brand/wordmark-braces.png`. Drawn from rectangles in `src/lib/app-icon.tsx`
rather than typed, so it never depends on a resolved font. There is no
`favicon.ico` — `icon.tsx` is the single source.

Background depends on where the icon lands, and the three cases are not
interchangeable:

| Variant | Used by | Background |
| --- | --- | --- |
| `any` | browser tab, manifest 192/512 | **transparent** |
| `apple` | iOS home screen | white — iOS flattens transparency onto black |
| `maskable` | Android launcher | white, wide margin — the launcher crops it |

## Chat launcher

The live launcher is the yellow chat bubble. TARS, the block-robot mascot, is in the project but **dormant**: `LAUNCHER` in `chatbot.tsx` picks `"bubble"` or `"mascot"`, and flipping that one value is the whole switch. While it is off the mascot component is never rendered, so three.js (`0.160.0`, kept installed) is never fetched — it costs nothing.

The mascot itself is `src/components/mascot-launcher.tsx` over `src/lib/tars-mascot.js` (a verbatim copy of the author's file — change the source and re-copy, never edit it here). When on, it mounts **into the launcher's slot inside the chatbot's corner column**, not floated over the page: a floating 132px figure would sit across the bottom ~68px of the open panel, whereas in the column the panel stacks above it with the column's own 12px gap. It is the library's own `<button>`, wired to the same toggle, with `aria-expanded`/`aria-label` kept in step and the greeting bubble hidden while the panel is open. Without WebGL the library draws a flat block grid and the click still works. `.chat-launcher:focus-visible` restores the site focus ring with `!important`, since the library resets its button's styles inline. The `.glb` in the mascot folder is unused by the JS and was not copied.

## Accessibility

- Visible focus: 2px ink outline, 2px offset, everywhere (`:focus-visible`). White outline on black surfaces.
- Skip link to `#main`.
- The locale switcher navigates the document rather than routing client-side. A locale change swaps `lang`, messages and metadata, and doing it client-side remounted the `[locale]` layout — which made next-themes re-render its inline `<script>` on the client, something React 19 rejects. It also sets the `NEXT_LOCALE` cookie first: the middleware's `localeDetection` outranks the URL, so without it a switch back to the default locale is bounced straight to the other one.
- Icons are `aria-hidden`; decorative marks are hidden from AT. The inverted statement band is real copy and is read normally.
- Footer copy is white throughout on its black band — hierarchy there comes from size and weight, never from greying text down. Social links are the official brand marks with an `aria-label`, not words.

## Do not

- Change the logo mark, braces, or brand PNGs.
- Fill large surfaces with mint or yellow (form success is a white card + mint tag, not a mint card).
- Use `.display` below 48px or with mixed case.
- Add gray borders to cards; lift them with `.elev-card` instead.
