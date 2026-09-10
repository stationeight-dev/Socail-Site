import type { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "why-station-eight",
    date: "2026-09-01",
    authorSlug: "neeraj-singh",
    title: {
      en: "Why Station Eight: a room, eight bits, one byte",
      fr: "Pourquoi Station Eight : une salle, huit bits, un octet",
    },
    excerpt: {
      en: "Hut 8 was where naval Enigma work happened. We took the posture, not the costume.",
      fr: "Hut 8 est la salle où se faisait le travail sur Enigma navale. Nous en prenons la posture, pas le costume.",
    },
    body: {
      en: [
        "Bletchley Park — Station X — was a campus of huts. Hut 8, led for a time by Alan Turing, worked the German naval Enigma problem: intercepts, probability, machines, and a great deal of unglamorous paper.",
        "We are not a museum, and we will not decorate this company with rotors. The useful inheritance is the idea of a station: a room with a job, staffed by people who can sit with difficulty until a pattern appears.",
        "The modern reading of the name is simpler. A station is a powerful workspace. Eight is the bits that become a byte — small, complete units that compose a system you can actually ship.",
        "That is how we try to work. Decode the constraint. Encode a product. Hold the line after launch. If you want theatre, there are louder agencies. If you want a lab, this is the door.",
      ],
      fr: [
        "Bletchley Park — Station X — était un campus de huttes. Hut 8, un temps dirigé par Alan Turing, travaillait Enigma navale : intercepts, probabilités, machines, et beaucoup de papier sans gloire.",
        "Nous ne sommes pas un musée, et nous n’ornerons pas cette entreprise de rotors. L’héritage utile est l’idée d’une station : une salle avec un métier, tenue par des gens capables de rester avec la difficulté jusqu’à ce qu’un motif apparaisse.",
        "La lecture moderne du nom est plus simple. Une station est un espace de travail puissant. Huit, ce sont les bits qui deviennent un octet — des unités petites et complètes qui composent un système que l’on peut vraiment livrer.",
        "C’est ainsi que nous essayons de travailler. Décoder la contrainte. Encoder un produit. Tenir la ligne après le lancement. Si vous voulez du théâtre, il existe des agences plus bruyantes. Si vous voulez un laboratoire, voici la porte.",
      ],
    },
    table: {
      caption: { en: "The name, decoded", fr: "Le nom, décodé" },
      headers: { en: ["Term", "What it names"], fr: ["Terme", "Ce qu'il désigne"] },
      rows: [
        { en: ["Station", "A room with a job — a workspace, not a stage."], fr: ["Station", "Une salle avec un métier — un espace de travail, pas une scène."] },
        { en: ["Eight", "The bits that compose one byte — small, complete units."], fr: ["Huit", "Les bits qui composent un octet — des unités petites et complètes."] },
        { en: ["Hut 8", "Bletchley Park's naval Enigma hut — the posture we keep, not the costume."], fr: ["Hut 8", "La hutte Enigma navale de Bletchley Park — la posture que nous gardons, pas le costume."] },
        { en: ["Byte", "What eight bits become when they hold together under load."], fr: ["Octet", "Ce que huit bits deviennent quand ils tiennent ensemble sous la charge."] },
      ],
    },
    seoTitle: {
      en: "Why Station Eight Labs is named after Hut 8",
      fr: "Pourquoi Station Eight Labs s’inspire de Hut 8",
    },
    seoDescription: {
      en: "The name Station Eight Labs: Bletchley Park’s Hut 8, and the modern idea of a workspace where eight bits become a byte.",
      fr: "Le nom Station Eight Labs : Hut 8 à Bletchley Park, et l’idée moderne d’un espace où huit bits deviennent un octet.",
    },
  },
  {
    slug: "custom-software-development-cost",
    date: "2026-05-04",
    authorSlug: "sahil-dangi",
    title: {
      en: "How Much Does Custom Software Development Cost?",
      fr: "Combien coûte un développement logiciel sur mesure ?",
    },
    excerpt: {
      en: "A practical breakdown of what drives price — scope, integrations, and the parts nobody quotes for.",
      fr: "Un décryptage pratique de ce qui fait varier le prix — périmètre, intégrations, et ce que personne ne chiffre au départ.",
    },
    body: {
      en: [
        "There is no single number for custom software, and anyone who gives you one before understanding your problem is quoting a template, not your project. What we can give you is the shape of the cost: scope defines the floor, integrations and data migration define the ceiling, and ongoing support defines what you pay after launch.",
        "A small internal tool — one workflow, a handful of screens, no third-party integrations — is a different project from a customer-facing platform with payments, multiple roles, and a mobile companion app. Expect a simple internal tool to run into the low tens of thousands; a fuller platform with integrations, admin tooling, and a real launch checklist moves into six figures. Anyone quoting a fixed number without a scoping call is guessing.",
        "The line items that actually move the price are rarely the ones people ask about first. Authentication and permissions, data migration from whatever spreadsheet or legacy system the business runs on today, third-party integrations — payments, calendars, accounting — and the admin screens nobody demos but everybody depends on: these routinely cost more than the customer-facing UI.",
        "Fixed-price and time-and-materials both work, for different situations. Fixed-price suits a tightly scoped first release where the requirements are genuinely settled. Time-and-materials suits anything still being discovered — which, honestly, is most first releases. We scope in a short discovery phase before committing to either, because a number produced before the scope exists is not an estimate; it is a hope.",
        "The cheapest software is the software that gets used. A slightly higher build cost that produces a tool your team actually adopts beats a bargain build that gets replaced by a spreadsheet within six months. Budget for the real scope, not the number that was easiest to say yes to.",
      ],
      fr: [
        "Il n’existe pas de prix unique pour un logiciel sur mesure, et quiconque vous en donne un avant de comprendre votre problème vous cite un modèle, pas votre projet. Ce que nous pouvons vous donner, c’est la forme du coût : le périmètre fixe le plancher, les intégrations et la migration de données fixent le plafond, et le support continu détermine ce que vous payez après le lancement.",
        "Un petit outil interne — un flux, quelques écrans, aucune intégration tierce — est un projet différent d’une plateforme destinée aux clients, avec paiements, plusieurs rôles et une application mobile compagnon. Comptez sur quelques dizaines de milliers d’euros pour un outil interne simple ; une plateforme plus complète, avec intégrations, outils d’administration et une vraie checklist de lancement, se chiffre à six chiffres. Quiconque annonce un montant fixe sans appel de cadrage devine.",
        "Les postes qui font réellement varier le prix sont rarement ceux dont on parle en premier. L’authentification et les permissions, la migration des données depuis le tableur ou le système existant de l’entreprise, les intégrations tierces — paiement, calendrier, comptabilité — et les écrans d’administration que personne ne montre en démo mais dont tout le monde dépend : coûtent régulièrement plus cher que l’interface visible par le client.",
        "Prix fixe et régie fonctionnent tous les deux, selon la situation. Le prix fixe convient à une première version au périmètre réellement arrêté. La régie convient à tout ce qui est encore en cours de découverte — ce qui, honnêtement, concerne la plupart des premières versions. Nous cadrons lors d’une courte phase de découverte avant de nous engager sur l’un ou l’autre, car un chiffre produit avant que le périmètre existe n’est pas une estimation ; c’est un espoir.",
        "Le logiciel le moins cher est celui qui est utilisé. Un coût de construction légèrement plus élevé qui produit un outil réellement adopté par votre équipe vaut mieux qu’une construction low-cost remplacée par un tableur au bout de six mois. Budgétez pour le périmètre réel, pas pour le chiffre le plus facile à accepter.",
      ],
    },
    table: {
      caption: { en: "Typical cost by project shape", fr: "Coût typique selon la forme du projet" },
      headers: { en: ["Project type", "Typical range", "Typical timeline"], fr: ["Type de projet", "Fourchette typique", "Délai typique"] },
      rows: [
        { en: ["Small internal tool", "€15k – €35k", "6–10 weeks"], fr: ["Petit outil interne", "15k – 35k €", "6 à 10 semaines"] },
        { en: ["Customer-facing platform", "€60k – €150k", "3–6 months"], fr: ["Plateforme destinée aux clients", "60k – 150k €", "3 à 6 mois"] },
        { en: ["Multi-integration enterprise system", "€150k+", "6–12+ months"], fr: ["Système d'entreprise multi-intégrations", "150k € et plus", "6 à 12 mois et plus"] },
      ],
    },
    stats: {
      caption: { en: "Where the budget actually goes (relative effort)", fr: "Où va réellement le budget (effort relatif)" },
      unit: "%",
      items: [
        { label: { en: "Customer-facing UI", fr: "Interface visible par le client" }, value: 25 },
        { label: { en: "Auth & permissions", fr: "Auth et permissions" }, value: 20 },
        { label: { en: "Integrations (payments, calendars, accounting)", fr: "Intégrations (paiement, calendrier, comptabilité)" }, value: 25 },
        { label: { en: "Data migration", fr: "Migration de données" }, value: 15 },
        { label: { en: "Admin & internal tooling", fr: "Admin et outillage interne" }, value: 15 },
      ],
    },
    seoTitle: {
      en: "How much does custom software development cost?",
      fr: "Combien coûte un développement logiciel sur mesure ?",
    },
    seoDescription: {
      en: "A practical guide to custom software development costs: what drives the price, what gets underquoted, and how to budget realistically.",
      fr: "Un guide pratique sur le coût du développement logiciel sur mesure : ce qui fait varier le prix, ce qui est sous-évalué, et comment budgétiser sereinement.",
    },
  },
  {
    slug: "custom-software-vs-off-the-shelf",
    date: "2026-05-18",
    authorSlug: "avinash-singh",
    title: {
      en: "Custom Software Development vs Off-the-Shelf Software",
      fr: "Logiciel sur mesure ou logiciel sur étagère",
    },
    excerpt: {
      en: "When a SaaS subscription is the right call, and when it is the thing quietly costing you the most.",
      fr: "Quand un abonnement SaaS est le bon choix, et quand il devient discrètement votre plus grosse dépense.",
    },
    body: {
      en: [
        "Off-the-shelf software wins by default, and it should — most problems are not unique enough to justify building a solution from scratch. Payroll, email, project tracking: buy them. The question worth asking is narrower than 'build or buy.' It is: where does our process actually differ from what the software assumes?",
        "The tell is usually a workaround. If your team keeps a shadow spreadsheet next to the SaaS tool, exports data to reshape it somewhere else, or has three people whose real job includes reconciling systems that were supposed to talk to each other, the off-the-shelf tool has stopped fitting. That workaround has a cost; it is just distributed across payroll instead of appearing as a single line item.",
        "Custom software makes sense when your process is the differentiator, not the software category. A clinic scheduling system, a logistics operation with unusual routing rules, a marketplace with a commission model no platform supports cleanly — these are cases where the workflow itself is part of the value, and bending it to fit generic software erodes that value.",
        "The honest downside of custom software is ownership. You are responsible for the roadmap, the security patches, and the person who understands the system when the original team moves on. That is a real cost, and it is why we build with your team owning the code, the infrastructure, and the accounts from day one — not as a courtesy, but because the alternative is a dependency you did not choose.",
        "In practice, most companies end up with both: off-the-shelf tools for what is genuinely generic, and a custom layer — sometimes small — for the process that actually makes them money. The mistake is not picking one side permanently; it is not revisiting the decision as the business changes shape.",
      ],
      fr: [
        "Le logiciel sur étagère gagne par défaut, et c’est normal — la plupart des problèmes ne sont pas assez spécifiques pour justifier de construire une solution depuis zéro. Paie, e-mail, suivi de projet : achetez-les. La question à se poser est plus étroite que « construire ou acheter ». C’est : où notre process diffère-t-il réellement de ce que suppose le logiciel ?",
        "Le signal est généralement un contournement. Si votre équipe garde un tableur parallèle à côté de l’outil SaaS, exporte des données pour les retravailler ailleurs, ou compte trois personnes dont le vrai travail consiste à réconcilier des systèmes censés se parler, l’outil sur étagère ne convient plus. Ce contournement a un coût ; il est simplement réparti dans la masse salariale plutôt que d’apparaître comme une ligne unique.",
        "Le sur-mesure a du sens quand votre process est le facteur différenciant, pas la catégorie du logiciel. Un système de rendez-vous pour une clinique, une logistique aux règles de tournées inhabituelles, une marketplace avec un modèle de commission qu’aucune plateforme ne gère proprement — ce sont des cas où le flux de travail fait partie de la valeur, et le plier pour rentrer dans un logiciel générique érode cette valeur.",
        "L’inconvénient honnête du sur-mesure, c’est la propriété. Vous êtes responsable de la feuille de route, des correctifs de sécurité, et de la personne qui comprend le système quand l’équipe d’origine est partie. C’est un coût réel, et c’est pourquoi nous construisons avec votre équipe propriétaire du code, de l’infrastructure et des comptes dès le premier jour — pas par courtoisie, mais parce que l’alternative est une dépendance que vous n’avez pas choisie.",
        "En pratique, la plupart des entreprises finissent par avoir les deux : des outils sur étagère pour ce qui est réellement générique, et une couche sur mesure — parfois petite — pour le process qui fait réellement gagner de l’argent. L’erreur n’est pas de choisir un camp définitivement ; c’est de ne pas revisiter la décision quand l’entreprise change de forme.",
      ],
    },
    table: {
      caption: { en: "Off-the-shelf vs custom, by dimension", fr: "Sur étagère contre sur mesure, par critère" },
      headers: { en: ["Dimension", "Off-the-shelf", "Custom"], fr: ["Critère", "Sur étagère", "Sur mesure"] },
      rows: [
        { en: ["Speed to launch", "Fast — days to weeks", "Slower — weeks to months"], fr: ["Vitesse de lancement", "Rapide — jours à semaines", "Plus lent — semaines à mois"] },
        { en: ["Upfront cost", "Low, subscription-based", "Higher, one-time build"], fr: ["Coût initial", "Faible, par abonnement", "Plus élevé, construction unique"] },
        { en: ["Fit to your process", "You adapt to it", "It adapts to you"], fr: ["Adéquation au process", "Vous vous adaptez à lui", "Il s'adapte à vous"] },
        { en: ["Ownership", "Vendor owns the roadmap", "You own the code and roadmap"], fr: ["Propriété", "Le prestataire possède la feuille de route", "Vous possédez le code et la feuille de route"] },
        { en: ["Cost over 3+ years", "Compounding subscription + workaround cost", "One build, then maintenance only"], fr: ["Coût sur 3 ans et plus", "Abonnement cumulé + coût des contournements", "Une construction, puis seulement la maintenance"] },
      ],
    },
    seoTitle: {
      en: "Custom software development vs off-the-shelf software",
      fr: "Logiciel sur mesure ou logiciel sur étagère",
    },
    seoDescription: {
      en: "How to decide between custom software development and off-the-shelf tools — the real signals, and the hidden cost of the wrong choice.",
      fr: "Comment choisir entre développement sur mesure et logiciel sur étagère — les vrais signaux, et le coût caché d’un mauvais choix.",
    },
  },
  {
    slug: "how-to-choose-a-software-development-company",
    date: "2026-06-01",
    authorSlug: "neeraj-singh",
    title: {
      en: "How to Choose a Software Development Company",
      fr: "Comment choisir une entreprise de développement logiciel",
    },
    excerpt: {
      en: "Past the portfolio and the pitch — the questions that actually predict whether a partner will hold.",
      fr: "Au-delà du portfolio et du pitch — les questions qui prédisent vraiment si un partenaire tiendra.",
    },
    body: {
      en: [
        "Portfolios show you the best day a company ever had. They tell you almost nothing about the average week — how a team communicates when a sprint slips, how they handle a requirement that changes after the estimate was signed, whether they will tell you a feature is a bad idea. Those are the questions worth asking before you look at another case study.",
        "Ask who actually owns the code, the repository, and the cloud accounts once the engagement ends. A company that keeps the keys is not a partner; it is a landlord. Ownership should be explicit in the contract, not a footnote you discover when you try to change providers.",
        "Ask how they scope work. A vague proposal that skips straight to a fixed price without a discovery phase is either underpricing risk or padding it heavily — neither is good for you. A short, paid discovery phase that produces a real scope document is a sign the estimate that follows is honest.",
        "Ask what happens after launch. Software is not finished at deployment; it degrades quietly — dependencies go stale, traffic patterns shift, a library gets a security advisory. A company with no answer for maintenance is planning to hand you a system and disappear. A retainer or a clear support agreement is the difference between a launch and a product.",
        "Finally, trust the conversation itself. A team that pushes back on a bad idea, asks about your actual constraint instead of your preferred technology, and gives you a straight answer about timeline risk is more likely to hold under pressure than one that agrees with everything in the sales call.",
      ],
      fr: [
        "Les portfolios montrent la meilleure journée qu’une entreprise ait jamais eue. Ils ne disent presque rien sur la semaine moyenne — comment une équipe communique quand un sprint dérape, comment elle gère une exigence qui change après la signature de l’estimation, si elle osera vous dire qu’une fonctionnalité est une mauvaise idée. Ce sont ces questions qui valent la peine d’être posées avant de regarder une nouvelle étude de cas.",
        "Demandez qui possède réellement le code, le dépôt et les comptes cloud une fois la mission terminée. Une entreprise qui garde les clés n’est pas un partenaire ; c’est un bailleur. La propriété doit être explicite dans le contrat, pas une note de bas de page que vous découvrez en essayant de changer de prestataire.",
        "Demandez comment elle cadre le travail. Une proposition vague qui saute directement à un prix fixe sans phase de découverte sous-évalue le risque, ou le surévalue largement — ni l’un ni l’autre n’est bon pour vous. Une courte phase de découverte payante, qui produit un vrai document de cadrage, est le signe que l’estimation qui suit est honnête.",
        "Demandez ce qui se passe après le lancement. Un logiciel n’est pas terminé au déploiement ; il se dégrade en silence — les dépendances vieillissent, les usages changent, une bibliothèque reçoit une alerte de sécurité. Une entreprise sans réponse sur la maintenance prévoit de vous livrer un système et de disparaître. Un contrat de suivi ou un accord de support clair fait la différence entre un lancement et un produit.",
        "Enfin, faites confiance à la conversation elle-même. Une équipe qui s’oppose à une mauvaise idée, s’intéresse à votre vraie contrainte plutôt qu’à sa technologie préférée, et vous donne une réponse franche sur les risques de délai, tiendra plus probablement sous pression qu’une équipe qui approuve tout pendant l’appel commercial.",
      ],
    },
    table: {
      caption: { en: "Questions worth asking, and what the answer tells you", fr: "Questions à poser, et ce que la réponse révèle" },
      headers: { en: ["Question", "Good answer", "Red flag"], fr: ["Question", "Bonne réponse", "Signal d'alarme"] },
      rows: [
        { en: ["Who owns the code and accounts after launch?", "\u201cYou do, from day one.\u201d", "Vague, or \u201cwe manage that for you.\u201d"], fr: ["Qui possède le code et les comptes après le lancement ?", "« Vous, dès le premier jour. »", "Vague, ou « nous gérons ça pour vous »."] },
        { en: ["How do you scope work?", "A short, paid discovery phase first", "A fixed price with no discovery call"], fr: ["Comment cadrez-vous le travail ?", "Une courte phase de découverte payante d'abord", "Un prix fixe sans appel de cadrage"] },
        { en: ["What happens after launch?", "A clear retainer or support agreement", "No answer, or \u201cwe'll figure it out.\u201d"], fr: ["Que se passe-t-il après le lancement ?", "Un contrat de suivi ou de support clair", "Pas de réponse, ou « on verra »."] },
      ],
    },
    seoTitle: {
      en: "How to choose a software development company",
      fr: "Comment choisir une entreprise de développement logiciel",
    },
    seoDescription: {
      en: "The questions that actually predict whether a software development partner will hold — ownership, scoping, and what happens after launch.",
      fr: "Les questions qui prédisent réellement si un partenaire de développement logiciel tiendra — propriété, cadrage, et l’après-lancement.",
    },
  },
  {
    slug: "saas-product-development-cost",
    date: "2026-06-15",
    authorSlug: "sahil-dangi",
    title: {
      en: "How Much Does It Cost to Build a SaaS Product?",
      fr: "Combien coûte la construction d’un produit SaaS ?",
    },
    excerpt: {
      en: "Multi-tenancy, billing, and the admin console nobody budgets for — where SaaS costs actually live.",
      fr: "Multi-tenant, facturation et console d’administration : là où le budget SaaS part réellement.",
    },
    body: {
      en: [
        "SaaS pricing questions usually arrive shaped like 'what does an MVP cost,' but the honest answer depends on a decision made before a single screen is designed: how much multi-tenancy do you need on day one? A single-tenant pilot for one early customer is a much smaller build than a platform ready to onboard the tenth customer without a database migration.",
        "Budget for four categories, not one: the customer-facing product, the billing and subscription logic, the admin console your own team will live in, and the infrastructure that keeps it all up. The first is the one everyone estimates. The other three are usually underestimated by half, and they do not shrink just because they are less visible in a demo.",
        "Billing in particular is more than 'connect Stripe.' Plans, proration, failed payments and dunning, upgrades and downgrades, and usage-based metering if your pricing needs it — this is a real subsystem, not an integration checkbox, and it is one of the few parts of a SaaS product customers will actually notice if it breaks.",
        "A lean but real first release — one core workflow, basic multi-tenancy, subscription billing, and a minimal admin console — typically lands in the same range as a solid custom software build, with the multi-tenant architecture as the main line item that a single-tenant app would not carry. Scope past that, and cost scales with the number of roles, integrations, and edge cases the pricing model creates.",
        "The version that keeps costs sane is the one that resists building for scale you do not have yet. Design the tenant model so it will not need a rewrite, then build the smallest real product on top of it. The architecture is worth getting right early; the feature list is not.",
      ],
      fr: [
        "Les questions de budget SaaS arrivent généralement formulées comme « combien coûte un MVP », mais la réponse honnête dépend d’une décision prise avant qu’un seul écran ne soit dessiné : de combien de multi-tenant avez-vous besoin dès le premier jour ? Un pilote mono-tenant pour un premier client est une construction bien plus petite qu’une plateforme prête à accueillir le dixième client sans migration de base de données.",
        "Budgétez quatre catégories, pas une seule : le produit visible par le client, la logique de facturation et d’abonnement, la console d’administration où vivra votre propre équipe, et l’infrastructure qui fait tourner l’ensemble. La première est celle que tout le monde estime. Les trois autres sont généralement sous-évaluées de moitié, et elles ne rétrécissent pas simplement parce qu’elles sont moins visibles en démo.",
        "La facturation, en particulier, dépasse largement « connecter Stripe ». Plans, proratisation, échecs de paiement et relances, montées et descentes de gamme, et mesure d’usage si votre tarification l’exige — c’est un vrai sous-système, pas une case à cocher d’intégration, et c’est l’une des rares parties d’un produit SaaS que les clients remarqueront réellement si elle casse.",
        "Une première version sobre mais réelle — un flux principal, un multi-tenant basique, une facturation par abonnement et une console d’administration minimale — se situe généralement dans la même fourchette qu’une bonne construction logicielle sur mesure, l’architecture multi-tenant étant le principal poste qu’une app mono-tenant ne porterait pas. Au-delà, le coût évolue avec le nombre de rôles, d’intégrations et de cas limites que crée le modèle de tarification.",
        "La version qui garde le coût raisonnable est celle qui résiste à l’envie de construire pour une échelle qu’on n’a pas encore. Concevez le modèle multi-tenant pour qu’il n’ait pas besoin d’être réécrit, puis construisez le plus petit produit réel par-dessus. L’architecture mérite d’être posée tôt ; la liste de fonctionnalités, non.",
      ],
    },
    table: {
      caption: { en: "The four budget categories", fr: "Les quatre catégories de budget" },
      headers: { en: ["Category", "Often quoted?", "Typical share of budget"], fr: ["Catégorie", "Souvent chiffrée ?", "Part typique du budget"] },
      rows: [
        { en: ["Customer-facing product", "Yes", "35%"], fr: ["Produit visible par le client", "Oui", "35 %"] },
        { en: ["Billing & subscription logic", "Rarely, in full", "20%"], fr: ["Facturation et abonnements", "Rarement, en totalité", "20 %"] },
        { en: ["Admin console", "Rarely", "20%"], fr: ["Console d'administration", "Rarement", "20 %"] },
        { en: ["Infrastructure & multi-tenancy", "Rarely", "25%"], fr: ["Infrastructure et multi-tenant", "Rarement", "25 %"] },
      ],
    },
    stats: {
      caption: { en: "Budget split on a lean first release", fr: "Répartition du budget sur une première version sobre" },
      unit: "%",
      items: [
        { label: { en: "Customer-facing product", fr: "Produit visible par le client" }, value: 35 },
        { label: { en: "Infrastructure & multi-tenancy", fr: "Infrastructure et multi-tenant" }, value: 25 },
        { label: { en: "Billing & subscriptions", fr: "Facturation et abonnements" }, value: 20 },
        { label: { en: "Admin console", fr: "Console d'administration" }, value: 20 },
      ],
    },
    seoTitle: {
      en: "How much does it cost to build a SaaS product?",
      fr: "Combien coûte la construction d’un produit SaaS ?",
    },
    seoDescription: {
      en: "A realistic breakdown of SaaS product costs: multi-tenancy, billing, admin tooling, and where budgets actually go.",
      fr: "Un aperçu réaliste du coût d’un produit SaaS : multi-tenant, facturation, outils d’administration, et où va réellement le budget.",
    },
  },
  {
    slug: "web-application-development-guide",
    date: "2026-06-29",
    authorSlug: "avinash-singh",
    title: {
      en: "Web Application Development: A Complete Guide",
      fr: "Développement d’applications web : le guide complet",
    },
    excerpt: {
      en: "The difference between a marketing site and a web app, and why the wrong choice slows both down.",
      fr: "La différence entre un site marketing et une application web, et pourquoi le mauvais choix ralentit les deux.",
    },
    body: {
      en: [
        "A marketing site and a web application are built to do different jobs, and treating them as the same project is where a lot of web development budgets go sideways. A marketing site exists to be found and to convert a visit into a lead. A web application exists to be used, repeatedly, by people who already decided to trust you. The architecture, the performance targets, and even the SEO strategy differ between the two.",
        "For the marketing side, the priorities are Core Web Vitals, clean semantic HTML, and content that can be indexed without JavaScript doing the heavy lifting — static or server-rendered pages, not a client-side app pretending to be a website. For the application side, the priorities shift toward state management, authentication, data consistency, and the parts of the interface that only make sense to someone who is logged in.",
        "Next.js and similar frameworks exist precisely because most real products need both halves in one codebase: public, indexable marketing pages sitting next to an authenticated application, sharing a design system but not sharing rendering strategy. Getting this split right at the architecture stage saves a rewrite later, when the marketing site needs to rank and the app needs to feel instant.",
        "A web application build typically moves through discovery and information architecture, then core workflows before visual polish, then authentication and data model, then the admin and edge cases that never make it into the pitch deck but absolutely make it into the support queue. Skipping the last one is the most common reason a launched app feels unfinished six weeks in.",
        "The test for whether a web application is actually done is not whether the happy path works in a demo. It is whether someone with a slow connection, an ad blocker, and a task they are annoyed about can still finish what they came to do. That is a lower bar to describe and a much higher bar to hit than most launches admit.",
      ],
      fr: [
        "Un site marketing et une application web remplissent des fonctions différentes, et les traiter comme un seul et même projet est souvent là que les budgets de développement web dérapent. Un site marketing existe pour être trouvé et transformer une visite en prospect. Une application web existe pour être utilisée, de façon répétée, par des personnes qui ont déjà décidé de vous faire confiance. L’architecture, les objectifs de performance et même la stratégie SEO diffèrent entre les deux.",
        "Côté marketing, les priorités sont les Core Web Vitals, un HTML sémantique propre, et un contenu indexable sans que le JavaScript ne fasse tout le travail — des pages statiques ou rendues côté serveur, pas une application côté client qui se fait passer pour un site web. Côté application, les priorités se déplacent vers la gestion d’état, l’authentification, la cohérence des données, et les parties de l’interface qui n’ont de sens que pour quelqu’un de connecté.",
        "Next.js et les frameworks similaires existent précisément parce que la plupart des produits réels ont besoin des deux moitiés dans une même base de code : des pages marketing publiques et indexables, à côté d’une application authentifiée, partageant un design system mais pas une stratégie de rendu. Bien poser cette séparation dès l’architecture évite une réécriture plus tard, quand le site marketing doit se classer et l’application doit sembler instantanée.",
        "La construction d’une application web passe généralement par la découverte et l’architecture de l’information, puis les flux principaux avant le polissage visuel, puis l’authentification et le modèle de données, puis l’administration et les cas limites qui n’apparaissent jamais dans le pitch deck mais qui atterrissent forcément dans la file de support. Sauter cette dernière étape est la raison la plus courante pour laquelle une app lancée paraît inachevée six semaines plus tard.",
        "Le test pour savoir si une application web est vraiment terminée n’est pas de vérifier si le chemin heureux fonctionne en démo. C’est de vérifier si quelqu’un avec une connexion lente, un bloqueur de publicités et une tâche qui l’agace peut quand même terminer ce pour quoi il est venu. C’est une barre plus basse à décrire, et bien plus haute à atteindre que ce que la plupart des lancements admettent.",
      ],
    },
    table: {
      caption: { en: "Marketing site vs web application", fr: "Site marketing contre application web" },
      headers: { en: ["Dimension", "Marketing site", "Web application"], fr: ["Critère", "Site marketing", "Application web"] },
      rows: [
        { en: ["Primary goal", "Get found, convert a visit", "Get used, repeatedly"], fr: ["Objectif principal", "Être trouvé, convertir une visite", "Être utilisé, de façon répétée"] },
        { en: ["Rendering priority", "Static / server-rendered", "Client state & interactivity"], fr: ["Priorité de rendu", "Statique / rendu serveur", "État client et interactivité"] },
        { en: ["SEO importance", "Critical", "Usually low, except public pages"], fr: ["Importance du SEO", "Critique", "Généralement faible, sauf pages publiques"] },
        { en: ["Core concern", "Core Web Vitals, content", "Auth, data consistency, state"], fr: ["Enjeu central", "Core Web Vitals, contenu", "Auth, cohérence des données, état"] },
      ],
    },
    seoTitle: {
      en: "Web application development: a complete guide",
      fr: "Développement d’applications web : le guide complet",
    },
    seoDescription: {
      en: "How web application development differs from a marketing site, and how to scope, architect, and ship one that actually holds.",
      fr: "En quoi le développement d’applications web diffère d’un site marketing, et comment le cadrer, l’architecturer et le livrer correctement.",
    },
  },
  {
    slug: "ai-powered-saas-application-guide",
    date: "2026-07-13",
    authorSlug: "neeraj-singh",
    title: {
      en: "How to Build an AI-Powered SaaS Application",
      fr: "Comment construire une application SaaS propulsée par l’IA",
    },
    excerpt: {
      en: "Where models actually earn their place in a product — and the guardrails that keep them trustworthy.",
      fr: "Là où les modèles trouvent vraiment leur place dans un produit — et les garde-fous qui les rendent fiables.",
    },
    body: {
      en: [
        "The gap between an AI demo and an AI feature customers trust is mostly about what happens when the model is wrong. A demo can afford a wrong answer; a product cannot, not without a visible fallback, a way to correct it, and a log that lets your team see what happened. Building 'with AI' means building that scaffolding first, the impressive part second.",
        "Start from the workflow, not the model. The useful question is not 'where can we add AI' but 'where does a person currently do repetitive judgment work that a model could draft, with a human confirming before anything ships.' Document classification, first-pass support replies, and structured data extraction from messy input are common answers; 'replace the whole workflow with a chat window' rarely is.",
        "Retrieval-augmented generation — grounding the model in your own data instead of its training alone — is usually the difference between a plausible-sounding answer and a correct one, especially for anything involving your product's specifics, your customers' history, or your company's policies. It adds real engineering: indexing, retrieval quality, and keeping the corpus current, but it is what makes an AI feature trustworthy enough to ship without a permanent disclaimer.",
        "Cost and latency are product decisions, not implementation details. A model call on every keystroke is a different cost profile than a background job that runs once. Decide early which interactions need to feel instant and which can run asynchronously, because retrofitting that decision after launch usually means restructuring the feature, not tuning it.",
        "The AI features that survive contact with real users are the boring-sounding ones: fewer clicks to finish a known task, a first draft instead of a blank page, an alert instead of a manual review queue. The chatbot demo gets the attention in the pitch; the quiet automation is usually what customers actually keep paying for.",
      ],
      fr: [
        "L’écart entre une démo d’IA et une fonctionnalité d’IA à laquelle les clients font confiance tient surtout à ce qui se passe quand le modèle se trompe. Une démo peut se permettre une mauvaise réponse ; un produit non, pas sans un repli visible, un moyen de corriger, et un journal qui permette à votre équipe de comprendre ce qui s’est passé. Construire « avec de l’IA » signifie construire cette structure d’abord, la partie impressionnante ensuite.",
        "Partez du flux de travail, pas du modèle. La bonne question n’est pas « où peut-on ajouter de l’IA » mais « où une personne fait-elle actuellement un travail de jugement répétitif qu’un modèle pourrait ébaucher, avec un humain qui confirme avant tout envoi ». La classification de documents, les premières réponses de support, l’extraction de données structurées depuis des entrées désordonnées sont des réponses fréquentes ; « remplacer tout le flux par une fenêtre de chat » l’est rarement.",
        "La génération augmentée par récupération — ancrer le modèle dans vos propres données plutôt que dans son seul entraînement — fait généralement la différence entre une réponse plausible et une réponse correcte, en particulier pour tout ce qui touche aux spécificités de votre produit, à l’historique de vos clients ou à vos politiques internes. Cela ajoute de l’ingénierie réelle — indexation, qualité de récupération, tenue à jour du corpus — mais c’est ce qui rend une fonctionnalité d’IA assez fiable pour être livrée sans avertissement permanent.",
        "Coût et latence sont des décisions produit, pas des détails d’implémentation. Un appel au modèle à chaque frappe n’a pas le même profil de coût qu’une tâche de fond exécutée une fois. Décidez tôt quelles interactions doivent sembler instantanées et lesquelles peuvent être asynchrones, car revenir sur cette décision après le lancement implique généralement de restructurer la fonctionnalité, pas de l’ajuster.",
        "Les fonctionnalités d’IA qui survivent au contact des vrais utilisateurs sont celles qui semblent ennuyeuses : moins de clics pour terminer une tâche connue, un premier jet plutôt qu’une page blanche, une alerte plutôt qu’une file de relecture manuelle. La démo de chatbot capte l’attention dans le pitch ; l’automatisation discrète est généralement ce pour quoi les clients continuent réellement de payer.",
      ],
    },
    table: {
      caption: { en: "Strong vs weak AI feature candidates", fr: "Bons et mauvais candidats pour une fonctionnalité IA" },
      headers: { en: ["Signal", "Strong candidate", "Weak candidate"], fr: ["Signal", "Bon candidat", "Mauvais candidat"] },
      rows: [
        { en: ["Task shape", "Repetitive judgment work with a human check", "Replace the whole workflow with chat"], fr: ["Forme de la tâche", "Travail de jugement répétitif, vérifié par un humain", "Remplacer tout le flux par un chat"] },
        { en: ["Data grounding", "Retrieval over your own corpus (RAG)", "Model's training data alone"], fr: ["Ancrage des données", "Récupération sur votre propre corpus (RAG)", "Seules les données d'entraînement du modèle"] },
        { en: ["Failure handling", "Visible fallback, correction path, logs", "No fallback if the model is wrong"], fr: ["Gestion des échecs", "Repli visible, correction possible, journaux", "Aucun repli si le modèle se trompe"] },
      ],
    },
    seoTitle: {
      en: "How to build an AI-powered SaaS application",
      fr: "Comment construire une application SaaS propulsée par l’IA",
    },
    seoDescription: {
      en: "A practical approach to building AI-powered SaaS features that customers trust: workflow-first design, RAG, and cost and latency tradeoffs.",
      fr: "Une approche pratique pour construire des fonctionnalités SaaS propulsées par l’IA et dignes de confiance : conception centrée sur le flux, RAG, coût et latence.",
    },
  },
  {
    slug: "react-vs-nextjs",
    date: "2026-07-27",
    authorSlug: "sahil-dangi",
    title: {
      en: "React vs Next.js for Modern Web Applications",
      fr: "React ou Next.js pour les applications web modernes",
    },
    excerpt: {
      en: "They are not competitors. Knowing which layer you are actually choosing saves a rewrite.",
      fr: "Ce ne sont pas des concurrents. Savoir ce que l’on choisit vraiment évite une réécriture.",
    },
    body: {
      en: [
        "The 'React vs Next.js' framing is a little misleading, because Next.js is built on React — the real choice is between plain React with your own tooling, or React inside a framework that makes routing, rendering, and data fetching decisions for you. Both are legitimate; they suit different situations.",
        "Plain React, assembled with your own bundler and routing library, makes sense for a tightly scoped internal tool, a component embedded in someone else's page, or a team with strong opinions about every layer of the stack and a good reason to hold them. What you gain in control, you pay for in setup and in decisions your team now owns that a framework would otherwise have made well by default.",
        "Next.js earns its place when SEO, initial load performance, or a mix of public and authenticated pages matters — which describes most commercial websites and a large share of web applications. Server-side rendering and static generation solve the problem of a JavaScript-heavy app being invisible to search engines and slow on a first visit, without you hand-rolling that infrastructure.",
        "The App Router's server components change the calculus further: components can run on the server by default, shipping less JavaScript to the browser and simplifying data fetching, with client components opted into explicitly where interactivity actually requires them. This is less a stylistic preference than a performance decision with real Core Web Vitals consequences.",
        "The practical answer for most teams starting something new that needs to be found, load fast, and eventually need both a marketing surface and an authenticated product: start with Next.js. Reach for plain React only when you have a specific reason the framework's opinions do not fit — and if you are not sure whether you have that reason, you probably do not.",
      ],
      fr: [
        "L’opposition « React contre Next.js » est un peu trompeuse, car Next.js est construit sur React — le vrai choix se situe entre React seul avec votre propre outillage, ou React à l’intérieur d’un framework qui prend pour vous les décisions de routage, de rendu et de récupération de données. Les deux sont légitimes ; ils conviennent à des situations différentes.",
        "React seul, assemblé avec votre propre bundler et votre propre bibliothèque de routage, a du sens pour un outil interne au périmètre restreint, un composant intégré dans la page de quelqu’un d’autre, ou une équipe avec des convictions fortes sur chaque couche de la stack et une bonne raison de les tenir. Ce que vous gagnez en contrôle, vous le payez en configuration et en décisions que votre équipe possède désormais, qu’un framework aurait autrement bien prises par défaut.",
        "Next.js trouve sa place quand le SEO, la performance au premier chargement, ou un mélange de pages publiques et authentifiées comptent — ce qui décrit la plupart des sites commerciaux et une large part des applications web. Le rendu côté serveur et la génération statique résolvent le problème d’une app riche en JavaScript invisible pour les moteurs de recherche et lente à la première visite, sans que vous ayez à construire cette infrastructure vous-même.",
        "Les server components de l’App Router changent encore la donne : les composants peuvent s’exécuter côté serveur par défaut, envoyant moins de JavaScript au navigateur et simplifiant la récupération de données, avec des composants client choisis explicitement là où l’interactivité l’exige réellement. C’est moins une préférence stylistique qu’une décision de performance aux conséquences réelles sur les Core Web Vitals.",
        "La réponse pratique pour la plupart des équipes qui démarrent un projet devant être trouvé, se charger vite, et avoir un jour à la fois une vitrine marketing et un produit authentifié : commencez avec Next.js. Ne passez à React seul que si vous avez une raison précise pour laquelle les choix du framework ne conviennent pas — et si vous n’êtes pas sûr d’avoir cette raison, c’est probablement que vous ne l’avez pas.",
      ],
    },
    table: {
      caption: { en: "Plain React vs Next.js", fr: "React seul contre Next.js" },
      headers: { en: ["Dimension", "Plain React", "Next.js"], fr: ["Critère", "React seul", "Next.js"] },
      rows: [
        { en: ["SEO / first load", "Needs manual setup", "Built in (SSR / static)"], fr: ["SEO / premier chargement", "Configuration manuelle nécessaire", "Intégré (SSR / statique)"] },
        { en: ["Routing & data fetching", "You choose and wire it", "Framework decides by default"], fr: ["Routage et récupération de données", "Vous choisissez et câblez", "Le framework décide par défaut"] },
        { en: ["Setup effort", "Higher", "Lower"], fr: ["Effort de configuration", "Plus élevé", "Plus faible"] },
        { en: ["Best fit", "Embedded widget, tightly scoped tool", "Public site + authenticated app in one codebase"], fr: ["Meilleur usage", "Widget intégré, outil au périmètre restreint", "Site public + app authentifiée dans une seule base"] },
      ],
    },
    seoTitle: {
      en: "React vs Next.js for modern web applications",
      fr: "React ou Next.js pour les applications web modernes",
    },
    seoDescription: {
      en: "React and Next.js are not competitors. A practical guide to which layer you are actually choosing, and when plain React still makes sense.",
      fr: "React et Next.js ne sont pas des concurrents. Un guide pratique sur le véritable choix, et les cas où React seul reste pertinent.",
    },
  },
  {
    slug: "mobile-app-development-cost",
    date: "2026-08-10",
    authorSlug: "avinash-singh",
    title: {
      en: "How Much Does It Cost to Build a Mobile App?",
      fr: "Combien coûte la construction d’une application mobile ?",
    },
    excerpt: {
      en: "React Native vs native, store review, and the backend that quietly doubles the estimate.",
      fr: "React Native contre natif, revue des stores, et le backend qui double discrètement l’estimation.",
    },
    body: {
      en: [
        "Mobile app estimates usually undercount because they price the app and forget the backend it needs to be useful. A to-do list app with no server can be genuinely cheap. An app with accounts, push notifications, payments, or anything shared across devices needs a real backend — and that backend is frequently a larger line item than the screens people actually see.",
        "React Native or Flutter versus fully native (Swift and Kotlin separately) is the first real cost fork. Cross-platform frameworks let one codebase cover iOS and Android, which typically costs less than building and maintaining two native codebases — unless the app leans heavily on platform-specific capabilities where native access still matters, like deep hardware integration or bleeding-edge OS features.",
        "Store submission is not a footnote. Apple's review process in particular can reject an app for reasons that have nothing to do with bugs — screenshots, metadata, privacy disclosures, or a login flow the reviewer could not get through. Budget time, not just development cost, for at least one review cycle, and design the account and payment flows with the store guidelines in mind from the start, not as a pre-launch fire drill.",
        "A simple app with no backend and a single platform can be a small build. A real product — accounts, a backend API, push notifications, offline handling, and both stores — moves into a range comparable to a solid custom software project, because that is functionally what it is: a mobile client on top of a real system. Treat the estimate for 'the app' and the estimate for 'the whole product' as two different numbers.",
        "The apps that stay cheap to run after launch are the ones designed with a maintenance plan from day one: an admin panel that does not require a developer to answer support tickets, analytics wired in before the first user, and a backend built to survive an OS update without a scramble. The build cost is the beginning of the bill, not the whole of it.",
      ],
      fr: [
        "Les estimations d’applications mobiles sous-évaluent souvent le coût parce qu’elles chiffrent l’app et oublient le backend dont elle a besoin pour être utile. Une app de liste de tâches sans serveur peut être réellement peu coûteuse. Une app avec des comptes, des notifications push, des paiements, ou quoi que ce soit de partagé entre appareils a besoin d’un vrai backend — et ce backend est souvent un poste plus important que les écrans que l’on voit réellement.",
        "React Native ou Flutter contre le natif complet (Swift et Kotlin séparément) est le premier vrai embranchement de coût. Les frameworks cross-platform permettent à une seule base de code de couvrir iOS et Android, ce qui coûte généralement moins cher que de construire et maintenir deux bases natives distinctes — sauf si l’app s’appuie fortement sur des capacités spécifiques à la plateforme, où l’accès natif reste nécessaire, comme une intégration matérielle poussée ou des fonctionnalités OS très récentes.",
        "La soumission aux stores n’est pas un détail. Le processus de revue d’Apple en particulier peut rejeter une app pour des raisons sans rapport avec des bugs — captures d’écran, métadonnées, déclarations de confidentialité, ou un parcours de connexion que le relecteur n’a pas pu franchir. Budgétez du temps, pas seulement du coût de développement, pour au moins un cycle de revue, et concevez les parcours de compte et de paiement en tenant compte des règles des stores dès le départ, pas comme un exercice de dernière minute avant lancement.",
        "Une app simple, sans backend, sur une seule plateforme, peut être une petite construction. Un vrai produit — comptes, API backend, notifications push, gestion hors-ligne et les deux stores — se rapproche d’une fourchette comparable à un bon projet de logiciel sur mesure, car c’est fonctionnellement ce que c’est : un client mobile au-dessus d’un vrai système. Traitez l’estimation « de l’app » et celle « du produit complet » comme deux chiffres différents.",
        "Les apps qui restent peu coûteuses à faire vivre après le lancement sont celles conçues avec un plan de maintenance dès le premier jour : un panneau d’administration qui ne nécessite pas un développeur pour répondre aux tickets de support, des analytics branchés avant le premier utilisateur, et un backend construit pour survivre à une mise à jour d’OS sans panique. Le coût de construction est le début de la facture, pas la totalité.",
      ],
    },
    table: {
      caption: { en: "Typical cost by app shape", fr: "Coût typique selon la forme de l'app" },
      headers: { en: ["App type", "Typical range", "Backend needed?"], fr: ["Type d'app", "Fourchette typique", "Backend nécessaire ?"] },
      rows: [
        { en: ["Simple, single-platform, no backend", "€8k – €20k", "No"], fr: ["Simple, une plateforme, sans backend", "8k – 20k €", "Non"] },
        { en: ["Cross-platform with accounts & push", "€40k – €90k", "Yes"], fr: ["Multi-plateforme avec comptes et push", "40k – 90k €", "Oui"] },
        { en: ["Full product: both stores, payments, offline", "€90k+", "Yes, real API"], fr: ["Produit complet : deux stores, paiements, hors-ligne", "90k € et plus", "Oui, vraie API"] },
      ],
    },
    stats: {
      caption: { en: "Where the budget actually goes", fr: "Où va réellement le budget" },
      unit: "%",
      items: [
        { label: { en: "Frontend screens", fr: "Écrans frontend" }, value: 30 },
        { label: { en: "Backend & API", fr: "Backend et API" }, value: 35 },
        { label: { en: "Push, offline, sync", fr: "Push, hors-ligne, synchro" }, value: 20 },
        { label: { en: "Store review & polish", fr: "Revue des stores et finitions" }, value: 15 },
      ],
    },
    seoTitle: {
      en: "How much does it cost to build a mobile app?",
      fr: "Combien coûte la construction d’une application mobile ?",
    },
    seoDescription: {
      en: "A realistic guide to mobile app development costs: React Native vs native, backend needs, store review, and what estimates usually miss.",
      fr: "Un guide réaliste sur le coût de développement d’une app mobile : React Native contre natif, besoins backend, revue des stores, et ce que les estimations oublient souvent.",
    },
  },
];
