import { ButtonLink } from "@/components/button-link";
import { CatalogIcon } from "@/components/catalog-icon";
import { FadeIn } from "@/components/fade-in";
import { HeroFigure } from "@/components/hero-figure";
import { JsonLd } from "@/components/json-ld";
import { LogoIntro } from "@/components/logo-intro";
import { products, services, solutions, work } from "@/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";

export async function HomePage({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");
  const stats = await getTranslations("Stats");
  const featuredServices = services.slice(0, 6);
  const featuredSolutions = solutions.slice(0, 4);
  const marquee = `${t("marquee")} `;
  const figures = [
    ["8", t("figBits")],
    ["2", t("figLocales")],
    ["6", t("figSteps")],
    ["∞", t("figScope")],
  ] as const;

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
      <LogoIntro />

      {/* Hero — split: compressed uppercase headline left, product object right. */}
      <section className="page grid items-center gap-10 py-16 md:grid-cols-2 md:py-10 lg:min-h-[calc(100vh-8rem)]">
        <FadeIn>
          <p className="tag">{t("eyebrow")}</p>
          <h1 className="display mt-6 text-[clamp(3rem,8.5vw,8.125rem)] text-ink">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">{t("ctaPrimary")}</ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              {t("ctaSecondary")}
            </ButtonLink>
          </div>
          <p className="mt-8 font-mono text-caption text-smoke">{t("bitsLabel")}</p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <HeroFigure />
        </FadeIn>
      </section>

      {/* Mono meta strip. */}
      <section className="page grid gap-3 py-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
        {[stats("stations"), stats("locales"), stats("model"), stats("theatre")].map(
          (label) => (
            <p key={label} className="font-mono text-caption uppercase text-smoke">
              {label}
            </p>
          ),
        )}
      </section>

      {/* Services — white cards on canvas. */}
      <section className="page py-20">
        <FadeIn>
          <p className="tag">{t("whatWeDo")}</p>
          <h2 className="heading mt-5 max-w-3xl text-heading-sm md:text-heading">
            {t("whatWeDoLead")}
          </h2>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.04}>
              <Link
                href={`/services/${item.slug}`}
                className="card-flat flex h-full flex-col transition-colors hover:bg-mist"
              >
                <CatalogIcon name={item.icon} className="h-5 w-5 text-ink" />
                <h3 className="heading mt-5 text-subheading-lg">{item.title[locale]}</h3>
                <p className="mt-2 text-body-sm leading-relaxed text-ink-muted">
                  {item.tagline[locale]}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" variant="ghost">
            {t("exploreServices")} →
          </ButtonLink>
        </div>
      </section>

      {/* Inverted block — full-width carbon with an 80px display headline. */}
      <section className="overflow-hidden bg-black text-white">
        <div className="border-b border-white/10 py-4" aria-hidden>
          <div className="marquee-track display text-heading-lg text-white md:text-display">
            <span className="px-6">{marquee.repeat(8)}</span>
            <span className="px-6">{marquee.repeat(8)}</span>
          </div>
        </div>
        <div className="page py-20">
          <FadeIn>
            <h2 className="display max-w-4xl text-heading-lg text-white md:text-display">
              {t("solutionsTitle")}
            </h2>
            <p className="mt-6 max-w-2xl text-body leading-[1.4] text-smoke">
              {t("solutionsLead")}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSolutions.map((item) => (
              <Link
                key={item.slug}
                href={`/solutions/${item.slug}`}
                className="rounded-[32px] bg-white/5 p-6 transition-colors hover:bg-white/10 focus-visible:outline-white"
              >
                <CatalogIcon name={item.icon} className="h-5 w-5 text-accent" />
                <p className="heading mt-4 text-subheading text-white">{item.title[locale]}</p>
                <p className="mt-2 text-body-sm text-smoke">{item.tagline[locale]}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/solutions"
              className="inline-flex items-center rounded-[4px] py-2 text-body font-medium underline-offset-4 hover:underline focus-visible:outline-white"
            >
              {t("exploreSolutions")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Work. */}
      <section className="page py-20">
        <FadeIn>
          <h2 className="heading text-heading-sm md:text-heading">{t("workTitle")}</h2>
          <p className="mt-4 max-w-2xl text-body leading-[1.4] text-ink-muted">
            {t("workLead")}
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {work.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="card-flat transition-colors hover:bg-mist"
            >
              <p className="tag">{item.sector[locale]}</p>
              <h3 className="heading mt-4 text-heading-sm">{item.title[locale]}</h3>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-muted">
                {item.summary[locale]}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/work" variant="secondary">
            {t("viewWork")}
          </ButtonLink>
        </div>
      </section>

      {/* Products. */}
      <section className="page py-20">
        <FadeIn>
          <h2 className="heading text-heading-sm md:text-heading">{t("productsTitle")}</h2>
          <p className="mt-4 max-w-2xl text-body leading-[1.4] text-ink-muted">
            {t("productsLead")}
          </p>
        </FadeIn>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {products.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="card-flat transition-colors hover:bg-mist"
            >
              <p className="tag">{item.status[locale]}</p>
              <h3 className="heading mt-4 text-subheading-lg">{item.title[locale]}</h3>
              <p className="mt-2 text-body-sm leading-relaxed text-ink-muted">
                {item.tagline[locale]}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/products" variant="ghost">
            {t("viewProducts")} →
          </ButtonLink>
        </div>
      </section>

      {/* About + figures card. */}
      <section className="page grid gap-10 py-20 md:grid-cols-2">
        <FadeIn>
          <h2 className="heading text-heading-sm md:text-heading">{t("aboutTitle")}</h2>
          <p className="mt-4 text-body leading-[1.4] text-ink-muted">{t("aboutLead")}</p>
          <ButtonLink href="/about" className="mt-6" variant="secondary">
            {t("ourStory")}
          </ButtonLink>
        </FadeIn>
        <FadeIn delay={0.08} className="card-flat">
          <dl className="grid grid-cols-2 gap-6">
            {figures.map(([n, label]) => (
              <div key={label} className="flex flex-col-reverse">
                <dt className="mt-2 font-mono text-caption uppercase text-smoke">{label}</dt>
                <dd className="display text-heading-lg">{n}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </section>

      {/* Top-arc CTA card — 64px top radius, flat bottom. */}
      <section className="rounded-t-[64px] bg-paper-elevated">
        <div className="page py-20">
          <FadeIn>
            <h2 className="display max-w-4xl text-heading-lg md:text-display">{t("ctaTitle")}</h2>
            <p className="mt-6 max-w-xl text-body leading-[1.4] text-ink-muted">{t("ctaLead")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">{t("ctaPrimary")}</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                {t("ctaMessage")}
              </ButtonLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
