import { FadeIn } from "@/components/fade-in";
import { work } from "@/content/work";
import { Link } from "@/i18n/navigation";
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
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Work" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/work",
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
  const loc = locale as Locale;
  const t = await getTranslations("Work");

  return (
    <section className="page py-20">
      <FadeIn>
        <h1 className="display text-[clamp(3rem,8vw,8.125rem)]">{t("title")}</h1>
        <p className="mt-6 max-w-2xl text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
        <p className="mt-4 max-w-2xl text-body-sm leading-relaxed text-smoke">{t("teamExperienceIntro")}</p>
      </FadeIn>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="card-flat transition-colors hover:bg-mist"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="tag">{item.sector[loc]}</p>
              {item.isTeamExperience ? (
                <p className="tag bg-transparent text-smoke ring-1 ring-inset ring-line/60">
                  {t("teamExperienceBadge")}
                </p>
              ) : null}
              {item.status ? <p className="tag bg-accent text-ink">{item.status[loc]}</p> : null}
            </div>
            <h2 className="heading mt-4 text-heading-sm">{item.title[loc]}</h2>
            <p className="mt-3 text-body-sm leading-relaxed text-ink-muted">{item.summary[loc]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
