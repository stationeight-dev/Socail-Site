/**
 * Hero object: a software stack, built like a building.
 *
 * One cycle, start to finish:
 *
 *   1. the architecture plinth rises into place — the base, laid first;
 *   2. twelve blocks climb, one after another: each appears below the base,
 *      rides a rising orbit around the OUTSIDE of the tower, spirals in over
 *      the top and drops into its own slot, filling course by course;
 *   3. the finished tower holds still — nothing moves, nothing cycles;
 *   4. it turns a full 360 on its own axis;
 *   5. the whole thing clears, and it builds again from the plinth up.
 *
 * The timing is the hard part. Every piece runs on ONE master cycle so the
 * tower can clear all at once instead of coming apart in build order. Position
 * (`climb-lift` / `climb-orbit`) uses shared keyframes offset by each block's
 * `animation-delay`, while visibility uses a generated per-block `pop-n`
 * keyframe on a zero delay — the two coincide exactly, because a block's
 * position animation restarts at `delay + n * cycle`, which is the same instant
 * its `pop` keyframe scales it back up. That is what lets the clear at 92.9% be
 * simultaneous while the build stays staggered. Scale, not opacity, does the
 * hiding: opacity on a preserve-3d element would flatten the block's faces into
 * one plane.
 *
 * Flat-shaded CSS 3D — five faces per block so it survives a full turn, three
 * palette tones, softened corners, no gradients or shadows. The one bitmap on
 * the object is the wordmark set into the plinth.
 *
 * Purely decorative: hidden from assistive tech; under prefers-reduced-motion
 * every animation is dropped in globals.css, which leaves the tower standing
 * fully built.
 */

/** The whole cycle, in seconds. Every keyframe percentage below derives from it. */
const CYCLE = 30;

/* --- the schedule, in seconds --------------------------------------------- */
/** The plinth is in place by here. */
const BASE_IN = 1.0;
/** First block leaves the ground. */
const CLIMB_START = 1.5;
/** Gap between one block leaving and the next. */
const STAGGER = 0.42;
/** How long one block spends getting from the ground to its slot. */
const CLIMB = 2.9;
/** The finished tower starts its turn. */
const TURN_START = 10.0;
/** The turn is done and the blocks start to clear. 18s for one revolution. */
const CLEAR_START = 28.0;
/** Every block is gone. The plinth is not — it never leaves. */
const CLEAR_END = 29.1;

const pct = (s: number) => +((s / CYCLE) * 100).toFixed(3);

/* --- geometry, in `--cube` units, negative `y` up ------------------------- */
/** Course-to-course pitch — a hair over a block, so the seams read. */
const PITCH = 1.04;
/** Where a climbing block starts: below the plinth, ready to come up. */
const START_Y = 1.0;

/**
 * The plinth carries the wordmark, not a course name — it is the company the
 * rest is built on. Three parts rather than one slab, so it reads as a
 * machined pedestal: a wide footing, the body that carries the mark, and a
 * recessed seat the tower stands in. Widths and heights are in `--cube` units;
 * the stack is arranged so the seat's top lands exactly on y = 0, which is the
 * plane the first course sits on.
 */
const BASE = { tone: "block-carbon" };

const PLINTH = [
  /** Footing — the widest step, and the part that meets the ground. */
  { part: "footing", w: 2.86, h: 0.18, y: 0.56, tone: "block-carbon", at: 0 },
  /** Body — carries the wordmark on all four sides. */
  { part: "body", w: 2.45, h: 0.4, y: 0.27, tone: "block-carbon", at: 0.12 },
  /**
   * Seat — narrower than the body and a shade lighter, so a rim of the body's
   * top face shows around it and the tower reads as set INTO the plinth.
   */
  { part: "seat", w: 2.18, h: 0.07, y: 0.035, tone: "block-graphite", at: 0.24 },
];

/** The body's half-width, which is what the wordmark plate spans. */
const MARK_HALF = PLINTH[1].w / 2;

/**
 * The three courses. Each carries TWO words, alternating around its four
 * sides: the quality on front and back, the layer on left and right. Whichever
 * way the tower is turned you are looking at one of each, so the pair always
 * reads together — "robust architecture", "scalable api", "responsive
 * interface". That is the claim the object is making.
 */
