"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Form success: letter tucks into an envelope, flap closes, then the thank-you. */
export function LetterSent({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full min-h-[280px] w-full flex-1 -translate-y-5 flex-col items-center justify-center gap-8"
    >
      <div className="letter-scene" aria-hidden>
        <div className="letter-envelope">
          <div className="letter-back" />
          <div className="letter-sheet">
            <span className="letter-sheet-line" />
            <span className="letter-sheet-line w-[68%]" />
            <span className="letter-sheet-line w-[82%]" />
          </div>
          <div className="letter-pocket" />
          <div className="letter-flap letter-flap-open" />
          <div className="letter-flap letter-flap-shut" />
          <div className="letter-lip" />
        </div>
      </div>
      <motion.p
        className="text-heading font-book tracking-[-0.02em] text-ink"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 1.4 }}
      >
        {children}
      </motion.p>
    </div>
  );
}
