import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { asLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: asLocale(locale), namespace: "About" });
  return buildMetadata({
    locale: asLocale(locale),
    path: "/about",
    title: t("title"),
    description: t("p1"),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(asLocale(locale));
  const t = await getTranslations("About");
  const nav = await getTranslations("Nav");
  const values = [
    [t("v1t"), t("v1")],
    [t("v2t"), t("v2")],
    [t("v3t"), t("v3")],
    [t("v4t"), t("v4")],
  ];

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="tag">{t("eyebrow")}</p>
        <h1 className="display mt-5 text-[clamp(3rem,6vw,5rem)]">{t("title")}</h1>
        <div className="mt-8 space-y-5 text-subheading leading-[1.4] text-ink-muted">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </FadeIn>
      <FadeIn className="mt-14">
        <h2 className="heading text-heading-sm">{t("valuesTitle")}</h2>
        <dl className="mt-6 grid gap-4">
          {values.map(([title, body]) => (
            <div key={title} className="card-flat">
              <dt className="heading text-subheading text-ink">{title}</dt>
              <dd className="mt-2 text-body-sm leading-relaxed text-ink-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </FadeIn>
      <div className="mt-12">
        <ButtonLink href="/contact">{nav("bookCall")}</ButtonLink>
      </div>
    </article>
  );
}
