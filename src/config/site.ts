export const siteConfig = {
  name: "Station Eight Labs",
  /** Home-screen / install name. No space — this is what devices display. */
  appName: "StationEight Labs",
  shortName: "S8",
  legalName: "Station Eight Labs",
  tagline: {
    en: "A station for software that has to hold.",
    fr: "Un laboratoire pour les logiciels qui tiennent.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stationeight.org",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@stationeight.org",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  hq: {
    city: process.env.NEXT_PUBLIC_HQ_CITY ?? "",
    country: process.env.NEXT_PUBLIC_HQ_COUNTRY ?? "",
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
  },
} as const;
