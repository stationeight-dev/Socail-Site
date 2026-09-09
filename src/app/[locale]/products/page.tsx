import { CatalogIcon } from "@/components/catalog-icon";
import { FadeIn } from "@/components/fade-in";
import { products } from "@/content/products";
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
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Products" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/products",
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
  const t = await getTranslations("Products");

  return (
    <section className="page py-20">
      <FadeIn>
        <h1 className="display text-[clamp(3rem,8vw,8.125rem)]">{t("title")}</h1>
        <p className="mt-6 max-w-2xl text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
      </FadeIn>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {products.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="card-flat flex flex-col transition-colors hover:bg-mist"
          >
            <CatalogIcon name={item.icon} className="h-5 w-5 text-ink" />
            <p className="tag mt-4 w-fit">{item.status[loc]}</p>
            <h2 className="heading mt-4 text-subheading-lg">{item.title[loc]}</h2>
            <p className="mt-2 flex-1 text-body-sm leading-relaxed text-ink-muted">
              {item.tagline[loc]}
            </p>
            <p className="mt-4 text-body-sm font-medium">{t("enquire")} →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
