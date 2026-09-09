import type { ProductItem } from "./types";

export const products: ProductItem[] = [
  {
    slug: "station-desk",
    icon: "layout-dashboard",
    status: { en: "Waitlist", fr: "Liste d’attente" },
    priceHint: { en: "Enquiry — packaged pricing later", fr: "Sur demande — tarif packagé plus tard" },
    title: { en: "Station Desk", fr: "Station Desk" },
    tagline: {
      en: "The operations console for a small company that has outgrown chat.",
      fr: "La console d’exploitation pour une petite entreprise qui a dépassé la messagerie.",
    },
    description: {
      en: "A focused back office: people, jobs, and a daily list that is not a spreadsheet. Join the waitlist.",
      fr: "Un back-office ciblé : personnes, tâches, liste du jour qui n’est pas un tableur. Rejoignez la liste d’attente.",
    },
    problem: {
      en: "Most SMBs do not need another all-in-one suite. They need one room where today’s work is visible.",
      fr: "La plupart des PME n’ont pas besoin d’une suite de plus. Elles ont besoin d’une pièce où le travail du jour est visible.",
    },
    whatWeBuild: {
      en: ["Staff and roles", "Job or ticket queue", "Customer records", "Simple reporting", "Coming: payments"],
      fr: ["Équipes et rôles", "File de tickets", "Fiches clients", "Reporting simple", "Bientôt : paiements"],
    },
    whoFor: {
      en: ["Agencies", "Clinics and studios", "Field teams"],
      fr: ["Agences", "Cliniques et studios", "Équipes terrain"],
    },
    stack: ["Next.js", "PostgreSQL"],
    faqs: {
      en: [
        {
          q: "Can I buy it today?",
          a: "Not yet. Leave an enquiry. If you need it now, we can build a custom cousin under Services.",
        },
      ],
      fr: [
        {
          q: "Puis-je l’acheter aujourd’hui ?",
          a: "Pas encore. Laissez une demande. Si vous en avez besoin maintenant, nous pouvons construire un cousin sur mesure.",
        },
      ],
    },
    seoTitle: { en: "Station Desk — operations software waitlist", fr: "Station Desk — liste d’attente logiciel d’exploitation" },
    seoDescription: {
      en: "Station Desk is an upcoming operations console for small companies. Join the Station Eight Labs waitlist.",
      fr: "Station Desk est une future console d’exploitation pour petites entreprises. Liste d’attente Station Eight Labs.",
    },
  },
  {
    slug: "byte-flow",
    icon: "workflow",
    status: { en: "Waitlist", fr: "Liste d’attente" },
    priceHint: { en: "Enquiry — packaged pricing later", fr: "Sur demande — tarif packagé plus tard" },
    title: { en: "Byte Flow", fr: "Byte Flow" },
    tagline: {
      en: "Eight steps, one byte: small automations that compose.",
      fr: "Huit étapes, un octet : de petites automatisations qui se composent.",
    },
    description: {
      en: "Opinionated workflow automation for teams who do not want a 400-block canvas.",
      fr: "Automatisation de workflows, opiniâtre, pour les équipes qui ne veulent pas un canevas à 400 blocs.",
    },
    problem: {
      en: "Zap-style tools sprawl. We are designing a smaller machine: triggers, approvals, and an audit log.",
      fr: "Les outils façon Zap s’éparpillent. Nous dessinons une machine plus petite : déclencheurs, validations, journal.",
    },
    whatWeBuild: {
      en: ["Human-in-the-loop steps", "Email and webhook I/O", "Approvals", "Run history", "Templates per trade"],
      fr: ["Étapes avec humain dans la boucle", "Email et webhooks", "Validations", "Historique d’exécution", "Modèles par métier"],
    },
    whoFor: {
      en: ["Ops leads", "Studios with repetitive intake", "Internal IT of a small group"],
      fr: ["Responsables ops", "Studios à l’admission répétitive", "IT interne d’un petit groupe"],
    },
    stack: ["Node.js", "PostgreSQL", "Python"],
    faqs: {
      en: [
        {
          q: "Will this replace Zapier?",
          a: "No. It is for a few critical flows you want to own, not for every integration on earth.",
        },
      ],
      fr: [
        {
          q: "Remplacera-t-il Zapier ?",
          a: "Non. Il vise quelques flux critiques que vous voulez posséder, pas toutes les intégrations du monde.",
        },
      ],
    },
    seoTitle: { en: "Byte Flow — workflow automation waitlist", fr: "Byte Flow — liste d’attente automatisation" },
    seoDescription: {
      en: "Byte Flow is upcoming workflow software from Station Eight Labs. Enquire to join the waitlist.",
      fr: "Byte Flow est un futur logiciel de workflows de Station Eight Labs. Demandez à rejoindre la liste d’attente.",
    },
  },
  {
    slug: "hut-notes",
    icon: "notebook-pen",
    status: { en: "Waitlist", fr: "Liste d’attente" },
    priceHint: { en: "Enquiry — packaged pricing later", fr: "Sur demande — tarif packagé plus tard" },
    title: { en: "Hut Notes", fr: "Hut Notes" },
    tagline: {
      en: "A thin CRM for teams who hate CRM.",
      fr: "Un CRM mince pour les équipes qui détestent les CRM.",
    },
    description: {
      en: "People, notes, next actions. Named after the quiet rooms where work actually happened.",
      fr: "Personnes, notes, prochaines actions. Nommé d’après les salles calmes où le travail se faisait vraiment.",
    },
    problem: {
      en: "Enterprise CRM is a costume. Small labs need memory, not a pipeline religion.",
      fr: "Le CRM d’entreprise est un costume. Un petit laboratoire a besoin de mémoire, pas d’une religion du pipeline.",
    },
    whatWeBuild: {
      en: ["Contact memory", "Next-action lists", "Light pipeline", "Email capture later", "Export always"],
      fr: ["Mémoire des contacts", "Listes de prochaines actions", "Pipeline léger", "Capture email plus tard", "Export toujours"],
    },
    whoFor: {
      en: ["Boutique agencies", "Independent consultants", "Founder-led sales"],
      fr: ["Agences boutique", "Indépendants", "Vente menée par le fondateur"],
    },
    stack: ["Next.js", "PostgreSQL"],
    faqs: {
      en: [
        {
          q: "Will it sync with Salesforce?",
          a: "Not the point. If you already live in Salesforce, stay there. Hut Notes is for the other ninety percent.",
        },
      ],
      fr: [
        {
          q: "Synchronisation Salesforce ?",
          a: "Ce n’est pas le but. Si vous vivez déjà dans Salesforce, restez-y. Hut Notes est pour les autres.",
        },
      ],
    },
    seoTitle: { en: "Hut Notes — lightweight CRM waitlist", fr: "Hut Notes — liste d’attente CRM léger" },
    seoDescription: {
      en: "Hut Notes is a forthcoming lightweight CRM from Station Eight Labs. Join the waitlist.",
      fr: "Hut Notes est un futur CRM léger de Station Eight Labs. Rejoignez la liste d’attente.",
    },
  },
];
