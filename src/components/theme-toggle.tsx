"use client";

import { cx } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function ThemeToggle({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cx(
        "elev-control inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-elevated text-ink transition-colors hover:bg-mist xl:h-10 xl:w-10",
        className,
      )}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
