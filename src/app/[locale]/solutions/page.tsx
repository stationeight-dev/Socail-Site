import { HubPage } from "@/components/hub-page";
import { solutions } from "@/content/solutions";
import type { Locale } from "@/i18n/routing";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Hub" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/solutions",
    title: t("solutionsTitle"),
    description: t("solutionsLead"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HubPage hub="solutions" items={solutions} locale={locale as Locale} />;
}