const COURSES = [
  { index: "01", quality: "Robust", layer: "Architecture", tone: "block-light" },
  { index: "02", quality: "Scalable", layer: "API", tone: "block-carbon" },
  {
    index: "03",
    quality: "Responsive",
    layer: "Interface",
    tone: "block-light",
  },
];

/**
 * The four slots in a course, in the order they fill: the back pair first,
 * then the front pair, so a course closes towards the camera.
 */
const CELLS = [
  { x: -0.52, z: -0.52 },
  { x: 0.52, z: -0.52 },
  { x: -0.52, z: 0.52 },
  { x: 0.52, z: 0.52 },
];

/**
 * The accent blocks: two mint and two voltage, spread across the courses so
 * neither colour clumps into a band.
 */
const ACCENTS: Record<number, string> = {
  2: "block-voltage",
  5: "block-mint",
  9: "block-voltage",
  11: "block-mint",
};

const blocks = COURSES.flatMap((course, c) =>
  CELLS.map((cell, i) => {
    const n = c * CELLS.length + i;
    const y = -(c + 0.5) * PITCH;
    return {
      n,
      ...cell,
      y,
      tone: ACCENTS[n] ?? course.tone,
      drop: START_Y - y,
      start: CLIMB_START + n * STAGGER,
    };
  }),
);

/** A course name appears as its last block lands, and clears with the tower. */
const tags = COURSES.map((course, c) => ({
  ...course,
  y: -(c + 0.5) * PITCH,
  at: CLIMB_START + (c * CELLS.length + CELLS.length - 1) * STAGGER + CLIMB,
}));

/**
 * How long after the block above it a block begins to go. Top course first, so
 * nothing is ever left standing on a course that has already cleared.
 */
const CLEAR_STAGGER = 0.05;
/** What is left of the clear window for one block's own dissolve. */
const DISSOLVE = CLEAR_END - CLEAR_START - (COURSES.length * CELLS.length - 1) * CLEAR_STAGGER;

/**
 * Per-block visibility, and the way a block leaves.
 *
 * Scaled to nothing until the block's turn, full size from then until the
 * tower clears. The clear is a collapse rather than a shrink: the block
 * squashes onto its own horizontal plane — widening slightly as it flattens,
 * the way a volume does when it is pressed into a sheet — and that sheet then
 * lifts and snaps out. Sequenced from the top down over `CLEAR_STAGGER`, so it
 * reads as a controlled power-down rather than twelve things vanishing at once.
 *
 * Scale, not opacity, throughout: opacity on a preserve-3d element flattens the
 * block's five faces into a single plane.
 */
const popKeyframes = blocks
  .map(({ n, start }) => {
    const on = pct(start);
    // Highest index is the top course, and goes first.
    const from = CLEAR_START + (blocks.length - 1 - n) * CLEAR_STAGGER;
    const at = (f: number) => pct(from + DISSOLVE * f);
    const T = (y: number, x: number, sy: number, z = x) =>
      `translate3d(0,calc(${y}*var(--cube)),0) scale3d(${x},${sy},${z})`;
    return (
      `@keyframes pop-${n}{` +
      `0%,${on}%{transform:${T(0, 0, 0)}}` +
      // in, and held
      `${pct(start + 0.3)}%,${pct(from)}%{transform:${T(0, 1, 1)}}` +
      // the squash begins
      `${at(0.3)}%{transform:${T(0, 1.06, 0.72)}}` +
      // pressed flat into a sheet
      `${at(0.62)}%{animation-timing-function:cubic-bezier(0.6,0,0.85,0);transform:${T(-0.06, 1.1, 0.05)}}` +
      // the sheet lifts away and is gone
      `${at(1)}%{transform:${T(-0.7, 0, 0)}}` +
      // back to parked; both ends are scale 0, so the return is invisible
      `100%{transform:${T(0, 0, 0)}}}`
    );
  })
  .join("");

