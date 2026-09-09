import { HomePage } from "@/components/home-page";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";
import { asLocale } from "@/lib/locale";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomePage locale={locale as Locale} />;
}
