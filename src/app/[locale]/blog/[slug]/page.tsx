import { FadeIn } from "@/components/fade-in";
import { getPost, posts } from "@/content";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";
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

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="font-mono text-caption text-smoke">{post.date}</p>
        <h1 className="display mt-3 text-[clamp(3rem,6vw,5rem)]">{post.title[loc]}</h1>
        <p className="mt-6 text-subheading leading-[1.4] text-ink-muted">{post.excerpt[loc]}</p>
      </FadeIn>
      <div className="mt-10 space-y-5 text-body leading-[1.5] text-ink-muted">
        {post.body[loc].map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
