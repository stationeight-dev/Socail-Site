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
    slug: "mobile-app-development",
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
    slug: "custom-software-development",
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
      en: "Custom software development company | ERP & CRM",
      fr: "Entreprise de développement de logiciels sur mesure | ERP et CRM",
    },
    seoDescription: {
      en: "Custom ERP, CRM, and operational software designed around your process — not the other way around.",
      fr: "ERP, CRM et logiciels opérationnels conçus autour de votre process — pas l’inverse.",
    },
  },
  {
    slug: "ai-development",
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
      en: "AI development company | AI integration & automation",
      fr: "Entreprise de développement IA | Intégration et automatisation",
    },
    seoDescription: {
      en: "Production AI: copilots, RAG, and automation designed into your software — with control, not hype.",
      fr: "IA de production : copilotes, RAG et automatisation intégrés à votre logiciel — avec du contrôle, pas du bruit.",
    },
  },
  {
    slug: "cloud-development",
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
      en: "Cloud development company | Backend engineering, Node.js, AWS",
      fr: "Entreprise de développement cloud | Ingénierie backend, Node.js, AWS",
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
  {
    slug: "software-development",
    icon: "binary",
    title: { en: "Software development", fr: "Développement logiciel" },
    tagline: {
      en: "One station, the full stack: web, mobile, AI, and the systems behind them.",
      fr: "Une seule station, toute la chaîne : web, mobile, IA et les systèmes qui les soutiennent.",
    },
    description: {
      en: "Station Eight Labs is a software development company: we design, build, and operate custom software, web and mobile products, SaaS platforms, and AI systems for clients across Europe and worldwide.",
      fr: "Station Eight Labs est une entreprise de développement logiciel : nous concevons, construisons et exploitons des logiciels sur mesure, des produits web et mobiles, des plateformes SaaS et des systèmes d’IA pour des clients en Europe et dans le monde.",
    },
    problem: {
      en: "Most software problems are not technology problems first. They are scoping problems wearing a technology costume. We start by naming the actual constraint, then pick the smallest stack that can hold it — not the largest one we know how to sell.",
      fr: "La plupart des problèmes logiciels ne sont pas d’abord des problèmes technologiques. Ce sont des problèmes de périmètre déguisés en problème technique. Nous commençons par nommer la vraie contrainte, puis choisissons la plus petite stack capable de la tenir — pas la plus grande que nous savons vendre.",
    },
    whatWeBuild: {
      en: [
        "Custom software, ERP, and CRM",
        "Web platforms and marketing sites",
        "iOS and Android apps",
        "SaaS products and internal tools",
        "AI copilots and automation",
        "Backend, API, and cloud infrastructure",
      ],
      fr: [
        "Logiciels sur mesure, ERP et CRM",
        "Plateformes web et sites marketing",
        "Applications iOS et Android",
        "Produits SaaS et outils internes",
        "Copilotes IA et automatisation",
        "Backend, API et infrastructure cloud",
      ],
    },
    whoFor: {
      en: [
        "Founders who need one technical partner, not five vendors",
        "Operators replacing spreadsheets and second-hand SaaS",
        "Teams that inherited a codebase and need it held properly",
      ],
      fr: [
        "Fondateurs qui ont besoin d’un seul partenaire technique, pas de cinq prestataires",
        "Opérateurs qui remplacent des tableurs et du SaaS de circonstance",
        "Équipes qui héritent d’un code et doivent le tenir correctement",
      ],
    },
    stack: ["Next.js", "React", "React Native", "Node.js", "Python", "PostgreSQL", "AWS"],
    faqs: {
      en: [
        {
          q: "What kind of software development does Station Eight Labs do?",
          a: "Custom software end to end: web applications, mobile apps, SaaS products, AI integrations, and the backend and cloud infrastructure underneath them. See the individual service pages for depth on each.",
        },
        {
          q: "Do you work with startups and established companies?",
          a: "Both. Startups usually need an MVP and a technical co-pilot; established companies usually need a system replaced or extended without breaking what already works. The engagement shape differs; the discipline does not.",
        },
        {
          q: "Where is Station Eight Labs based, and who do you serve?",
          a: "We work with clients across Europe and worldwide, in English and French. Get in touch and we will tell you plainly whether we are the right station for the work.",
        },
      ],
      fr: [
        {
          q: "Quel type de développement logiciel fait Station Eight Labs ?",
          a: "Du logiciel sur mesure de bout en bout : applications web, apps mobiles, produits SaaS, intégrations IA, ainsi que le backend et l’infrastructure cloud qui les soutiennent. Voir les pages de services individuelles pour le détail.",
        },
        {
          q: "Travaillez-vous avec des startups et des entreprises établies ?",
          a: "Les deux. Les startups ont généralement besoin d’un MVP et d’un copilote technique ; les entreprises établies ont besoin qu’un système soit remplacé ou étendu sans casser ce qui fonctionne déjà. La forme de la mission change ; la rigueur, non.",
        },
        {
          q: "Où est basée Station Eight Labs, et qui servez-vous ?",
          a: "Nous travaillons avec des clients en Europe et dans le monde entier, en anglais et en français. Contactez-nous et nous vous dirons franchement si nous sommes la bonne station pour le travail.",
        },
      ],
    },
    seoTitle: {
      en: "Software development company | Station Eight Labs",
      fr: "Entreprise de développement logiciel | Station Eight Labs",
    },
    seoDescription: {
      en: "Station Eight Labs is a software development company building custom software, web apps, mobile apps, SaaS platforms, and AI systems for clients worldwide.",
      fr: "Station Eight Labs est une entreprise de développement logiciel : logiciels sur mesure, apps web et mobiles, plateformes SaaS et systèmes d’IA, pour des clients dans le monde entier.",
    },
  },
  {
    slug: "saas-development",
    icon: "layers",
    title: { en: "SaaS development", fr: "Développement SaaS" },
    tagline: {
      en: "From first tenant to the architecture that survives the hundredth.",
      fr: "Du premier client à l’architecture qui tient au centième.",
    },
    description: {
      en: "Multi-tenant SaaS platforms — subscriptions, roles, and the operational screens behind them — built to grow without a rewrite.",
      fr: "Plateformes SaaS multi-tenant — abonnements, rôles et écrans opérationnels — conçues pour grandir sans réécriture.",
    },
    problem: {
      en: "Most SaaS MVPs are single-tenant apps wearing a pricing page. That works until customer two asks for something customer one already has configured differently. We design the tenant model before we design the UI.",
      fr: "La plupart des MVP SaaS sont des apps mono-tenant déguisées en page de tarifs. Cela tient jusqu’à ce que le deuxième client demande une configuration différente du premier. Nous concevons le modèle multi-tenant avant l’interface.",
    },
    whatWeBuild: {
      en: [
        "Multi-tenant architecture and data isolation",
        "Subscription billing and plan logic",
        "Role-based access and team accounts",
        "Onboarding flows and usage analytics",
        "Admin consoles for support and ops",
      ],
      fr: [
        "Architecture multi-tenant et isolation des données",
        "Facturation par abonnement et logique de plans",
        "Accès par rôles et comptes d’équipe",
        "Parcours d’onboarding et analytics d’usage",
        "Consoles d’administration pour le support et les ops",
      ],
    },
    whoFor: {
      en: [
        "Founders turning a service into a product",
        "SaaS teams past the prototype, before the platform rewrite",
        "Companies adding a self-serve tier to an existing tool",
      ],
      fr: [
        "Fondateurs qui transforment un service en produit",
        "Équipes SaaS après le prototype, avant la refonte plateforme",
        "Entreprises qui ajoutent un palier self-service à un outil existant",
      ],
    },
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    faqs: {
      en: [
        {
          q: "What makes SaaS development different from a normal web app?",
          a: "Multi-tenancy, billing, and role-based permissions from day one. Retrofitting them later usually means a rewrite; we design for them up front even in a small first release.",
        },
        {
          q: "Can you add a self-serve tier to our existing product?",
          a: "Often, yes — it depends on how the current data model handles, or does not handle, tenants. We audit before we promise.",
        },
        {
          q: "Do you build the billing and subscription logic too?",
          a: "Yes, typically with Stripe or a comparable provider — plans, metering, upgrades, downgrades, and the dunning flow customers actually see.",
        },
      ],
      fr: [
        {
          q: "En quoi le développement SaaS diffère-t-il d’une application web classique ?",
          a: "Multi-tenant, facturation et permissions par rôles dès le premier jour. Les ajouter plus tard revient souvent à tout réécrire ; nous les concevons en amont, même pour une petite première version.",
        },
        {
          q: "Pouvez-vous ajouter un palier self-service à notre produit existant ?",
          a: "Souvent, oui — cela dépend de la façon dont le modèle de données actuel gère, ou non, les tenants. Nous auditons avant de promettre.",
        },
        {
          q: "Développez-vous aussi la facturation et les abonnements ?",
          a: "Oui, généralement avec Stripe ou un prestataire équivalent — plans, mesure d’usage, montées et descentes de gamme, et le parcours de relance que voient réellement les clients.",
        },
      ],
    },
    seoTitle: {
      en: "SaaS development company | Multi-tenant platforms",
      fr: "Entreprise de développement SaaS | Plateformes multi-tenant",
    },
    seoDescription: {
      en: "Station Eight Labs builds multi-tenant SaaS platforms — subscriptions, roles, and admin tooling — designed to scale without a rewrite.",
      fr: "Station Eight Labs conçoit des plateformes SaaS multi-tenant — abonnements, rôles et outils d’administration — pensées pour grandir sans réécriture.",
    },
  },
  {
    slug: "ecommerce-development",
    icon: "shopping-bag",
    title: { en: "E-commerce development", fr: "Développement e-commerce" },
    tagline: {
      en: "Storefronts that load fast and checkouts that finish.",
      fr: "Des boutiques rapides et des paiements qui aboutissent.",
    },
    description: {
      en: "Custom storefronts, catalogs, and checkout systems — headless or platform-based — built around conversion and Core Web Vitals, not a theme.",
      fr: "Boutiques, catalogues et systèmes de paiement sur mesure — headless ou sur plateforme — pensés pour la conversion et les Core Web Vitals, pas pour un thème.",
    },
    problem: {
      en: "Template storefronts are fast to launch and slow to leave. When the catalog, promotions, or checkout logic outgrows the theme, most stores get patched instead of rebuilt — until the patches are the product. We build the catalog and checkout as software from the start.",
      fr: "Les boutiques sur templates se lancent vite et se quittent lentement. Quand le catalogue, les promotions ou le paiement dépassent le thème, la boutique est rapiécée au lieu d’être reconstruite — jusqu’à ce que les rapiéçages deviennent le produit. Nous construisons catalogue et paiement comme un vrai logiciel, dès le départ.",
    },
    whatWeBuild: {
      en: [
        "Headless storefronts and custom catalogs",
        "Cart, checkout, and payment integration",
        "Inventory, pricing, and promotion logic",
        "CMS-backed product and content pages",
        "Performance and Core Web Vitals tuning",
      ],
      fr: [
        "Boutiques headless et catalogues sur mesure",
        "Panier, paiement et intégrations",
        "Logique de stocks, tarifs et promotions",
        "Pages produits et contenus pilotées par CMS",
        "Optimisation performance et Core Web Vitals",
      ],
    },
    whoFor: {
      en: [
        "Brands outgrowing a templated storefront",
        "Operators with catalog or pricing rules no platform handles cleanly",
        "Companies merging a store with an existing product or app",
      ],
      fr: [
        "Marques qui dépassent une boutique sur template",
        "Opérateurs avec des règles de catalogue ou de tarifs qu’aucune plateforme ne gère proprement",
        "Entreprises qui fusionnent une boutique avec un produit ou une app existants",
      ],
    },
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe"],
    faqs: {
      en: [
        {
          q: "Do you build on Shopify or fully custom?",
          a: "Both, depending on the constraint. Shopify or a headless commerce platform when it genuinely fits; fully custom when the catalog or checkout logic is the product, not a bolt-on.",
        },
        {
          q: "Can you migrate an existing store without losing SEO?",
          a: "Yes — redirects, structured data, and URL structure are part of the migration plan, not an afterthought.",
        },
        {
          q: "Do you handle payments and tax or shipping logic?",
          a: "We integrate the providers, Stripe and others, and build the rules layer around them: pricing, promotions, shipping, and regional tax where it applies.",
        },
      ],
      fr: [
        {
          q: "Construisez-vous sur Shopify ou en full custom ?",
          a: "Les deux, selon la contrainte. Shopify ou une plateforme e-commerce headless quand cela convient réellement ; du sur-mesure complet quand le catalogue ou le paiement est le produit, pas un module ajouté.",
        },
        {
          q: "Pouvez-vous migrer une boutique existante sans perdre le SEO ?",
          a: "Oui — redirections, données structurées et structure d’URL font partie du plan de migration, pas un ajout de dernière minute.",
        },
        {
          q: "Gérez-vous les paiements et la logique de taxes ou de livraison ?",
          a: "Nous intégrons les prestataires, Stripe et d’autres, et construisons la couche de règles autour : tarifs, promotions, livraison et taxes régionales le cas échéant.",
        },
      ],
    },
    seoTitle: {
      en: "E-commerce development company | Storefronts & checkout",
      fr: "Entreprise de développement e-commerce | Boutiques et paiement",
    },
    seoDescription: {
      en: "Custom e-commerce development from Station Eight Labs — fast storefronts, custom checkout, and catalogs built to convert.",
      fr: "Développement e-commerce sur mesure par Station Eight Labs — boutiques rapides, paiement sur mesure et catalogues pensés pour convertir.",
    },
  },
  {
    slug: "ui-ux-design",
    icon: "panels-top-left",
    title: { en: "UI/UX design", fr: "Design UI/UX" },
    tagline: {
      en: "Interfaces designed for the work, not the portfolio.",
      fr: "Des interfaces pensées pour le travail, pas pour le portfolio.",
    },
    description: {
      en: "Product design and interface systems — research, flows, and design systems — built alongside the engineering, not handed off to it.",
      fr: "Design produit et systèmes d’interface — recherche, parcours et design systems — conçus avec l’ingénierie, pas transmis après coup.",
    },
    problem: {
      en: "Design handed off as static files loses half its meaning by the time it is built. We design inside the same team that ships, so the interface answers real states — empty, loading, error, edge case — not just the happy path in a mockup.",
      fr: "Un design transmis en fichiers statiques perd la moitié de son sens au moment de la construction. Nous concevons dans la même équipe qui livre, pour que l’interface réponde aux vrais états — vide, chargement, erreur, cas limite — pas seulement le chemin heureux de la maquette.",
    },
    whatWeBuild: {
      en: [
        "Product research and user flows",
        "Wireframes and high-fidelity UI",
        "Design systems and component libraries",
        "Accessibility and responsive design",
        "Prototype testing before the build",
      ],
      fr: [
        "Recherche produit et parcours utilisateurs",
        "Wireframes et UI haute-fidélité",
        "Design systems et bibliothèques de composants",
        "Accessibilité et design responsive",
        "Tests de prototypes avant construction",
      ],
    },
    whoFor: {
      en: [
        "Founders who need a credible first design, not a placeholder",
        "Products where the interface is the differentiator",
        "Teams retiring an interface nobody trusts anymore",
      ],
      fr: [
        "Fondateurs qui ont besoin d’un premier design crédible, pas d’un gabarit",
        "Produits où l’interface fait la différence",
        "Équipes qui retirent une interface en laquelle plus personne ne croit",
      ],
    },
    stack: ["Figma", "Next.js", "React", "Tailwind CSS"],
    faqs: {
      en: [
        {
          q: "Do you do design-only projects, or only design plus build?",
          a: "Both. Design-only engagements are common for teams with their own engineers; we design with the same rigor we would use if we were shipping it ourselves.",
        },
        {
          q: "Do you build a design system, or just screens?",
          a: "For anything beyond a single landing page, a small design system — tokens, components, states — pays for itself within a few screens.",
        },
        {
          q: "How do you handle accessibility?",
          a: "As a design requirement, not a QA afterthought: contrast, focus order, and keyboard paths are part of the review before anything ships.",
        },
      ],
      fr: [
        {
          q: "Faites-vous des projets de design seul, ou uniquement design plus développement ?",
          a: "Les deux. Les missions design seul sont courantes pour des équipes qui ont leurs propres développeurs ; nous concevons avec la même rigueur que si nous livrions nous-mêmes.",
        },
        {
          q: "Construisez-vous un design system, ou seulement des écrans ?",
          a: "Au-delà d’une simple landing page, un petit design system — tokens, composants, états — se rentabilise dès quelques écrans.",
        },
        {
          q: "Comment traitez-vous l’accessibilité ?",
          a: "Comme une exigence de design, pas un contrôle qualité après coup : contraste, ordre de focus et parcours clavier font partie de la revue avant toute livraison.",
        },
      ],
    },
    seoTitle: {
      en: "UI/UX design services | Product design",
      fr: "Services de design UI/UX | Design produit",
    },
    seoDescription: {
      en: "Product design and UI/UX from Station Eight Labs — research, flows, and design systems built alongside engineering.",
      fr: "Design produit et UI/UX par Station Eight Labs — recherche, parcours et design systems conçus avec l’ingénierie.",
    },
  },
  {
    slug: "api-development",
    icon: "workflow",
    title: { en: "API development", fr: "Développement d’API" },
    tagline: {
      en: "APIs treated as the product, not the plumbing.",
      fr: "Des API traitées comme le produit, pas comme la plomberie.",
    },
    description: {
      en: "REST and GraphQL APIs, integrations, and webhooks — documented, versioned, and built to be someone else's dependency.",
      fr: "API REST et GraphQL, intégrations et webhooks — documentés, versionnés, conçus pour devenir la dépendance de quelqu’un d’autre.",
    },
    problem: {
      en: "An API built as an afterthought behind a frontend eventually becomes the frontend's ceiling. We design the contract first — resources, auth, versioning — so the mobile app, the partner integration, and the dashboard you have not built yet can all stand on it.",
      fr: "Une API pensée après coup, derrière un frontend, finit par devenir son plafond. Nous concevons le contrat en premier — ressources, authentification, versionnage — pour que l’app mobile, l’intégration partenaire et le tableau de bord que vous n’avez pas encore construit puissent tous s’appuyer dessus.",
    },
    whatWeBuild: {
      en: [
        "REST and GraphQL API design",
        "Authentication and rate limiting",
        "Webhooks and third-party integrations",
        "API documentation and versioning",
        "Monitoring and uptime alerting",
      ],
      fr: [
        "Conception d’API REST et GraphQL",
        "Authentification et limitation de débit",
        "Webhooks et intégrations tierces",
        "Documentation et versionnage d’API",
        "Supervision et alertes de disponibilité",
      ],
    },
    whoFor: {
      en: [
        "Mobile teams that need a real API, not a shared database",
        "SaaS products opening a public or partner API",
        "Companies integrating multiple internal systems",
      ],
      fr: [
        "Équipes mobile qui ont besoin d’une vraie API, pas d’une base partagée",
        "Produits SaaS qui ouvrent une API publique ou partenaire",
        "Entreprises qui intègrent plusieurs systèmes internes",
      ],
    },
    stack: ["Node.js", "Python", "PostgreSQL", "GraphQL", "AWS"],
    faqs: {
      en: [
        {
          q: "REST or GraphQL — which do you recommend?",
          a: "It depends on the consumers. One mobile app and a dashboard usually favor REST for simplicity; many varied clients with different data needs often favor GraphQL. We size it to your actual consumers, not a trend.",
        },
        {
          q: "Can you build an API on top of our existing system?",
          a: "Usually yes — we design an API layer that fronts the existing data and logic, so you get a clean contract without a full backend rewrite.",
        },
        {
          q: "Do you handle API documentation and versioning?",
          a: "Yes — documented endpoints, a versioning strategy, and a deprecation path, so the API stays a stable dependency for whoever builds on it next.",
        },
      ],
      fr: [
        {
          q: "REST ou GraphQL — que recommandez-vous ?",
          a: "Cela dépend des consommateurs. Une app mobile et un tableau de bord favorisent souvent REST pour sa simplicité ; de nombreux clients variés aux besoins de données différents favorisent souvent GraphQL. Nous dimensionnons selon vos consommateurs réels, pas une tendance.",
        },
        {
          q: "Pouvez-vous construire une API au-dessus de notre système existant ?",
          a: "Généralement oui — nous concevons une couche API qui expose les données et la logique existantes, pour obtenir un contrat propre sans réécrire tout le backend.",
        },
        {
          q: "Gérez-vous la documentation et le versionnage de l’API ?",
          a: "Oui — endpoints documentés, stratégie de versionnage et parcours de dépréciation, pour que l’API reste une dépendance stable pour qui construira dessus ensuite.",
        },
      ],
    },
    seoTitle: {
      en: "API development services | REST & GraphQL",
      fr: "Services de développement d’API | REST et GraphQL",
    },
    seoDescription: {
      en: "Station Eight Labs designs and builds REST and GraphQL APIs, integrations, and webhooks built to be a stable dependency.",
      fr: "Station Eight Labs conçoit et développe des API REST et GraphQL, intégrations et webhooks, pensés comme une dépendance stable.",
    },
  },
];
