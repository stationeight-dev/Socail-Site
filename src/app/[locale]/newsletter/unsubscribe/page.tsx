import { NewsletterGate } from "@/components/newsletter-gate";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Newsletter" });
  return buildMetadata({
    locale: asLocale(locale),
    path: "/newsletter/unsubscribe",
    title: t("unsubscribeTitle"),
    description: t("unsubscribeLead"),
    noIndex: true,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await params;
  const { token = "" } = await searchParams;
  return <NewsletterGate locale={locale} token={token} action="unsubscribe" />;
}
