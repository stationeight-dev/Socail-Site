import { BlogHeroArt } from "@/components/blog-hero-art";
import { FadeIn } from "@/components/fade-in";
import { JsonLd } from "@/components/json-ld";
import { getAuthor, getPost, posts } from "@/content";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { buildMetadata, localizedUrl } from "@/lib/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const loc = locale as Locale;
  return buildMetadata({
    locale: loc,
    path: `/blog/${slug}`,
    title: post.seoTitle[loc],
    description: post.seoDescription[loc],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = getPost(slug);
  if (!post) notFound();
  const author = getAuthor(post.authorSlug);
  const nav = await getTranslations("Nav");
  const blogT = await getTranslations("Blog");
  const url = localizedUrl(`/blog/${slug}`, loc);
  const maxStat = post.stats ? Math.max(...post.stats.items.map((item) => item.value)) : 0;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: siteConfig.name, url: localizedUrl("/", loc) },
          { name: nav("blog"), url: localizedUrl("/blog", loc) },
          { name: post.title[loc], url },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: post.title[loc],
          description: post.excerpt[loc],
          url,
          datePublished: post.date,
        })}
      />
      <FadeIn>
        <p className="font-mono text-caption text-smoke">{post.date}</p>
        <h1 className="display mt-3 text-[clamp(3rem,6vw,5rem)]">{post.title[loc]}</h1>
        <p className="mt-6 text-subheading leading-[1.4] text-ink-muted">{post.excerpt[loc]}</p>
        <div className="mt-6 flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-mist font-mono text-caption font-medium text-ink"
          >
            {author.initials}
          </span>
          <div className="leading-tight">
            <p className="text-body-sm font-medium text-ink">{author.name}</p>
          </div>
        </div>
      </FadeIn>
      <FadeIn className="mt-10">
        <BlogHeroArt slug={post.slug} />
      </FadeIn>

      <div className="mt-10 space-y-5 text-body leading-[1.5] text-ink-muted">
        {post.body[loc].map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      {post.table ? (
        <FadeIn className="mt-12">
          <p className="font-mono text-caption uppercase text-smoke">{post.table.caption[loc]}</p>
          <div className="mt-3 overflow-x-auto rounded-[32px] bg-paper-elevated">
            <table className="w-full min-w-[480px] border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-line/40 text-left">
                  {post.table.headers[loc].map((header) => (
                    <th key={header} className="px-5 py-3 font-mono text-caption uppercase text-smoke">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {post.table.rows.map((row) => (
                  <tr key={row[loc][0]} className="border-b border-line/20 last:border-0">
                    {row[loc].map((cell, i) => (
                      <td key={i} className={i === 0 ? "px-5 py-3 font-medium text-ink" : "px-5 py-3 text-ink-muted"}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      ) : null}

      {post.stats ? (
        <FadeIn className="mt-12">
          <p className="font-mono text-caption uppercase text-smoke">{post.stats.caption[loc]}</p>
          <ul className="mt-4 space-y-3">
            {post.stats.items.map((item) => (
              <li key={item.label[loc]}>
                <div className="flex items-baseline justify-between text-body-sm">
                  <span className="text-ink-muted">{item.label[loc]}</span>
                  <span className="font-mono text-caption text-ink">
                    {item.value}
                    {post.stats?.unit ?? ""}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-mist">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${maxStat ? (item.value / maxStat) * 100 : 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </FadeIn>
      ) : null}

      {post.keyTakeaways ? (
        <FadeIn className="mt-12">
          <h2 className="heading text-heading-sm">{blogT("keyTakeaways")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {post.keyTakeaways[loc].map((line) => (
              <li key={line.slice(0, 24)} className="card-flat text-body-sm leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </FadeIn>
      ) : null}

      <FadeIn className="mt-14 border-t border-line/30 pt-8">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist font-mono text-caption font-medium text-ink"
          >
            {author.initials}
          </span>
          <div>
            <p className="text-body-sm font-medium text-ink">{author.name}</p>
            <p className="mt-1 text-body-sm leading-relaxed text-ink-muted">{author.bio[loc]}</p>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
