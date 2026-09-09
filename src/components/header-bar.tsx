"use client";

import { bookHref } from "@/components/button-link";
import { CatalogIcon } from "@/components/catalog-icon";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cx } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type MegaItem = {
  href: string;
  title: string;
  tagline: string;
  icon: string;
};

export type HeaderCopy = {
  services: string;
  industries: string;
  solutions: string;
  technologies: string;
  products: string;
  work: string;
  about: string;
  blog: string;
  contact: string;
  bookCall: string;
  openMenu: string;
  closeMenu: string;
  viewAll: string;
  localeLabel: string;
  localeSwitchTo: Record<Locale, string>;
  themeLabel: string;
};

const megaKeys = ["services", "industries", "solutions", "technologies"] as const;
type MegaKey = (typeof megaKeys)[number];
type OpenState = MegaKey | "mobile" | null;

type Props = {
  copy: HeaderCopy;
  mega: Record<MegaKey, MegaItem[]>;
};

const isMega = (state: OpenState): state is MegaKey =>
  state !== null && state !== "mobile";

/**
 * Nav link inside the pill. 14px/500 slate, ink on hover — the spec's nav
 * treatment scaled one step down because we carry seven destinations, not
 * four. Grows to 15px once the viewport has room (2xl).
 */
const pillLink =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[48px] px-2 py-2 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink xl:px-2.5 2xl:text-[15px]";

/**
 * Site header.
 *
 * Desktop (lg+) is a three-column grid — logo | pill | controls — so the pill
 * is centred in the 8rem bar regardless of how wide the logo or the CTA are,
 * and nothing can overlap. Which links live in the pill depends on the room:
 *   lg  : the four hubs + Products (no chevrons)
 *   xl  : + Work, About, chevrons, both locale segments
 * Below lg the pill collapses into the hamburger menu.
 */
