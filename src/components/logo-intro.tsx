"use client";

import Image from "next/image";
import { animate, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import braceLeft from "../../public/brand/intro/brace-left.png";
import braceRight from "../../public/brand/intro/brace-right.png";
import letters from "../../public/brand/intro/letters.png";
import lettersDark from "../../public/brand/intro/letters-dark.png";

/**
 * Splash shown once per tab session before the home hero: the blue braces
 * open from the centre, "STATION EIGHT" types in between them, then the
 * whole mark flies into the header logo while the backdrop fades.
 *
 * Geometry below is measured from `public/brand/wordmark-braces.png`
 * (1167×155). The wordmark is cut into three contiguous crops
 * (brace | letters | brace) so the pieces recompose pixel-exactly into the
 * same image the header renders, which makes the hand-off seamless.
 */
const PART = {
  braceLeft: 76 / 1167,
  letters: 1023 / 1167,
  braceRight: 68 / 1167,
};

/** Right edge of each glyph of "STATION EIGHT" as a fraction of the letters crop. */
const GLYPH_EDGES = [
  0.0811, 0.1691, 0.2542, 0.3275, 0.3656, 0.4614, 0.5582, // STATION
  0.6852, 0.7243, 0.8143, 0.9032, 0.9883, // EIGHT
];
const SPACE_AFTER = 7;
const GLYPH_COUNT = GLYPH_EDGES.length;

/** Sampled from the brace pixels. */
const BRACE_BLUE = "#0061f6";
const EASE = [0.22, 1, 0.36, 1] as const;
const SESSION_KEY = "s8:intro-played";

const TIMING = {
  start: 150, // ms before the braces move
  braces: 650, // ms for the braces to open
  glyph: 70, // ms per typed glyph
  space: 190, // ms pause on the word space
  hold: 650, // ms to sit on the finished mark
  exit: 0.65, // s for the fly-to-header
};

type Phase = "pending" | "braces" | "typing" | "hold" | "exit" | "done";

const pct = (fraction: number) => `${(fraction * 100).toFixed(3)}%`;

/** The header logo link and the bounding box of whichever of its images is visible. */
function findHeaderLogo(): { host: HTMLElement; rect: DOMRect } | null {
  const host = document.querySelector<HTMLElement>("[data-brand-logo]");
  if (!host) return null;
  for (const img of host.querySelectorAll("img")) {
    const rect = img.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return { host, rect };
  }
  return null;
}

export function LogoIntro() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("pending");
  const [typed, setTyped] = useState(0);
  const backdropRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const skip = useCallback(() => {
    setTyped(GLYPH_COUNT);
    setPhase((current) =>
      current === "braces" || current === "typing" || current === "hold" ? "exit" : current,
    );
  }, []);

  // Play once per tab session; returning visitors get the page straight away.
  useEffect(() => {
    let played = false;
    try {
      played = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage unavailable (privacy mode); just play.
    }
    const id = window.setTimeout(
      () => {
        if (played) {
          setPhase((current) => (current === "pending" ? "done" : current));
          return;
        }
        // Mark the session only once playback really starts, so React's
        // development double-invoked effects don't count as a visit.
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // Ignore.
        }
        if (reduce) {
          setTyped(GLYPH_COUNT);
          setPhase((current) => (current === "pending" ? "hold" : current));
        } else {
          setPhase((current) => (current === "pending" ? "braces" : current));
        }
      },
      played ? 0 : TIMING.start,
    );
    return () => window.clearTimeout(id);
  }, [reduce]);

  // Braces have opened → start typing.
  useEffect(() => {
    if (phase !== "braces") return;
    const id = window.setTimeout(() => setPhase("typing"), TIMING.braces + 60);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Type one glyph at a time, pausing on the space between the words.
  useEffect(() => {
    if (phase !== "typing") return;
    if (typed >= GLYPH_COUNT) {
      const id = window.setTimeout(() => setPhase("hold"), 60);
      return () => window.clearTimeout(id);
    }
    const delay = typed === SPACE_AFTER ? TIMING.space : TIMING.glyph;
    const id = window.setTimeout(() => setTyped((n) => n + 1), delay);
    return () => window.clearTimeout(id);
  }, [phase, typed]);

  // Sit on the finished mark, then leave.
  useEffect(() => {
    if (phase !== "hold") return;
    const id = window.setTimeout(() => setPhase("exit"), reduce ? 900 : TIMING.hold);
    return () => window.clearTimeout(id);
  }, [phase, reduce]);

  // Exit: fade the backdrop and fly the mark onto the header logo.
  useEffect(() => {
    if (phase !== "exit") return;
    const backdrop = backdropRef.current;
    const logo = logoRef.current;
    if (!backdrop || !logo) {
      const id = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(id);
    }

    const controls = [
      animate(backdrop, { opacity: 0 }, { duration: 0.5, delay: 0.12, ease: EASE }),
    ];

    const target = reduce ? null : findHeaderLogo();
    if (target) {
      // Keep the real header logo hidden until the flying copy lands on it,
      // otherwise both are visible while the backdrop is fading.
      target.host.style.visibility = "hidden";
      const from = logo.getBoundingClientRect();
      controls.push(
        animate(
          logo,
          {
            x: target.rect.left - from.left,
            y: target.rect.top - from.top,
            scale: target.rect.width / from.width,
          },
          { duration: TIMING.exit, ease: EASE },
        ),
      );
    } else {
      controls.push(animate(logo, { opacity: 0 }, { duration: 0.4, ease: EASE }));
    }

    let cancelled = false;
    Promise.all(controls.map((c) => c.finished)).then(() => {
      if (cancelled) return;
      // Reveal the header logo before unmounting so the swap is invisible.
      if (target) target.host.style.visibility = "";
      setPhase("done");
    });
    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
      if (target) target.host.style.visibility = "";
    };
  }, [phase, reduce]);

  // Lock scrolling while the splash is up.
  useEffect(() => {
    if (phase === "done") return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [phase]);

  // Any key or click skips ahead.
  useEffect(() => {
    if (phase === "pending" || phase === "exit" || phase === "done") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip]);

  if (phase === "done") return null;

  const edge = typed === 0 ? 0 : GLYPH_EDGES[typed - 1];
  const clipPath = `inset(0 ${((1 - edge) * 100).toFixed(2)}% 0 0)`;
  const bracesOpen = phase !== "pending";
  const showCaret = phase === "typing" || (phase === "hold" && !reduce);

  // Braces start touching in the middle and slide out to make room. The
  // offsets are in % of each brace's own width so they scale with the mark.
  const braceTransition = reduce
    ? { duration: 0 }
    : {
        x: { duration: TIMING.braces / 1000, ease: EASE },
        opacity: { duration: 0.3, ease: "easeOut" as const },
      };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden
      onClick={skip}
    >
      <div ref={backdropRef} className="absolute inset-0 bg-paper" />

      <div
        ref={logoRef}
        className="relative flex w-[min(84vw,640px)] items-center"
        style={{ transformOrigin: "0 0" }}
      >
        <motion.div
          className="shrink-0"
          style={{ width: pct(PART.braceLeft) }}
          initial={{ opacity: 0, x: pct(PART.letters / 2 / PART.braceLeft) }}
          animate={bracesOpen ? { opacity: 1, x: 0 } : undefined}
          transition={braceTransition}
        >
          <Image src={braceLeft} alt="" className="h-auto w-full" sizes="48px" priority />
        </motion.div>

        <div className="relative shrink-0" style={{ width: pct(PART.letters) }}>
          <Image
            src={letters}
            alt=""
            className="h-auto w-full dark:hidden"
            style={{ clipPath }}
            sizes="600px"
            priority
          />
          <Image
            src={lettersDark}
            alt=""
            className="hidden h-auto w-full dark:block"
            style={{ clipPath }}
            sizes="600px"
            priority
          />
          {showCaret ? (
            <motion.span
              className="absolute rounded-[1px]"
              style={{
                left: pct(edge + 0.012),
                top: "31%",
                height: "40%",
                width: "0.7%",
                background: BRACE_BLUE,
              }}
              animate={phase === "hold" ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
              transition={
                phase === "hold"
                  ? { duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }
                  : { duration: 0 }
              }
            />
          ) : null}
        </div>

        <motion.div
          className="shrink-0"
          style={{ width: pct(PART.braceRight) }}
          initial={{ opacity: 0, x: `-${pct(PART.letters / 2 / PART.braceRight)}` }}
          animate={bracesOpen ? { opacity: 1, x: 0 } : undefined}
          transition={braceTransition}
        >
          <Image src={braceRight} alt="" className="h-auto w-full" sizes="48px" priority />
        </motion.div>
      </div>
    </div>
  );
}
