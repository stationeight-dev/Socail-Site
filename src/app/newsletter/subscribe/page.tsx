import { NewsletterGate } from "@/components/newsletter-gate";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = await getTranslations({ locale: "en", namespace: "Newsletter" });
  return buildMetadata({
    locale: "en",
    path: "/newsletter/subscribe",
    title: t("subscribeTitle"),
    description: t("subscribeLead"),
    noIndex: true,
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <NewsletterGate locale="en" token={token} action="subscribe" />;
}
