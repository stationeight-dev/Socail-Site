import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { cx } from "@/lib/utils";

/**
 * DESIGN.md button set.
 *  - primary   Filled dark: black / white, 8px radius, 16px 24px padding.
 *  - secondary Ghost border: 1.5px slate border, slate text, 4px radius.
 *  - ghost     Text link: no chrome, underline on hover.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const styles = {
    primary: "btn-fill px-6 py-4 transition-opacity hover:opacity-90",
    secondary:
      "rounded-[4px] border-[1.5px] border-ink-muted px-6 py-[14.5px] text-ink-muted transition-colors hover:border-ink hover:text-ink",
    ghost:
      "rounded-[4px] px-1 py-2 text-ink underline-offset-4 transition-colors hover:underline",
  }[variant];

  const classNames = cx(
    "inline-flex items-center justify-center whitespace-nowrap text-body font-medium",
    styles,
    className,
  );

  if (external) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href as never} className={classNames}>
      {children}
    </Link>
  );
}

export function bookHref() {
  return siteConfig.calendlyUrl || "/contact";
}
