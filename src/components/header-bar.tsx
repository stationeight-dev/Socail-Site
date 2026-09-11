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
import { AnimatePresence, motion } from "motion/react";
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
  products: string;
  company: string;
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

const hubKeys = ["services", "industries", "solutions"] as const;
type HubKey = (typeof hubKeys)[number];
type MenuKey = HubKey | "company";
type OpenState = MenuKey | "mobile" | null;

type Props = {
  copy: HeaderCopy;
  /** Catalogue hubs — each opens a panel and also has a landing page. */
  mega: Record<HubKey, MegaItem[]>;
  /** Work / About / Blog / Contact, grouped so the pill stays short. */
  company: MegaItem[];
};

const isMenu = (state: OpenState): state is MenuKey =>
  state !== null && state !== "mobile";

/**
 * Pill link: 13px at `lg` where the pill shares the bar with a compact
 * locale toggle, 14px from `xl`. Slate at rest, ink on hover / open.
 * Display is left out so `hidden xl:inline-flex` variants can win.
 */
const pillLink =
  "items-center gap-1 whitespace-nowrap rounded-[48px] px-2 py-2 text-[13px] font-medium leading-[1.3] tracking-[-0.011em] text-ink-muted transition-colors hover:text-ink xl:text-body-sm";

/**
 * Site header.
 *
 * Desktop (lg+) is a three-column grid — logo | pill | controls — so the pill
 * is centred in the 8rem bar regardless of how wide the logo or the CTA are,
 * and nothing can overlap. The pill carries six destinations: the four hubs,
 * Products, and a Company group (Work, About, Blog, Contact). Below `lg`
 * everything collapses into the hamburger sheet.
 */
export function HeaderBar({ copy, mega, company }: Props) {
  const [open, setOpen] = useState<OpenState>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const mobileId = useId();
  const active = isMenu(open) ? open : null;
  const close = () => setOpen(null);

  const menus: Record<MenuKey, { label: string; items: MegaItem[]; href?: string }> = {
    services: { label: copy.services, items: mega.services, href: "/services" },
    industries: { label: copy.industries, items: mega.industries, href: "/industries" },
    solutions: { label: copy.solutions, items: mega.solutions, href: "/solutions" },
    company: { label: copy.company, items: company },
  };
  const panel = active ? menus[active] : null;
  const wide = (panel?.items.length ?? 0) > 8;

  // Escape closes whatever is open — panel or mobile sheet.
  const onHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") close();
  };

  // Tabbing out of the pill (and its panel) closes the panel.
  const onNavBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  };

  // ArrowDown on a trigger drops focus into its panel.
  const onTriggerKeyDown = (key: MenuKey) => (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(key);
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });
  };

  const triggerProps = (key: MenuKey) => ({
    className: cx("inline-flex", pillLink, active === key && "text-ink"),
    "aria-expanded": active === key,
    "aria-controls": active === key ? panelId : undefined,
    onMouseEnter: () => setOpen(key),
    onFocus: () => setOpen(key),
    onKeyDown: onTriggerKeyDown(key),
  });

  const chevron = (key: MenuKey) => (
    <ChevronDown
      className={cx(
        "hidden h-3 w-3 transition-transform duration-200 xl:block",
        active === key && "rotate-180",
      )}
      aria-hidden
    />
  );

  return (
    <header
        className="sticky top-0 z-50 bg-paper/85 pt-[env(safe-area-inset-top)] backdrop-blur-md"
      onKeyDown={onHeaderKeyDown}
    >
      <div className="page grid h-20 grid-cols-[1fr_auto] items-center gap-4 lg:h-32 lg:grid-cols-[1fr_auto_1fr] lg:gap-5">
        {/* `[&_img]:shrink-0` guarantees the wordmark is never squeezed by the
            grid — if space ever runs out it overflows rather than distorts. */}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center justify-self-start rounded-md [&_img]:shrink-0"
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
          {hubKeys.map((key) => (
            <Link key={key} href={`/${key}` as never} {...triggerProps(key)} onClick={close}>
              {copy[key]}
              {chevron(key)}
            </Link>
          ))}

          <Link
            href="/products"
            className={cx("inline-flex", pillLink)}
            onMouseEnter={close}
            onFocus={close}
          >
            {copy.products}
          </Link>

          {/* Company has no landing page of its own, so the trigger is a button. */}
          <button
            type="button"
            {...triggerProps("company")}
            onClick={() => setOpen((current) => (current === "company" ? null : "company"))}
          >
            {copy.company}
            {chevron("company")}
          </button>

          {/* Anchored to the pill (not the trigger) so it never leaves the
              viewport. Kept mounted while switching between menus so the
              content swaps without re-animating. */}
          <AnimatePresence>
            {panel ? (
              <motion.div
                key="mega-panel"
                ref={panelRef}
                id={panelId}
                className={cx(
                  "absolute left-1/2 top-full z-20 -translate-x-1/2 pt-2",
                  wide ? "w-[min(48rem,calc(100vw-3rem))]" : "w-[min(36rem,calc(100vw-3rem))]",
                )}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="card-flat p-3">
                  <div className={cx("grid gap-1", wide ? "grid-cols-3" : "grid-cols-2")}>
                    {panel.items.map((item) => (
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
                  {panel.href ? (
                    <div className="mt-2 px-2.5 pb-1">
                      <Link
                        href={panel.href as never}
                        className="tag transition-colors hover:bg-accent-hover"
                        onClick={close}
                      >
                        {copy.viewAll} · {panel.label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>

        <div className="hidden items-center justify-self-end gap-2 lg:flex">
          <LocaleSwitcher label={copy.localeLabel} switchTo={copy.localeSwitchTo} />
          <ThemeToggle label={copy.themeLabel} />
          <BookLink className="btn-fill whitespace-nowrap px-4 py-2.5 text-body-sm font-medium transition-opacity hover:opacity-90 xl:py-3 xl:text-[15px]">
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
            {hubKeys.map((key) => (
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
              <Link
                href="/products"
                className="rounded-xl px-2 py-3 text-body font-medium text-ink transition-colors hover:bg-mist"
                onClick={close}
              >
                {copy.products}
              </Link>
              {company.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as never}
                  className="rounded-xl px-2 py-3 text-body font-medium text-ink transition-colors hover:bg-mist"
                  onClick={close}
                >
                  {item.title}
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
