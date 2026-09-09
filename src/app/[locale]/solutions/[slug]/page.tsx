import { LandingTemplate } from "@/components/landing-template";
import { getHubItem, solutions } from "@/content";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return solutions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getHubItem("solutions", slug);
  if (!item) return {};
  const loc = locale as Locale;
  return buildMetadata({
    locale: loc,
    path: `/solutions/${slug}`,
    title: item.seoTitle[loc],
    description: item.seoDescription[loc],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getHubItem("solutions", slug);
  if (!item) notFound();
  return <LandingTemplate hub="solutions" item={item} locale={locale as Locale} />;
}
