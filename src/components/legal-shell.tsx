import { FadeIn } from "@/components/fade-in";
import type { Locale } from "@/i18n/routing";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <h1 className="display text-[clamp(3rem,6vw,5rem)]">{title}</h1>
        <div className="mt-8 space-y-4 text-body-sm leading-relaxed text-ink-muted">
          {children}
        </div>
      </FadeIn>
    </article>
  );
}

export async function legalMeta(
  locale: string,
  path: string,
  titleKey: "privacyTitle" | "termsTitle" | "cookiesTitle",
) {
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Legal" });
  return buildMetadata({
    locale: locale as Locale,
    path,
    title: t(titleKey),
    description: t("updated"),
  });
}
