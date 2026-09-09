import type { WorkItem } from "./types";

export const work: WorkItem[] = [
  {
    slug: "classified-platform",
    title: { en: "Classified marketplace", fr: "Marketplace d’annonces" },
    client: { en: "Confidential — Gulf region", fr: "Confidentiel — région du Golfe" },
    sector: { en: "Marketplace", fr: "Marketplace" },
    summary: {
      en: "A listings platform with moderation, wallets, and a staff console that could survive real volume.",
      fr: "Une plateforme d’annonces avec modération, wallets, et une console capable d’encaisser un vrai volume.",
    },
    challenge: {
      en: "The first version looked like a product and behaved like a folder of scripts. We rebuilt the listing lifecycle, payments-adjacent flows, and the admin as the actual workplace.",
      fr: "La première version ressemblait à un produit et se comportait comme un dossier de scripts. Nous avons repris le cycle de vie des annonces, les flux autour du paiement, et l’admin comme vrai lieu de travail.",
    },
    outcome: {
      en: "A stack the client’s team can extend: web, mobile-ready APIs, and an admin that no longer needs a developer for every takedown.",
      fr: "Une stack que l’équipe cliente peut prolonger : web, APIs prêtes pour le mobile, admin qui n’exige plus un développeur pour chaque retrait.",
    },
    stack: ["React Native", "Node.js", "PostgreSQL"],
    seoTitle: { en: "Case study — classified marketplace", fr: "Étude de cas — marketplace d’annonces" },
    seoDescription: {
      en: "How Station Eight Labs approached a classified marketplace: listings, moderation, and an ops console.",
      fr: "Comment Station Eight Labs a abordé une marketplace d’annonces : listings, modération et console ops.",
    },
  },
  {
    slug: "clinic-ops",
    title: { en: "Clinic operations", fr: "Exploitation de clinique" },
    client: { en: "Confidential — independent clinic", fr: "Confidentiel — clinique indépendante" },
    sector: { en: "Healthcare", fr: "Santé" },
    summary: {
      en: "Appointments, reminders, and a front-desk console that replaced a wall of notebooks.",
      fr: "Rendez-vous, rappels, et une console d’accueil qui a remplacé un mur de carnets.",
    },
    challenge: {
      en: "The clinic did not need a hospital EHR. It needed intake, no-show reduction, and a staff tool that a receptionist would actually open.",
      fr: "La clinique n’avait pas besoin d’un DPI hospitalier. Elle avait besoin d’admission, de moins d’absences, et d’un outil qu’une réceptionniste ouvre vraiment.",
    },
    outcome: {
      en: "A first version in weeks, not a two-year transformation programme. Structured so a packaged product can follow.",
      fr: "Une première version en semaines, pas un programme de transformation de deux ans. Structuré pour qu’un produit packagé puisse suivre.",
    },
    stack: ["Next.js", "PostgreSQL"],
    seoTitle: { en: "Case study — clinic operations software", fr: "Étude de cas — logiciel d’exploitation clinique" },
    seoDescription: {
      en: "A focused clinic operations build: booking, reminders, and staff tools from Station Eight Labs.",
      fr: "Un projet ciblé d’exploitation de clinique : réservation, rappels et outils équipes par Station Eight Labs.",
    },
  },
];
