import { EnquiryForm } from "@/components/enquiry-form";
import { FadeIn } from "@/components/fade-in";
import { siteConfig } from "@/config/site";
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
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Contact" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Contact");
  const form = await getTranslations("Form");

  return (
    <section className="page grid gap-12 py-20 md:grid-cols-2">
      <FadeIn>
        <h1 className="display text-[clamp(3rem,6vw,5rem)]">{t("title")}</h1>
        <p className="mt-6 max-w-xl text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
        <p className="mt-10 font-mono text-caption uppercase text-smoke">{t("direct")}</p>
        <a
          className="mt-2 inline-block bg-voltage px-2 py-0.5 font-mono text-caption text-black"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>
        {siteConfig.phone ? (
          <a className="mt-3 block text-body-sm" href={`tel:${siteConfig.phone}`}>
            {siteConfig.phone}
          </a>
        ) : null}
      </FadeIn>
      {/* Same white card as the landing-page CTA, so the flat fields sit on
          `paper-elevated` in both themes rather than directly on the canvas. */}
      <FadeIn delay={0.06} className="card-flat flex h-full flex-col md:p-8">
        <EnquiryForm
          locale={locale}
          source="/contact"
          copy={{
            name: t("name"),
            email: t("email"),
            company: t("company"),
            interest: t("interest"),
            interestPlaceholder: t("interestPlaceholder"),
            interestService: t("interestService"),
            interestProduct: t("interestProduct"),
            interestOther: t("interestOther"),
            message: t("message"),
            submit: t("submit"),
            sending: t("sending"),
            success: t("success"),
            error: t("error"),
            required: form("required"),
          }}
        />
      </FadeIn>
    </section>
  );
}
