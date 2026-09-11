import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

// Brand/entity variants people actually type into Google. Keeping these on
// the Organization node (rather than only in body copy) is what lets Google
// resolve "Station 8", "Station8", etc. to this same entity.
const brandAlternateNames = ["Station Eight", "Station 8", "Station8", "Station Eight Labs India"];

export function organizationSchema(locale: Locale) {
  const hasAddress = Boolean(siteConfig.hq.city && siteConfig.hq.country);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: brandAlternateNames,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.hq.city,
            addressCountry: siteConfig.hq.country,
          },
        }
      : {}),
    logo: `${siteConfig.url}/icon`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    areaServed: "Worldwide",
    knowsLanguage: ["en", "fr"],
    description:
      locale === "fr"
        ? "Station Eight Labs est une entreprise de développement logiciel : services sur mesure et produits pour clients dans le monde entier."
        : "Station Eight Labs is a software development company: custom services and products for clients worldwide.",
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: localizedUrl("/", locale),
    inLanguage: locale,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@type": "Organization", name: siteConfig.name },
    areaServed: "Worldwide",
  };
}

export function productSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      url,
      priceCurrency: "EUR",
      price: "0",
      description: "Waitlist / enquiry — pricing published at launch",
    },
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, logo: `${siteConfig.url}/icon` },
    mainEntityOfPage: url,
  };
}