/** Course names come in as their course closes and clear with the blocks. */
const tagKeyframes = tags
  .map(
    (tag, i) =>
      `@keyframes tag-${i}{0%,${pct(tag.at)}%{opacity:0}${pct(
        tag.at + 0.4,
      )}%,${pct(CLEAR_START)}%{opacity:1}${pct(CLEAR_END)}%,100%{opacity:0}}`,
  )
  .join("");

/* --- the path, generated so percentages can never drift from the seconds --- */

/** Fraction of the climb spent circling before the spiral in. */
const CIRCLE = 0.66;
/** Fraction of the climb by which the spiral has reached the axis. */
const SPIRAL = 0.92;

/** A point on the orbit, as a share of `--orbit` so the radius stays tunable. */
const at = (deg: number, r = 1) => {
  const a = (deg * Math.PI) / 180;
  const x = +(Math.cos(a) * r).toFixed(4);
  const z = +(Math.sin(a) * r).toFixed(4);
  return `translate3d(calc(var(--orbit)*${x}*var(--cube)),0,calc(var(--orbit)*${z}*var(--cube)))`;
};

/** One and a quarter turns at 45deg steps, then a tightening spiral to centre. */
const orbit = [
  ...Array.from({ length: 11 }, (_, i) => ({
    s: (i / 10) * CIRCLE * CLIMB,
    v: at(i * 45),
  })),
  { s: 0.79 * CLIMB, v: at(495, 0.48) },
  { s: SPIRAL * CLIMB, v: at(540, 0.33) },
  { s: CLIMB, v: "translate3d(0,0,0)" },
]
  .map(({ s, v }) => `${pct(s)}%{transform:${v}}`)
  .join("");

const orbitKeyframes = `@keyframes climb-orbit{${orbit}100%{transform:translate3d(0,0,0)}}`;

const liftKeyframes =
  `@keyframes climb-lift{` +
  `0%{transform:translateY(calc(var(--drop,1)*var(--cube)))}` +
  `${pct(CIRCLE * CLIMB)}%{transform:translateY(calc(var(--hover)*var(--cube)))}` +
  `${pct(SPIRAL * CLIMB)}%{animation-timing-function:cubic-bezier(0.5,0,0.2,1);` +
  `transform:translateY(calc(var(--hover)*var(--cube)))}` +
  `${pct(CLIMB)}%,100%{transform:translateY(0)}}`;

/**
 * The plinth rises once, at load, and then stays put for good — it is the one
 * thing that never clears. One-shot, so it sits outside the master cycle
 * entirely; `.base-lay` in globals.css overrides the looping timing.
 */
const baseKeyframes =
  `@keyframes base-lay{` +
  `0%{transform:translate3d(0,calc(var(--cube)*1.1),0) scale3d(0,0,0)}` +
  `100%{transform:translate3d(0,0,0) scale3d(1,1,1)}}` +
  `@keyframes name-hold{0%{opacity:0}100%{opacity:1}}`;

/**
 * The scene: a gentle sway left and right while the tower goes up, then one
 * full turn on the same axis once it is finished. -405deg is -45deg plus a
 * whole revolution, so the loop point is invisible.
 */
const iso = (deg: number) =>
  `translateY(var(--lift)) rotateX(-35.264deg) rotateY(${deg}deg)`;

const turnKeyframes =
  `@keyframes stack-turn{` +
  `0%{animation-timing-function:ease-in-out;transform:${iso(-45)}}` +
  `${pct(TURN_START / 3)}%{animation-timing-function:ease-in-out;transform:${iso(-51)}}` +
  `${pct((TURN_START * 2) / 3)}%{animation-timing-function:ease-in-out;transform:${iso(-39)}}` +
  // linear, so the revolution holds one rate end to end instead of easing
  `${pct(TURN_START)}%{animation-timing-function:linear;transform:${iso(-45)}}` +
  `${pct(CLEAR_START)}%,100%{transform:${iso(-405)}}}`;

const schedule =
  `.stack-scene{--cycle:${CYCLE}s}` +
  turnKeyframes +
  orbitKeyframes +
  liftKeyframes +
  baseKeyframes;

/** Five faces: the tower turns all the way round, so it needs its back. */
const faces = (
  <>
    <i className="face face-top" />
    <i className="face face-front" />
    <i className="face face-back" />
    <i className="face face-right" />
    <i className="face face-left" />
  </>
);

