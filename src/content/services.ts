import type { CatalogItem } from "./types";

const defaultFaqs = {
  en: [
    {
      q: "How long does a first release take?",
      a: "Most first releases land in 4–12 weeks, depending on scope. We cut to a version that can be used, not a version that only looks finished.",
    },
    {
      q: "Do we own the code?",
      a: "Yes. Source, accounts, and infrastructure stay in your name. We are a station, not a lock-in.",
    },
    {
      q: "Can you work with our existing stack?",
      a: "Usually yes. We prefer to extend what already holds rather than rewrite it for sport.",
    },
  ],
  fr: [
    {
      q: "Combien de temps pour une première version ?",
      a: "La plupart des premières versions arrivent en 4 à 12 semaines, selon le périmètre. Nous visons une version utilisable, pas seulement présentable.",
    },
    {
      q: "Possédons-nous le code ?",
      a: "Oui. Le code, les comptes et l’infrastructure restent à votre nom. Nous sommes une station, pas un verrou.",
    },
    {
      q: "Pouvez-vous travailler avec notre stack actuelle ?",
      a: "Le plus souvent, oui. Nous préférons prolonger ce qui tient déjà plutôt que de tout réécrire.",
    },
  ],
};

export const services: CatalogItem[] = [
  {
    slug: "web-development",
    icon: "globe",
    title: { en: "Web development", fr: "Développement web" },
    tagline: {
      en: "Sites and web apps that load fast and convert.",
      fr: "Sites et applications web rapides, pensés pour convertir.",
    },
    description: {
      en: "Marketing sites, portals, and Next.js platforms built for search, accessibility, and long life.",
      fr: "Sites marketing, portails et plateformes Next.js conçus pour le référencement, l’accessibilité et la durée.",
    },
    problem: {
      en: "Too many company sites are templates with no owner. They stall Core Web Vitals, confuse visitors, and cannot grow into a product.",
      fr: "Trop de sites d’entreprise sont des modèles sans responsable. Ils ralentissent, perdent les visiteurs et ne peuvent pas devenir un produit.",
    },
    whatWeBuild: {
      en: [
        "Marketing sites and landing systems",
        "SaaS dashboards and customer portals",
        "E-commerce and catalog platforms",
        "CMS-backed publishing",
        "APIs and integrations",
      ],
      fr: [
        "Sites marketing et systèmes de landing",
        "Tableaux de bord SaaS et portails clients",
        "E-commerce et catalogues",
        "Publication avec CMS",
        "APIs et intégrations",
      ],
    },
    whoFor: {
      en: ["Founders replacing a brochure site", "Teams launching a web product", "Operators who need a portal, not a PDF"],
      fr: ["Fondateurs qui remplacent un site vitrine", "Équipes qui lancent un produit web", "Opérations qui ont besoin d’un portail, pas d’un PDF"],
    },
    stack: ["Next.js", "React", "TypeScript", "Node.js"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Web development company | Next.js & React",
      fr: "Agence de développement web | Next.js et React",
    },
    seoDescription: {
      en: "Station Eight Labs builds high-performance websites and web apps with Next.js, React, and modern SEO.",
      fr: "Station Eight Labs conçoit des sites et applications web performants avec Next.js, React et un SEO soigné.",
    },
  },
  {
    slug: "mobile-apps",
    icon: "smartphone",
    title: { en: "Mobile apps", fr: "Applications mobiles" },
    tagline: {
      en: "iOS and Android apps people keep open.",
      fr: "Des applications iOS et Android que l’on garde ouvertes.",
    },
    description: {
      en: "Native-quality apps with React Native or Flutter, store-ready, with the backend they actually need.",
      fr: "Applications de qualité native en React Native ou Flutter, prêtes pour les stores, avec le backend dont elles ont besoin.",
    },
    problem: {
      en: "Mobile projects fail when the app is a thin skin over a messy process. We start from the job the user is trying to finish.",
      fr: "Les projets mobiles échouent quand l’app n’est qu’une peau sur un processus confus. Nous partons de la tâche que l’utilisateur doit terminer.",
    },
    whatWeBuild: {
      en: ["React Native apps", "Flutter apps", "Store submission and ASO basics", "Push, wallets, maps, offline", "Companion admin apps"],
      fr: ["Apps React Native", "Apps Flutter", "Publication stores et bases ASO", "Push, wallets, cartes, hors-ligne", "Applications d’administration"],
    },
    whoFor: {
      en: ["Startups shipping an MVP", "Operators putting a workflow in the field", "Brands that need both stores"],
      fr: ["Startups qui livrent un MVP", "Opérations qui mettent un flux sur le terrain", "Marques présentes sur les deux stores"],
    },
    stack: ["React Native", "Flutter", "Node.js", "Firebase"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Mobile app development | iOS, Android, React Native",
      fr: "Développement d’applications mobiles | iOS, Android, React Native",
    },
    seoDescription: {
      en: "Custom iOS and Android apps from Station Eight Labs — React Native, Flutter, and production backends.",
      fr: "Applications iOS et Android sur mesure par Station Eight Labs — React Native, Flutter et backends de production.",
    },
  },
  {
    slug: "custom-software",
    icon: "cpu",
    title: { en: "Custom software, ERP & CRM", fr: "Logiciels sur mesure, ERP et CRM" },
    tagline: {
      en: "Systems that match how you actually work.",
      fr: "Des systèmes alignés sur votre façon réelle de travailler.",
    },
    description: {
      en: "Bespoke ERP, CRM, and internal tools when off-the-shelf software fights your process.",
      fr: "ERP, CRM et outils internes sur mesure lorsque les logiciels du marché se battent contre votre process.",
    },
    problem: {
      en: "Spreadsheets, WhatsApp, and three CRMs is not a stack. It is a leak. Custom software is for the leak you cannot buy your way out of.",
      fr: "Tableurs, WhatsApp et trois CRM ne forment pas une stack. C’est une fuite. Le sur-mesure sert quand on ne peut plus acheter la sortie.",
    },
    whatWeBuild: {
      en: ["Custom ERP modules", "CRM and pipeline tools", "Inventory and billing", "Role-based admin", "Reporting that finance will trust"],
      fr: ["Modules ERP sur mesure", "CRM et pipelines", "Stocks et facturation", "Administration par rôles", "Reporting fiable pour la finance"],
    },
    whoFor: {
      en: ["SMBs outgrowing generic SaaS", "Multi-site operators", "Teams with regulated workflows"],
      fr: ["PME qui dépassent le SaaS générique", "Réseaux multi-sites", "Équipes aux flux réglementés"],
    },
    stack: ["Next.js", "Node.js", "PostgreSQL", "Python"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Custom ERP, CRM and business software",
      fr: "ERP, CRM et logiciels métier sur mesure",
    },
    seoDescription: {
      en: "Custom ERP, CRM, and operational software designed around your process — not the other way around.",
      fr: "ERP, CRM et logiciels opérationnels conçus autour de votre process — pas l’inverse.",
    },
  },
  {
    slug: "ai-integration",
    icon: "sparkles",
    title: { en: "AI integration", fr: "Intégration IA" },
    tagline: {
      en: "Useful models inside real products.",
      fr: "Des modèles utiles, dans de vrais produits.",
    },
    description: {
      en: "Assistants, document pipelines, and automation that sit behind your auth and your data — not a demo chatbot.",
      fr: "Assistants, pipelines documentaires et automatisations derrière votre authentification et vos données — pas un chatbot de démo.",
    },
    problem: {
      en: "AI is easy to demo and hard to trust. We put models where they reduce work, with logs, fallbacks, and human control.",
      fr: "L’IA est facile à montrer et difficile à faire confiance. Nous la plaçons là où elle réduit le travail, avec journaux, repli et contrôle humain.",
    },
    whatWeBuild: {
      en: ["Product copilots", "RAG over your corpus", "Workflow automation", "Classification and extraction", "Eval and monitoring hooks"],
      fr: ["Copilotes produit", "RAG sur votre corpus", "Automatisation de workflows", "Classification et extraction", "Évaluations et supervision"],
    },
    whoFor: {
      en: ["Product teams adding AI to an existing app", "Ops teams drowning in documents", "Support orgs that need a first line"],
      fr: ["Équipes produit qui ajoutent l’IA à une app existante", "Ops noyées sous les documents", "Support qui a besoin d’une première ligne"],
    },
    stack: ["Python", "Node.js", "PostgreSQL", "AWS"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "AI integration and automation for products",
      fr: "Intégration IA et automatisation produit",
    },
    seoDescription: {
      en: "Production AI: copilots, RAG, and automation designed into your software — with control, not hype.",
      fr: "IA de production : copilotes, RAG et automatisation intégrés à votre logiciel — avec du contrôle, pas du bruit.",
    },
  },
  {
    slug: "backend-cloud",
    icon: "server",
    title: { en: "Backend & cloud", fr: "Backend et cloud" },
    tagline: {
      en: "APIs and infrastructure that stay boring under load.",
      fr: "Des APIs et une infra qui restent sages sous la charge.",
    },
    description: {
      en: "Node.js, Python, and AWS systems for apps that need auth, data, queues, and a grown-up deploy path.",
      fr: "Systèmes Node.js, Python et AWS pour des apps qui ont besoin d’auth, de données, de files et d’un vrai déploiement.",
    },
    problem: {
      en: "Frontends fail quietly when the backend was an afterthought. We treat the API as the product.",
      fr: "Les frontends cassent en silence quand le backend a été pensé trop tard. Nous traitons l’API comme le produit.",
    },
    whatWeBuild: {
      en: ["REST and GraphQL APIs", "Auth and multi-tenant data", "Queues, jobs, and webhooks", "AWS architecture", "Observability"],
      fr: ["APIs REST et GraphQL", "Auth et données multi-tenant", "Files, jobs et webhooks", "Architecture AWS", "Observabilité"],
    },
    whoFor: {
      en: ["Mobile teams that need a real API", "SaaS founders past the prototype", "Companies moving off a single server"],
      fr: ["Équipes mobile qui ont besoin d’une vraie API", "Fondateurs SaaS hors prototype", "Entreprises qui quittent le serveur unique"],
    },
    stack: ["Node.js", "Python", "PostgreSQL", "AWS"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Backend and cloud engineering | Node.js, AWS",
      fr: "Ingénierie backend et cloud | Node.js, AWS",
    },
    seoDescription: {
      en: "Secure, scalable backends and AWS infrastructure for mobile, web, and SaaS products.",
      fr: "Backends sécurisés, scalables, et infrastructure AWS pour le mobile, le web et le SaaS.",
    },
  },
  {
    slug: "startup-mvp",
    icon: "rocket",
    title: { en: "Startup MVP", fr: "MVP startup" },
    tagline: {
      en: "The smallest product that can learn.",
      fr: "Le plus petit produit capable d’apprendre.",
    },
    description: {
      en: "From idea to a release you can put in front of customers — with a stack you can keep.",
      fr: "De l’idée à une version que vous pouvez montrer à des clients — avec une stack que vous pourrez garder.",
    },
    problem: {
      en: "MVPs die when they are either a slide deck or an overbuilt platform. We ship the cut that tests the bet.",
      fr: "Les MVP meurent quand ce n’est qu’un deck, ou une plateforme trop grosse. Nous livrons la coupe qui teste le pari.",
    },
    whatWeBuild: {
      en: ["Web or mobile MVP", "Auth, payments, admin", "Analytics events", "Launch checklist", "A 90-day roadmap after v1"],
      fr: ["MVP web ou mobile", "Auth, paiements, admin", "Événements analytics", "Checklist de lancement", "Feuille de route 90 jours après la v1"],
    },
    whoFor: {
      en: ["Pre-seed and seed teams", "Operators spinning out a product", "Founders who need a technical partner"],
      fr: ["Équipes pre-seed et seed", "Opérateurs qui extraient un produit", "Fondateurs qui ont besoin d’un partenaire technique"],
    },
    stack: ["Next.js", "React Native", "PostgreSQL", "AWS"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Startup MVP development",
      fr: "Développement de MVP pour startups",
    },
    seoDescription: {
      en: "Ship a real MVP: web or mobile, with auth, payments, and a stack you can grow.",
      fr: "Livrez un vrai MVP : web ou mobile, avec auth, paiements, et une stack évolutive.",
    },
  },
  {
    slug: "admin-panels",
    icon: "layout-dashboard",
    title: { en: "Admin panels", fr: "Panneaux d’administration" },
    tagline: {
      en: "The room where the business actually runs.",
      fr: "La salle d’où le métier est vraiment piloté.",
    },
    description: {
      en: "Internal tools for staff, ops, and finance — permissions, audit trails, and screens that match the work.",
      fr: "Outils internes pour les équipes, les ops et la finance — permissions, traces d’audit, écrans alignés sur le travail.",
    },
    problem: {
      en: "If staff work around the admin, the admin is the bug. We design the console as a first-class product.",
      fr: "Si les équipes contournent l’admin, l’admin est le bug. Nous concevons la console comme un vrai produit.",
    },
    whatWeBuild: {
      en: ["Role-based consoles", "Moderation and KYC queues", "Catalog and order tools", "Export and audit logs", "Embedded analytics"],
      fr: ["Consoles par rôles", "Files de modération et KYC", "Outils catalogue et commandes", "Exports et journaux d’audit", "Analytics intégrés"],
    },
    whoFor: {
      en: ["Marketplaces", "Clinics and schools", "Any product with an ops team"],
      fr: ["Marketplaces", "Cliniques et écoles", "Tout produit avec une équipe ops"],
    },
    stack: ["Next.js", "PostgreSQL", "Node.js"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Custom admin panel development",
      fr: "Développement de panneaux d’administration",
    },
    seoDescription: {
      en: "Internal admin panels with roles, audit trails, and workflows your staff will actually use.",
      fr: "Admins internes avec rôles, traces d’audit et workflows que vos équipes utiliseront vraiment.",
    },
  },
  {
    slug: "seo-growth",
    icon: "search",
    title: { en: "SEO & growth", fr: "SEO et croissance" },
    tagline: {
      en: "Pages that can be found, then trusted.",
      fr: "Des pages que l’on trouve, puis auxquelles on fait confiance.",
    },
    description: {
      en: "Technical SEO, content architecture, and launch support so the product is not invisible on day one.",
      fr: "SEO technique, architecture de contenu et accompagnement de lancement pour que le produit ne soit pas invisible.",
    },
    problem: {
      en: "A beautiful product that nobody can search for is a private club. We build the public doors.",
      fr: "Un beau produit introuvable est un club privé. Nous construisons les portes publiques.",
    },
    whatWeBuild: {
      en: ["Technical SEO on Next.js", "IA-ready landing pages", "Multilingual hreflang", "Analytics and events", "Content models for blogs"],
      fr: ["SEO technique sur Next.js", "Landings prêtes pour l’intention", "Hreflang multilingue", "Analytics et événements", "Modèles de contenu pour blogs"],
    },
    whoFor: {
      en: ["New sites entering Europe", "SaaS that needs category pages", "Local businesses expanding online"],
      fr: ["Nouveaux sites qui visent l’Europe", "SaaS qui a besoin de pages catégories", "Commerces locaux qui passent en ligne"],
    },
    stack: ["Next.js", "Content", "Analytics"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Technical SEO and growth for software companies",
      fr: "SEO technique et croissance pour éditeurs logiciels",
    },
    seoDescription: {
      en: "Technical SEO, multilingual pages, and launch architecture so your software can be found.",
      fr: "SEO technique, pages multilingues et architecture de lancement pour que l’on trouve votre logiciel.",
    },
  },
  {
    slug: "maintenance",
    icon: "wrench",
    title: { en: "Maintenance & support", fr: "Maintenance et support" },
    tagline: {
      en: "Keep the station running.",
      fr: "Faire tourner la station.",
    },
    description: {
      en: "Retainer work: patches, dependency hygiene, small features, and a human who already knows the repo.",
      fr: "Contrat de suivi : correctifs, hygiène des dépendances, petites évolutions, et quelqu’un qui connaît déjà le dépôt.",
    },
    problem: {
      en: "Software rots in silence. A monthly station hour is cheaper than an emergency rewrite.",
      fr: "Le logiciel pourrit en silence. Une heure de station par mois coûte moins cher qu’une réécriture d’urgence.",
    },
    whatWeBuild: {
      en: ["SLA-style response", "Dependency and security updates", "Performance passes", "Feature slices", "Handover docs"],
      fr: ["Réponse type SLA", "Mises à jour sécurité et dépendances", "Passes performance", "Tranches de fonctionnalités", "Documentation de passation"],
    },
    whoFor: {
      en: ["Teams who shipped with us", "Companies inheriting a codebase", "Products between full-time hires"],
      fr: ["Équipes livrées avec nous", "Entreprises qui héritent d’un code", "Produits entre deux recrutements"],
    },
    stack: ["Next.js", "Node.js", "AWS"],
    faqs: defaultFaqs,
    seoTitle: {
      en: "Software maintenance and product support",
      fr: "Maintenance logicielle et support produit",
    },
    seoDescription: {
      en: "Ongoing maintenance for web, mobile, and cloud products — updates, performance, and small features.",
      fr: "Maintenance continue pour le web, le mobile et le cloud — mises à jour, performance et petites évolutions.",
    },
  },
];
