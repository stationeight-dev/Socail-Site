import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/config/site";
import { getWork, work } from "@/content";
import type { Locale } from "@/i18n/routing";
import { localizedUrl, buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  const loc = locale as Locale;
  return buildMetadata({
    locale: loc,
    path: `/work/${slug}`,
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
  const loc = locale as Locale;
  const item = getWork(slug);
  if (!item) notFound();
  const t = await getTranslations("Work");
  const url = localizedUrl(`/work/${slug}`, loc);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: siteConfig.name, url: localizedUrl("/", loc) },
          { name: t("title"), url: localizedUrl("/work", loc) },
          { name: item.title[loc], url },
        ])}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-20">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-2">
            <p className="tag">{item.sector[loc]}</p>
            {item.isTeamExperience ? (
              <p className="tag bg-transparent text-smoke ring-1 ring-inset ring-line/60">
                {t("teamExperienceBadge")}
              </p>
            ) : null}
          </div>
          <h1 className="display mt-4 text-[clamp(3rem,6vw,5rem)]">{item.title[loc]}</h1>
          <p className="mt-6 text-body leading-[1.4] text-ink-muted">{item.summary[loc]}</p>
          {item.isTeamExperience ? (
            <p className="mt-3 text-body-sm leading-relaxed text-smoke">{t("teamExperienceIntro")}</p>
          ) : null}
          <dl className="mt-6 grid gap-4 text-body-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-caption uppercase text-smoke">{t("client")}</dt>
              <dd className="mt-1">{item.client[loc]}</dd>
            </div>
            {item.role ? (
              <div>
                <dt className="font-mono text-caption uppercase text-smoke">{t("role")}</dt>
                <dd className="mt-1">{item.role[loc]}</dd>
              </div>
            ) : null}
          </dl>
        </FadeIn>
        <FadeIn className="mt-12">
          <h2 className="heading text-heading-sm">{t("challenge")}</h2>
          <p className="mt-4 text-body leading-[1.4] text-ink-muted">{item.challenge[loc]}</p>
        </FadeIn>
        <FadeIn className="mt-12">
          <h2 className="heading text-heading-sm">{t("outcome")}</h2>
          <p className="mt-4 text-body leading-[1.4] text-ink-muted">{item.outcome[loc]}</p>
        </FadeIn>
        <ul className="mt-8 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <ButtonLink href="/contact">{t("cta")}</ButtonLink>
        </div>
      </article>
    </>
  );
}
