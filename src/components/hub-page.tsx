import { CatalogIcon } from "@/components/catalog-icon";
import { FadeIn } from "@/components/fade-in";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/button-link";
import type { CatalogItem, HubKey } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { breadcrumbSchema } from "@/lib/schema";
import { localizedUrl } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HubPage({
  hub,
  items,
  locale,
}: {
  hub: HubKey;
  items: CatalogItem[];
  locale: Locale;
}) {
  const t = await getTranslations("Hub");
  const title = t(`${hub}Title`);
  const lead = t(`${hub}Lead`);
  const path = `/${hub}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: siteConfig.name, url: localizedUrl("/", locale) },
          { name: title, url: localizedUrl(path, locale) },
        ])}
      />
      <section className="page py-20">
        <FadeIn>
          <p className="tag">{siteConfig.name}</p>
          <h1 className="display mt-5 max-w-4xl text-[clamp(3rem,8vw,8.125rem)] text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-body leading-[1.4] text-ink-muted">{lead}</p>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.04}>
              <Link
                href={`${path}/${item.slug}` as never}
                className="card-flat flex h-full flex-col transition-colors hover:bg-mist"
              >
                <CatalogIcon name={item.icon} className="h-5 w-5 text-ink" />
                <h2 className="heading mt-5 text-subheading-lg text-ink">{item.title[locale]}</h2>
                <p className="mt-2 flex-1 text-body-sm leading-relaxed text-ink-muted">
                  {item.tagline[locale]}
                </p>
                <span className="mt-4 text-body-sm font-medium" aria-hidden>
                  →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-12">
          <ButtonLink href="/contact" variant="secondary">
            {t("cta")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
