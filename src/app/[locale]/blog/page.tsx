import { FadeIn } from "@/components/fade-in";
import { posts } from "@/content/blog";
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
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Blog" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/blog",
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
  const t = await getTranslations("Blog");
  const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <h1 className="display text-[clamp(3rem,6vw,5rem)]">{t("title")}</h1>
        <p className="mt-6 text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
      </FadeIn>
      <ul className="mt-12 divide-y divide-line/40">
        {sortedPosts.map((post) => (
          <li key={post.slug} className="py-6 first:pt-0">
            <p className="font-mono text-caption text-smoke">{post.date}</p>
            <h2 className="heading mt-2 text-heading-sm">
              <Link href={`/blog/${post.slug}`} className="underline-offset-4 hover:underline">
                {post.title[loc]}
              </Link>
            </h2>
            <p className="mt-3 text-body-sm leading-relaxed text-ink-muted">{post.excerpt[loc]}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-body-sm font-medium underline-offset-4 hover:underline"
            >
              {t("read")} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
