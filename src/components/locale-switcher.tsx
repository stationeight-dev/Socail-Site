"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cx } from "@/lib/utils";
import { useLocale } from "next-intl";

export function LocaleSwitcher({
  label,
  switchTo,
  variant = "auto",
  className,
}: {
  label: string;
  /** Accessible name for the control that switches to each locale. */
  switchTo: Record<Locale, string>;
  /**
   * `auto` collapses to a single "other language" button below the `xl`
   * breakpoint so the header controls fit next to the nav pill; `full`
   * always shows both segments (mobile menu, footer).
   */
  variant?: "auto" | "full";
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;

  return (
    <div
      className={cx(
        "inline-flex rounded-[48px] bg-paper-elevated p-0.5 font-mono text-caption",
        className,
      )}
      role="group"
      aria-label={label}
    >
      {routing.locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => {
              if (!active) router.replace(pathname, { locale });
            }}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : switchTo[locale]}
            title={active ? undefined : switchTo[locale]}
            className={cx(
              "items-center justify-center rounded-[48px] px-2.5 py-1.5 uppercase tracking-wider transition-colors",
              active
                ? cx("btn-fill", variant === "auto" ? "hidden xl:inline-flex" : "inline-flex")
                : "inline-flex text-ink-muted hover:text-ink",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
