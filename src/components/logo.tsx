import Image from "next/image";
import { cx } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import wordmark from "../../public/brand/wordmark.png";
import wordmarkDark from "../../public/brand/wordmark-dark.png";
import wordmarkBraces from "../../public/brand/wordmark-braces.png";
import wordmarkBracesDark from "../../public/brand/wordmark-braces-dark.png";

const variants = {
  /** Wordmark wrapped in blue `{ }` braces. Default; used in the header. */
  braces: {
    light: wordmarkBraces,
    dark: wordmarkBracesDark,
    size: "h-8",
    // Rendered width at h-8 (32px) given the 1167×155 source; keeps srcset small.
    sizes: "241px",
  },
  /** Plain wide wordmark without braces. Used in the footer. */
  wordmark: {
    light: wordmark,
    dark: wordmarkDark,
    size: "h-3.5",
    // Rendered width at h-3.5 (14px) given the 919×63 source.
    sizes: "204px",
  },
} as const;

export type LogoVariant = keyof typeof variants;

export function Logo({
  className,
  variant = "braces",
  priority = false,
}: {
  className?: string;
  variant?: LogoVariant;
  /** Set for above-the-fold placements (e.g. the sticky header). */
  priority?: boolean;
}) {
  const { light, dark, size, sizes } = variants[variant];
  const img = cx("w-auto select-none", size);

  return (
    <span className={cx("inline-flex items-center", className)}>
      <Image
        src={light}
        alt={siteConfig.name}
        sizes={sizes}
        className={cx(img, "dark:hidden")}
        priority={priority}
      />
      <Image
        src={dark}
        alt={siteConfig.name}
        sizes={sizes}
        className={cx(img, "hidden dark:block")}
        priority={priority}
      />
    </span>
  );
}
