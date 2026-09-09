import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/utils";

export function localizedPath(href: string, locale: Locale) {
  return getPathname({ locale, href: href as never });
}

export function localizedUrl(href: string, locale: Locale) {
  const path = localizedPath(href, locale);
  return absoluteUrl(path);
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  noIndex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = localizedUrl(path, locale);
  const languages: Record<string, string> = {
    "x-default": localizedUrl(path, routing.defaultLocale),
  };
  for (const item of routing.locales) {
    languages[item] = localizedUrl(path, item);
  }

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
