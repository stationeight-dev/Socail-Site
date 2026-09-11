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
  /** Role/team/period line — only set for team-experience entries. */
  role?: Localized<string>;
  /** True for engagements delivered by the founding team before or outside
   * Station Eight Labs (e.g. at a previous employer or as a freelancer) —
   * real experience, but not a Station Eight Labs client relationship. */
  isTeamExperience?: boolean;
  /** e.g. "Completed" — shown as a small badge alongside sector. */
  status?: Localized<string>;
  /** How the engagement came about, e.g. "Direct engagement with Gavazo"
   * or "Delivered via Konect.ai" — shown under the company/client line. */
  engagementContext?: Localized<string>;
};

export type BlogPost = {
  slug: string;
  date: string;
  authorSlug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  body: Localized<string[]>;
  /** Optional data table rendered after the prose — a comparison or cost breakdown. */
  table?: {
    caption: Localized<string>;
    headers: Localized<string[]>;
    rows: Localized<string[]>[];
  };
  /** Optional simple bar-chart style stat comparison rendered after the table. */
  stats?: {
    caption: Localized<string>;
    unit?: string;
    items: { label: Localized<string>; value: number }[];
  };
  /** Short bulleted summary rendered near the end of the post. */
  keyTakeaways?: Localized<string[]>;
  seoTitle: Localized<string>;
  seoDescription: Localized<string>;
};

export type HubKey = "services" | "industries" | "solutions";
