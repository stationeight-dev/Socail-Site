"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TARS as the chat launcher — the block-robot from src/lib/tars-mascot.js (a
 * verbatim copy of the author's file; change the source and re-copy, never edit
 * it here).
 *
 * Kept in the project but DORMANT: `LAUNCHER` in chatbot.tsx decides whether
 * this or the yellow bubble stands in the corner. While it is off, nothing in
 * here runs — this component is never rendered, so the dynamic imports below
 * never fire and three.js is never fetched. Flipping that one value is the
 * whole change.
 *
 * It renders into the launcher's slot inside the chatbot's corner column, not
 * floating over the page: a floating 132px figure would sit across the bottom
 * ~68px of the open panel, whereas in the column the panel stacks above it with
 * the column's own gap. It is the library's own <button>, wired to the same
 * toggle the bubble uses, so the panel itself is untouched. Without WebGL the
 * library draws a flat block grid and the click still works.
 */

/** What `TarsMascot.mount()` hands back. */
type TarsController = {
  el: HTMLElement;
  destroy: () => void;
  say: (text: string, ms?: number) => void;
  setBadge: (on: boolean) => void;
  pause: (paused: boolean) => void;
};

declare global {
  interface Window {
    TarsMascot?: {
      mount: (options: {
        THREE: typeof import("three");
        container?: HTMLElement | null;
        size?: number;
        label?: string;
        greeting?: string;
        badge?: boolean;
        onClick?: (event: MouseEvent) => void;
      }) => TarsController;
    };
  }
}

/** The mascot's author sized it for the corner at 132px; kept as designed. */
const MASCOT_SIZE = 132;

export function MascotLauncher({
  open,
  onToggle,
  openLabel,
  closeLabel,
}: {
  open: boolean;
  onToggle: () => void;
  openLabel: string;
  closeLabel: string;
}) {
  const slot = useRef<HTMLDivElement>(null);
  const bot = useRef<TarsController | null>(null);
  const [ready, setReady] = useState(false);

  // The library binds its click handler once, at mount; keep the latest toggle
  // reachable through a ref so that one binding never goes stale.
  const toggle = useRef(onToggle);
  useEffect(() => {
    toggle.current = onToggle;
  }, [onToggle]);

  useEffect(() => {
    const container = slot.current;
    if (!container) return;
    let cancelled = false;
    let mounted: TarsController | null = null;
    (async () => {
      // three.js is ~160KB gz; load it here, in the browser, only when TARS is
      // actually on screen.
      const [THREE] = await Promise.all([import("three"), import("@/lib/tars-mascot.js")]);
      // Strict-mode dev runs mount → cleanup → mount; the import can resolve
      // after the first cleanup, so never mount into a slot we have left.
      if (cancelled || !window.TarsMascot) return;
      mounted = window.TarsMascot.mount({
        THREE,
        container,
        size: MASCOT_SIZE,
        label: openLabel,
        greeting: openLabel,
        badge: false,
        onClick: () => toggle.current(),
      });
      if (cancelled) {
        mounted.destroy();
        mounted = null;
        return;
      }
      // The library's button unsets its own styles; `.chat-launcher` in
      // globals.css restores the site's focus ring.
      mounted.el.querySelector("button")?.classList.add("chat-launcher");
      bot.current = mounted;
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mounted?.destroy();
      bot.current = null;
      setReady(false);
    };
    // Mount once. The labels only change on a locale switch, which is a full
    // document navigation, and the toggle is read through a ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Same aria contract the bubble has, and no greeting bubble hovering over an
  // open panel.
  useEffect(() => {
    const el = bot.current?.el;
    if (!ready || !el) return;
    const btn = el.querySelector("button");
    btn?.setAttribute("aria-expanded", String(open));
    btn?.setAttribute("aria-label", open ? closeLabel : openLabel);
    const bubble = el.querySelector<HTMLElement>("[role=status]");
    if (bubble) bubble.style.display = open ? "none" : "";
  }, [open, ready, closeLabel, openLabel]);

  // The server renders the empty slot; the mascot fills it after hydration.
  return <div ref={slot} className="shrink-0" />;
}
