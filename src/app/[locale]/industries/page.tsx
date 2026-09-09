import { HubPage } from "@/components/hub-page";
import { industries } from "@/content/industries";
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
    path: "/industries",
    title: t("industriesTitle"),
    description: t("industriesLead"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HubPage hub="industries" items={industries} locale={locale as Locale} />;
}
