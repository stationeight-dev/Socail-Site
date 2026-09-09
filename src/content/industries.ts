import type { CatalogItem } from "./types";

function item(
  slug: string,
  icon: string,
  enTitle: string,
  frTitle: string,
  enTag: string,
  frTag: string,
  extra: Partial<CatalogItem> = {},
): CatalogItem {
  return {
    slug,
    icon,
    title: { en: enTitle, fr: frTitle },
    tagline: { en: enTag, fr: frTag },
    description: {
      en: extra.description?.en ?? enTag,
      fr: extra.description?.fr ?? frTag,
    },
    problem: extra.problem ?? {
      en: `Generic software rarely matches how ${enTitle.toLowerCase()} actually runs. We build around the real workflow.`,
      fr: `Les logiciels génériques collent rarement au réel du secteur. Nous construisons autour du flux de travail.`,
    },
    whatWeBuild: extra.whatWeBuild ?? {
      en: ["Customer-facing apps", "Staff consoles", "Integrations", "Reporting", "Mobile companion apps"],
      fr: ["Apps destinées aux clients", "Consoles équipes", "Intégrations", "Reporting", "Apps mobiles compagnons"],
    },
    whoFor: extra.whoFor ?? {
      en: ["Operators scaling past spreadsheets", "Groups with multiple sites", "Founders in the sector"],
      fr: ["Opérateurs qui dépassent les tableurs", "Groupes multi-sites", "Fondateurs du secteur"],
    },
    stack: extra.stack ?? ["Next.js", "React Native", "PostgreSQL"],
    faqs: extra.faqs ?? {
      en: [
        {
          q: `Do you have ${enTitle.toLowerCase()} templates?`,
          a: "We start from patterns, not clones. Each engagement is shaped to your regulations, users, and existing tools.",
        },
      ],
      fr: [
        {
          q: "Avez-vous des modèles tout faits ?",
          a: "Nous partons de motifs, pas de clones. Chaque mission s’adapte à vos règles, vos utilisateurs et vos outils.",
        },
      ],
    },
    seoTitle: extra.seoTitle ?? {
      en: `${enTitle} software development`,
      fr: `Logiciels pour ${frTitle.toLowerCase()}`,
    },
    seoDescription: extra.seoDescription ?? {
      en: `Custom software for ${enTitle.toLowerCase()} — web, mobile, and operations systems from Station Eight Labs.`,
      fr: `Logiciels sur mesure pour ${frTitle.toLowerCase()} — web, mobile et systèmes d’exploitation par Station Eight Labs.`,
    },
  };
}

export const industries: CatalogItem[] = [
  item("healthcare", "heart-pulse", "Healthcare", "Santé", "Clinics, records, and quieter admin.", "Cliniques, dossiers, administration plus calme.", {
    problem: {
      en: "Care teams lose hours to intake, reminders, and records that do not talk to each other.",
      fr: "Les soignants perdent des heures en admissions, rappels et dossiers qui ne se parlent pas.",
    },
    whatWeBuild: {
      en: ["Appointment and intake", "Clinical admin (not a toy EHR unless scoped)", "Patient reminders", "Billing hooks", "Staff mobile tools"],
      fr: ["Rendez-vous et admission", "Admin clinique (pas un DPI jouet, sauf cadrage)", "Rappels patients", "Ponts facturation", "Outils mobiles équipes"],
    },
  }),
  item("education", "graduation-cap", "Education", "Éducation", "Schools, institutes, and learning products.", "Écoles, instituts et produits d’apprentissage."),
  item("fintech", "landmark", "Fintech", "Fintech", "Ledgers, KYC flows, and careful permissions.", "Grands livres, parcours KYC et permissions soignées."),
  item("logistics", "truck", "Logistics", "Logistique", "Tracking, routing, and the ops console.", "Suivi, tournées et console d’exploitation."),
  item("retail", "shopping-bag", "Retail & e-commerce", "Retail et e-commerce", "Catalogs, checkout, and store ops.", "Catalogues, paiement et opérations magasin."),
  item("real-estate", "building-2", "Real estate", "Immobilier", "Listings, visits, and owner portals.", "Annonces, visites et portails propriétaires."),
  item("hospitality", "concierge-bell", "Hospitality", "Hôtellerie", "Bookings, guests, and property tools.", "Réservations, clients et outils d’établissement."),
  item("manufacturing", "factory", "Manufacturing", "Industrie", "Inventory, quality, and plant-floor data.", "Stocks, qualité et données d’atelier."),
  item("public-sector", "shield", "Public sector", "Secteur public", "Accessible services with an audit trail.", "Services accessibles, avec trace d’audit."),
  item("startups", "orbit", "Startups", "Startups", "From bet to first users without theatre.", "Du pari aux premiers utilisateurs, sans théâtre."),
];
