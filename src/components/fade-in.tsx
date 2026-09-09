"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Quiet decode-in on scroll: opacity + a short rise.
 *
 * Always renders the same `motion.div` on server and client. Reduced-motion
 * handling comes from `<MotionConfig reducedMotion="user">` in Providers,
 * which keeps the opacity fade and drops the rise — branching to a plain
 * `<div>` here would leave the server-rendered `opacity:0` in place after
 * hydration for reduced-motion users.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
