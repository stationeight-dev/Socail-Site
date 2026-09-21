"use client";

import { getPathname, usePathname } from "@/i18n/navigation";
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
  const pathname = usePathname();
  const current = useLocale() as Locale;

  /**
   * A locale change is a document-level change — `lang`, messages, metadata and
   * the theme's pre-paint script all belong to the new document — so it is done
   * as a real navigation rather than a client-side one.
   *
   * Client-side it remounted the `[locale]` layout, and remounting that subtree
   * made next-themes re-render its inline `<script>` on the client. React 19
   * rejects that outright: it cannot execute a script rendered client-side, so
   * it logged "Encountered a script tag while rendering React component". The
   * script only ever mattered for a fresh document anyway.
   *
   * `getPathname` is what keeps this honest — it applies the routing's
   * `localePrefix: "as-needed"` rule, so the default locale stays unprefixed
   * instead of us hand-building `/en/...`.
   */
  const goToLocale = (locale: Locale) => {
    // The middleware runs with `localeDetection`, and its `NEXT_LOCALE` cookie
    // outranks the URL. next-intl's own router sets that cookie for us; a plain
    // navigation does not, so without this line switching *to* the default
    // locale bounces straight back — `/` would redirect to `/fr` again.
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
    const target = getPathname({ href: pathname, locale });
    const { search, hash } = window.location;
    window.location.assign(`${target}${search}${hash}`);
  };

  return (
    <div
      className={cx(
        // Same height and elevation as the theme toggle beside it, so the three
        // header controls sit on one line as a set.
        "elev-control inline-flex h-9 items-center rounded-full bg-paper-elevated p-1 font-mono text-caption xl:h-10",
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
              if (!active) goToLocale(locale);
            }}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : switchTo[locale]}
            title={active ? undefined : switchTo[locale]}
            className={cx(
              // Fully round, to sit inside the round container rather than
              // fighting it with the 8px radius `.btn-fill` carries.
              "h-full items-center justify-center rounded-full px-2.5 font-medium uppercase tracking-wider transition-colors",
              active
                ? cx(
                    "bg-ink text-paper-elevated",
                    variant === "auto" ? "hidden xl:inline-flex" : "inline-flex",
                  )
                : cx(
                    "inline-flex hover:bg-mist hover:text-ink",
                    // Below `xl` in `auto` this is the only segment on screen,
                    // so it carries full ink; next to the active pill it steps
                    // back to muted.
                    variant === "auto"
                      ? "text-ink xl:text-ink-muted"
                      : "text-ink-muted",
                  ),
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
}
