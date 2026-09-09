"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* `reducedMotion="user"`: when the OS asks for reduced motion, Motion
          drops transform/layout animations but keeps opacity fades, and it
          does so without changing the rendered tree — so server and client
          markup stay identical and nothing is left stuck at opacity 0. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
