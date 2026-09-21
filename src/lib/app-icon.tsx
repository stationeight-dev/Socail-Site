import { ImageResponse } from "next/og";

/**
 * App icon: the wordmark's blue braces on white.
 *
 * The full wordmark is far too wide for a square, so the icon carries the part
 * of it that still reads at 16px — the braces. `#0061F6` is sampled from
 * `public/brand/wordmark-braces.png`, so the tab matches the header exactly.
 *
 * The braces are built from plain rectangles rather than typed as text: a
 * favicon must not depend on which font the renderer resolves, and drawn bars
 * keep their weight at 16px where a text glyph would thin out to nothing.
 * Everything is laid out with absolute offsets — satori supports no transforms
 * here, so the mirrored brace is positioned rather than flipped.
 */
const BLUE = "#0061F6";
const WHITE = "#ffffff";

/**
 * - `any`      the browser tab and the manifest's plain icons. Transparent, so
 *              the braces sit straight on whatever the tab strip is painted.
 * - `apple`    the iOS home-screen icon. Opaque: iOS flattens transparency onto
 *              black, which would bury a blue mark.
 * - `maskable` the Android launcher icon. Opaque and full-bleed by spec — the
 *              launcher crops it to its own shape, so it needs a wider margin.
 */
export type AppIconVariant = "any" | "apple" | "maskable";

type Bar = { left: number; top: number; width: number; height: number };

/**
 * One brace as four bars: a spine split around the elbow, a nub at each end
 * turning towards the word, and the elbow itself pointing away from it.
 * `dir` is 1 for `{`, -1 for `}`.
 */
function braceBars(h: number, weight: number, dir: 1 | -1): Bar[] {
  const elbow = Math.round(h * 0.13);
  const tip = Math.max(weight, Math.round(h * 0.22));
  const width = elbow + tip;
  const half = (h - weight) / 2;

  const spineX = dir === 1 ? elbow : width - elbow - weight;
  const nubX = dir === 1 ? elbow : width - elbow - tip;
  const elbowX = dir === 1 ? 0 : width - elbow - weight;

  return [
    // spine, upper and lower
    { left: spineX, top: 0, width: weight, height: half },
    { left: spineX, top: h - half, width: weight, height: half },
    // the turns at each end
    { left: nubX, top: 0, width: tip, height: weight },
    { left: nubX, top: h - weight, width: tip, height: weight },
    // the elbow
    { left: elbowX, top: half, width: elbow + weight, height: weight },
  ];
}

function Brace({ h, weight, dir }: { h: number; weight: number; dir: 1 | -1 }) {
  const elbow = Math.round(h * 0.13);
  const tip = Math.max(weight, Math.round(h * 0.22));
  const radius = Math.round(weight / 2);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: elbow + tip,
        height: h,
      }}
    >
      {braceBars(h, weight, dir).map((bar, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: bar.left,
            top: bar.top,
            width: bar.width,
            height: bar.height,
            borderRadius: radius,
            background: BLUE,
          }}
        />
      ))}
    </div>
  );
}

export function appIconResponse(size: number, variant: AppIconVariant = "any") {
  // Maskable icons get cropped to a circle by the launcher, so they need a
  // wider safe area than a favicon does.
  const padRatio = variant === "maskable" ? 0.3 : size <= 32 ? 0.14 : 0.2;
  const pad = Math.round(size * padRatio);
  const inner = size - pad * 2;
  const background = variant === "any" ? "transparent" : WHITE;

  // Heavier at small sizes, or the braces vanish in a browser tab.
  const weight = Math.max(2, Math.round(inner * (size <= 32 ? 0.13 : 0.11)));
  const gap = Math.max(2, Math.round(inner * 0.2));

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap }}>
          <Brace h={inner} weight={weight} dir={1} />
          <Brace h={inner} weight={weight} dir={-1} />
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
