import { HubPage } from "@/components/hub-page";
import { technologies } from "@/content/technologies";
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
    path: "/technologies",
    title: t("technologiesTitle"),
    description: t("technologiesLead"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HubPage hub="technologies" items={technologies} locale={locale as Locale} />;
}
