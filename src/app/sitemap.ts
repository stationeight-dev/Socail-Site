import { hubs, posts, products, work } from "@/content";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";
import type { MetadataRoute } from "next";

const staticPaths = [
  "/",
  "/services",
  "/industries",
  "/solutions",
  "/technologies",
  "/products",
  "/work",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

function allPaths() {
  const paths = [...staticPaths];
  for (const [hub, items] of Object.entries(hubs)) {
    for (const item of items) {
      paths.push(`/${hub}/${item.slug}`);
    }
  }
  for (const item of products) paths.push(`/products/${item.slug}`);
  for (const item of work) paths.push(`/work/${item.slug}`);
  for (const item of posts) paths.push(`/blog/${item.slug}`);
  return paths;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = allPaths();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, localizedUrl(path, item)]),
        ),
      },
    })),
  );
}