/**
 * The quality word faces front and back, the layer word left and right, so any
 * two visible sides read as the pair. The index is set ONCE, on the quality
 * face only — two adjacent faces then read "01 robust architecture" rather
 * than repeating the number.
 */
function CourseFaces({
  index,
  quality,
  layer,
}: {
  index: string;
  quality: string;
  layer: string;
}) {
  const numbered = (
    <>
      <b>{index}</b>
      <em>{quality}</em>
    </>
  );
  const plain = <em>{layer}</em>;
  return (
    <>
      <span className="course-name name-front">{numbered}</span>
      <span className="course-name name-back">{numbered}</span>
      <span className="course-name name-right">{plain}</span>
      <span className="course-name name-left">{plain}</span>
    </>
  );
}

/**
 * The wordmark, set into all four sides of the plinth. Drawn as a CSS
 * background rather than four pairs of <img>: the theme swap is a one-line
 * rule and the browser fetches a single file. See `.plinth-mark` in
 * globals.css — the plinth tone inverts with the theme, so the logo variant
 * swaps the OPPOSITE way round to the rest of the site.
 */
function PlinthMark() {
  return (
    <>
      <span className="plinth-mark name-front" />
      <span className="plinth-mark name-back" />
      <span className="plinth-mark name-right" />
      <span className="plinth-mark name-left" />
    </>
  );
}

export function HeroFigure() {
  return (
    <figure
      className="stack-float relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[420px] xl:h-[460px]"
      aria-hidden
    >
      <style
        dangerouslySetInnerHTML={{
          __html: schedule + popKeyframes + tagKeyframes,
        }}
      />
      <div className="stack-scene">
        {/* The plinth: laid first, normally, and the thing everything stands on.
            Footing, body and seat land a beat apart so it assembles rather than
            appearing whole. */}
        {PLINTH.map((part) => (
          <div
            key={part.part}
            className="stack-slot"
            style={{ "--y": `${part.y}` } as React.CSSProperties}
          >
            <div
              className={`stack-block plinth-part ${part.tone} base-lay`}
              style={
                {
                  "--pw": `${part.w}`,
                  "--ph": `${part.h}`,
                  "--delay": `${part.at}s`,
                } as React.CSSProperties
              }
            >
              {faces}
            </div>
          </div>
        ))}

        {/* The wordmark on the plinth body. Held, like the plinth itself. */}
        <div
          className={`stack-slot course-tag ${BASE.tone}`}
          style={
            {
              "--y": `${PLINTH[1].y}`,
              "--name-half": `${MARK_HALF}`,
              "--name-anim": "name-hold",
              "--name-delay": `${BASE_IN}s`,
            } as React.CSSProperties
          }
        >
          <PlinthMark />
        </div>

        {/* Every block above: each climbs the outside to its own slot. */}
        {blocks.map((block) => (
          <div
            key={block.n}
            className="stack-slot"
            style={
              {
                "--x": `${block.x}`,
                "--y": `${block.y}`,
                "--z": `${block.z}`,
              } as React.CSSProperties
            }
          >
            <div
              className="climb-lift"
              style={
                {
                  "--drop": `${block.drop}`,
                  "--delay": `${block.start}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="climb-orbit"
                style={{ "--delay": `${block.start}s` } as React.CSSProperties}
              >
                <div
                  className={`stack-block ${block.tone}`}
                  style={
                    { animationName: `pop-${block.n}` } as React.CSSProperties
                  }
                >
                  {faces}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Course names, on the face of the course they belong to. */}
        {tags.map((tag, i) => (
          <div
            key={tag.index}
            className={`stack-slot course-tag ${tag.tone}`}
            style={
              {
                "--y": `${tag.y}`,
                "--name-half": "1.02",
                // animation-name is not inherited, so the spans pick theirs up
                // through a custom property instead.
                "--name-anim": `tag-${i}`,
              } as React.CSSProperties
            }
          >
            <CourseFaces
              index={tag.index}
              quality={tag.quality}
              layer={tag.layer}
            />
          </div>
        ))}
      </div>
    </figure>
  );
}
