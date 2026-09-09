import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    logo: `${siteConfig.url}/icon`,
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    areaServed: "Worldwide",
    knowsLanguage: ["en", "fr"],
    description:
      locale === "fr"
        ? "Laboratoire logiciel : services sur mesure et produits pour clients dans le monde entier."
        : "Software lab: custom services and products for clients worldwide.",
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
