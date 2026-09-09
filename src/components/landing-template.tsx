import { ButtonLink } from "@/components/button-link";
import { CatalogIcon } from "@/components/catalog-icon";
import { FadeIn } from "@/components/fade-in";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { processSteps } from "@/content/process";
import type { CatalogItem, HubKey, ProductItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  productSchema,
  serviceSchema,
} from "@/lib/schema";
import { getTranslations } from "next-intl/server";
import { EnquiryForm } from "@/components/enquiry-form";

export async function LandingTemplate({
  hub,
  item,
  locale,
  product = false,
}: {
  hub: HubKey | "products";
  item: CatalogItem | ProductItem;
  locale: Locale;
  product?: boolean;
}) {
  const t = await getTranslations("Landing");
  const nav = await getTranslations("Nav");
  const p = await getTranslations("Products");
  const c = await getTranslations("Contact");
  const form = await getTranslations("Form");
  const path = `/${hub}/${item.slug}`;
  const url = localizedUrl(path, locale);
  const title = item.title[locale];
  // Localised hub name ("Industries" / "Secteurs") for the tag, breadcrumb and back link.
  const hubLabel = hub === "products" ? p("title") : nav(hub);

  const schemas = [
    breadcrumbSchema([
      { name: siteConfig.name, url: localizedUrl("/", locale) },
      { name: hubLabel, url: localizedUrl(`/${hub}`, locale) },
      { name: title, url },
    ]),
    product
      ? productSchema({ name: title, description: item.description[locale], url })
      : serviceSchema({ name: title, description: item.description[locale], url }),
    faqSchema(item.faqs[locale]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <article className="page py-20">
        <FadeIn>
          <p className="tag">
            <CatalogIcon name={item.icon} className="h-3.5 w-3.5" />
            {hubLabel}
            {"status" in item ? ` · ${item.status[locale]}` : null}
          </p>
          <h1 className="display mt-5 max-w-5xl text-[clamp(3rem,7vw,6.5rem)]">{title}</h1>
          <p className="mt-6 max-w-2xl text-body leading-[1.4] text-ink-muted">
            {item.description[locale]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">{t("ctaTitle")}</ButtonLink>
            <ButtonLink href={`/${hub}`} variant="secondary">
              ← {hubLabel}
            </ButtonLink>
          </div>
        </FadeIn>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <FadeIn>
            <h2 className="heading text-heading-sm">{t("problem")}</h2>
            <p className="mt-4 text-body leading-[1.4] text-ink-muted">{item.problem[locale]}</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="heading text-heading-sm">{t("whoFor")}</h2>
            <ul className="mt-4 space-y-2 text-body leading-[1.4] text-ink-muted">
              {item.whoFor[locale].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="text-ink" aria-hidden>
                    ▸
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn className="mt-20">
          <h2 className="heading text-heading-sm">{t("whatWeBuild")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.whatWeBuild[locale].map((line) => (
              <li key={line} className="card-flat text-body-sm">
                {line}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-20">
          <h2 className="heading text-heading-sm">{t("stack")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-20">
          <h2 className="heading text-heading-sm">{t("process")}</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <li key={step.n} className="card-flat">
                <p className="font-mono text-caption text-smoke">{step.n}</p>
                <p className="heading mt-2 text-subheading">{step.title[locale]}</p>
                <p className="mt-2 text-body-sm leading-relaxed text-ink-muted">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>
        </FadeIn>

        <FadeIn className="mt-20">
          <h2 className="heading text-heading-sm">{t("faq")}</h2>
          <div className="mt-6 divide-y divide-line/40">
            {item.faqs[locale].map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-[4px] text-body font-medium [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span
                    className="mt-0.5 shrink-0 font-mono text-smoke transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-body-sm leading-relaxed text-ink-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="card-flat mt-20 grid gap-8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="heading text-heading-sm md:text-heading">{t("ctaTitle")}</h2>
            <p className="mt-4 text-body leading-[1.4] text-ink-muted">{t("ctaLead")}</p>
            {"priceHint" in item ? (
              <p className="mt-6 font-mono text-caption text-smoke">
                {p("status")}: {item.status[locale]} · {item.priceHint[locale]}
              </p>
            ) : null}
          </div>
          <EnquiryForm
            locale={locale}
            source={path}
            defaultInterest={product ? "product" : "service"}
            copy={{
              name: c("name"),
              email: c("email"),
              company: c("company"),
              interest: c("interest"),
              interestPlaceholder: c("interestPlaceholder"),
              interestService: c("interestService"),
              interestProduct: c("interestProduct"),
              interestOther: c("interestOther"),
              message: c("message"),
              submit: product ? p("enquire") : c("submit"),
              sending: c("sending"),
              success: c("success"),
              error: c("error"),
              required: form("required"),
            }}
          />
        </FadeIn>
      </article>
    </>
  );
}