export function HeaderBar({ copy, mega }: Props) {
  const [open, setOpen] = useState<OpenState>(null);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const mobileId = useId();
  const activeMega = isMega(open) ? open : null;
  const close = () => setOpen(null);

  // Escape closes whatever is open — mega panel or mobile sheet.
  const onHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") close();
  };

  // Tabbing out of the pill (and its panel) closes the panel.
  const onNavBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  };

  // ArrowDown on a hub trigger drops focus into its panel.
  const onTriggerKeyDown = (key: MegaKey) => (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(key);
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  };

  return (
    <header
      className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md"
      onKeyDown={onHeaderKeyDown}
    >
      <div className="page grid h-20 grid-cols-[1fr_auto] items-center gap-4 lg:h-32 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center justify-self-start rounded-md"
          onClick={close}
          data-brand-logo
        >
          <Logo priority />
        </Link>

        <nav
          className="relative hidden items-center justify-self-center rounded-[48px] bg-paper-elevated px-2 py-1.5 lg:flex"
          aria-label="Primary"
          onMouseLeave={close}
          onBlur={onNavBlur}
        >
          {megaKeys.map((key) => {
            const expanded = activeMega === key;
            return (
              <Link
                key={key}
                href={`/${key}` as never}
                className={cx(pillLink, expanded && "text-ink")}
                aria-expanded={expanded}
                aria-controls={expanded ? panelId : undefined}
                onMouseEnter={() => setOpen(key)}
                onFocus={() => setOpen(key)}
                onKeyDown={onTriggerKeyDown(key)}
                onClick={close}
              >
                {copy[key]}
                <ChevronDown
                  className={cx(
                    "hidden h-3 w-3 transition-transform duration-200 xl:block",
                    expanded && "rotate-180",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}

          {/* Panel sits in DOM order right after the hub triggers so Tab from
              the last trigger lands inside it. Anchored to the pill, not the
              trigger, so it never leaves the viewport. */}
          <AnimatePresence>
            {activeMega ? (
              <motion.div
                key="mega-panel"
                ref={panelRef}
                id={panelId}
                className={cx(
                  "absolute left-1/2 top-full z-20 -translate-x-1/2 pt-2",
                  mega[activeMega].length > 8
                    ? "w-[min(48rem,calc(100vw-3rem))]"
                    : "w-[min(36rem,calc(100vw-3rem))]",
                )}
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-flat p-3">
                  <div
                    className={cx(
                      "grid gap-1",
                      mega[activeMega].length > 8 ? "grid-cols-3" : "grid-cols-2",
                    )}
                  >
                    {mega[activeMega].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href as never}
                        className="flex gap-3 rounded-2xl p-2.5 transition-colors hover:bg-mist focus-visible:bg-mist"
                        onClick={close}
                      >
                        <CatalogIcon
                          name={item.icon}
                          className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                        />
                        <span className="min-w-0">
                          <span className="block text-body-sm font-medium text-ink">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-caption leading-snug text-smoke">
                            {item.tagline}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 px-2.5 pb-1">
                    <Link
                      href={`/${activeMega}` as never}
                      className="tag transition-colors hover:bg-accent-hover"
                      onClick={close}
                    >
                      {copy.viewAll} · {copy[activeMega]}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Link
            href="/products"
            className={pillLink}
            onMouseEnter={close}
            onFocus={close}
          >
            {copy.products}
          </Link>
          <Link
            href="/work"
            className={cx(pillLink, "hidden xl:inline-flex")}
            onMouseEnter={close}
            onFocus={close}
          >
            {copy.work}
          </Link>
          <Link
            href="/about"
            className={cx(pillLink, "hidden xl:inline-flex")}
            onMouseEnter={close}
            onFocus={close}
          >
            {copy.about}
          </Link>
        </nav>

        <div className="hidden items-center justify-self-end gap-2 lg:flex">
          <LocaleSwitcher label={copy.localeLabel} switchTo={copy.localeSwitchTo} />
          <ThemeToggle label={copy.themeLabel} />
          <BookLink className="btn-fill whitespace-nowrap px-4 py-2.5 text-body-sm font-medium transition-opacity hover:opacity-90 xl:px-5 xl:py-3 xl:text-[15px]">
            {copy.bookCall}
          </BookLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full bg-paper-elevated text-ink lg:hidden"
          aria-label={open === "mobile" ? copy.closeMenu : copy.openMenu}
          aria-expanded={open === "mobile"}
          aria-controls={mobileId}
          onClick={() =>
            setOpen((current) => (current === "mobile" ? null : "mobile"))
          }
        >
          {open === "mobile" ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {open === "mobile" ? (
        <div
          id={mobileId}
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto bg-paper-elevated lg:hidden"
        >
          <div className="page py-2">
            {megaKeys.map((key) => (
              <details key={key} className="group border-b border-line/40">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-body font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {copy[key]}
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="grid gap-0.5 pb-4">
                  {mega[key].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as never}
                      className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-body-sm text-ink-muted transition-colors hover:bg-mist hover:text-ink"
                      onClick={close}
                    >
                      <CatalogIcon name={item.icon} className="h-4 w-4 shrink-0 text-ink" />
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    href={`/${key}` as never}
                    className="tag mt-2 w-fit"
                    onClick={close}
                  >
                    {copy.viewAll} · {copy[key]}
                  </Link>
                </div>
              </details>
            ))}

            <nav className="grid py-2" aria-label="Secondary">
              {(
                [
                  ["/products", copy.products],
                  ["/work", copy.work],
                  ["/about", copy.about],
                  ["/blog", copy.blog],
                  ["/contact", copy.contact],
                ] as const
              ).map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl px-2 py-3 text-body font-medium text-ink transition-colors hover:bg-mist"
                  onClick={close}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 border-t border-line/40 py-4">
              <LocaleSwitcher
                label={copy.localeLabel}
                switchTo={copy.localeSwitchTo}
                variant="full"
              />
              <ThemeToggle label={copy.themeLabel} />
              <BookLink
                className="btn-fill ml-auto whitespace-nowrap px-4 py-2.5 text-body-sm font-medium"
                onClick={close}
              >
                {copy.bookCall}
              </BookLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** The primary CTA: Calendly when configured, otherwise the contact page. */
function BookLink({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const href = bookHref();
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href as never} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
