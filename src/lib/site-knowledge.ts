import { industries, products, services, solutions, work } from "@/content";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

/**
 * A condensed, plain-text summary of the site's content, used as grounding
 * context in the chatbot's system prompt so it can answer questions about
 * services, industries, solutions, products, and past work without
 * hallucinating details the site doesn't actually say.
 */
export function buildSiteKnowledge(locale: Locale): string {
  const section = (title: string, lines: string[]) =>
    lines.length ? `${title}\n${lines.map((line) => `- ${line}`).join("\n")}` : "";

  const servicesLines = services.map(
    (item) => `${item.title[locale]}: ${item.tagline[locale]} (/services/${item.slug})`,
  );
  const industriesLines = industries.map(
    (item) => `${item.title[locale]}: ${item.tagline[locale]} (/industries/${item.slug})`,
  );
  const solutionsLines = solutions.map(
    (item) => `${item.title[locale]}: ${item.tagline[locale]} (/solutions/${item.slug})`,
  );
  const productsLines = products.map(
    (item) => `${item.title[locale]}: ${item.tagline[locale]} (/products/${item.slug})`,
  );
  const workLines = work
    .slice(0, 10)
    .map((item) => `${item.title[locale]} — ${item.sector[locale]}: ${item.summary[locale]}`);

  return [
    `Company: ${siteConfig.name} (${siteConfig.url}). ${siteConfig.tagline[locale]}`,
    `Contact email: ${siteConfig.email}`,
    section(locale === "fr" ? "Services :" : "Services:", servicesLines),
    section(locale === "fr" ? "Secteurs :" : "Industries:", industriesLines),
    section(locale === "fr" ? "Solutions :" : "Solutions:", solutionsLines),
    section(locale === "fr" ? "Produits :" : "Products:", productsLines),
    section(locale === "fr" ? "Réalisations sélectionnées :" : "Selected work:", workLines),
  ]
    .filter(Boolean)
    .join("\n\n");
}
