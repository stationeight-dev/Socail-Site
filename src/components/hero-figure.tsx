/**
 * Hero object: eight cubes in a 2×2×2 block — eight bits, one byte.
 *
 * Built with flat-shaded CSS 3D (top / front / right faces in three tones
 * from the palette) so it reads as a physical product render on the canvas,
 * per DESIGN.md, without gradients, shadows or an image asset. The cubes
 * spell 0x38 — ASCII "8" — with carbon "1" bits, concrete "0" bits, and a
 * single mint mark on the front corner.
 *
 * Purely decorative: hidden from assistive tech; motion is disabled under
 * prefers-reduced-motion in globals.css.
 */
const BYTE = "00111000";

const cubes = Array.from({ length: 8 }, (_, i) => ({
  x: i & 1,
  y: (i >> 1) & 1,
  z: (i >> 2) & 1,
  tone: i === 7 ? "cube-mint" : BYTE[i] === "1" ? "cube-one" : "cube-zero",
}));

export function HeroFigure() {
  return (
    <figure
      className="byte-float relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[420px] xl:h-[460px]"
      aria-hidden
    >
      <div className="byte-scene">
        {cubes.map((cube, i) => (
          <div
            key={i}
            className={`cube ${cube.tone}`}
            style={
              {
                "--x": cube.x,
                "--y": cube.y,
                "--z": cube.z,
              } as React.CSSProperties
            }
          >
            <i className="face face-top" />
            <i className="face face-front" />
            <i className="face face-right" />
          </div>
        ))}
      </div>
      <figcaption className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-caption text-smoke">
        {BYTE.split("").join(" ")} · 0x38
      </figcaption>
    </figure>
  );
}
