import type { Locale } from "@/i18n/routing";

export type Localized<T> = Record<Locale, T>;

export type Faq = {
  q: string;
  a: string;
};

export type CatalogItem = {
  slug: string;
  icon: string;
  title: Localized<string>;
  tagline: Localized<string>;
  description: Localized<string>;
  problem: Localized<string>;
  whatWeBuild: Localized<string[]>;
  whoFor: Localized<string[]>;
  stack: string[];
  faqs: Localized<Faq[]>;
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
};

export type ProductItem = CatalogItem & {
  status: Localized<string>;
  priceHint: Localized<string>;
};

export type WorkItem = {
  slug: string;
  title: Localized<string>;
  client: Localized<string>;
  sector: Localized<string>;
  summary: Localized<string>;
  challenge: Localized<string>;
  outcome: Localized<string>;
  stack: string[];
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
};

export type BlogPost = {
  slug: string;
  date: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  body: Localized<string[]>;
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
};

export type HubKey = "services" | "industries" | "solutions" | "technologies";
