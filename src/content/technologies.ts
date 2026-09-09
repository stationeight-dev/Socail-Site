import type { CatalogItem } from "./types";

function tech(
  slug: string,
  icon: string,
  name: string,
  enTag: string,
  frTag: string,
  enWhy: string,
  frWhy: string,
  stack: string[],
): CatalogItem {
  return {
    slug,
    icon,
    title: { en: name, fr: name },
    tagline: { en: enTag, fr: frTag },
    description: { en: enTag, fr: frTag },
    problem: { en: enWhy, fr: frWhy },
    whatWeBuild: {
      en: [`Production ${name} systems`, "Architecture reviews", "Team enablement", "Handover you can hire against"],
      fr: [`Systèmes ${name} de production`, "Revues d’architecture", "Montée en compétence", "Passation exploitable pour recruter"],
    },
    whoFor: {
      en: ["Product teams choosing a stack", "Companies extending an existing repo", "Founders who want one opinionated path"],
      fr: ["Équipes produit qui choisissent une stack", "Entreprises qui prolongent un dépôt", "Fondateurs qui veulent un chemin tranché"],
    },
    stack,
    faqs: {
      en: [
        {
          q: `Is ${name} always the right choice?`,
          a: "No. We recommend it when it fits the product, the team, and the next three years — not because it is fashionable.",
        },
      ],
      fr: [
        {
          q: `${name} est-il toujours le bon choix ?`,
          a: "Non. Nous le recommandons quand il convient au produit, à l’équipe et aux trois prochaines années — pas à la mode.",
        },
      ],
    },
    seoTitle: {
      en: `${name} development company`,
      fr: `Développement ${name}`,
    },
    seoDescription: {
      en: `${enTag} Station Eight Labs ships production systems with ${name}.`,
      fr: `${frTag} Station Eight Labs livre des systèmes de production avec ${name}.`,
    },
  };
}

export const technologies: CatalogItem[] = [
  tech(
    "nextjs",
    "panels-top-left",
    "Next.js",
    "App Router, SEO, and server-first React.",
    "App Router, SEO et React côté serveur.",
    "Marketing sites and products that need to rank and stay fast belong on Next.js.",
    "Les sites et produits qui doivent se classer et rester rapides ont leur place sur Next.js.",
    ["Next.js", "React", "TypeScript"],
  ),
  tech(
    "react",
    "atom",
    "React",
    "Interfaces that stay maintainable as they grow.",
    "Des interfaces qui restent tenables en grandissant.",
    "When the UI is the product, React is still the safest long bet for web teams.",
    "Quand l’interface est le produit, React reste le pari durable pour les équipes web.",
    ["React", "TypeScript"],
  ),
  tech(
    "react-native",
    "smartphone",
    "React Native",
    "One team, two stores, native enough.",
    "Une équipe, deux stores, suffisamment natif.",
    "Startups and ops apps rarely need two fully native teams on day one.",
    "Les startups et apps métier ont rarement besoin de deux équipes natives dès le premier jour.",
    ["React Native", "TypeScript"],
  ),
  tech(
    "nodejs",
    "server",
    "Node.js",
    "APIs in the same language as the UI.",
    "Des APIs dans la langue de l’interface.",
    "A small lab moves faster when web and API share TypeScript, tooling, and people.",
    "Un petit laboratoire va plus vite quand le web et l’API partagent TypeScript, outillage et personnes.",
    ["Node.js", "TypeScript", "PostgreSQL"],
  ),
  tech(
    "python",
    "binary",
    "Python",
    "Data, AI, and the jobs that do not belong in the request path.",
    "Données, IA, et les tâches qui n’ont rien à faire dans la requête.",
    "Models, ETL, and scientific work still live most honestly in Python.",
    "Les modèles, l’ETL et le travail scientifique vivent encore le plus honnêtement en Python.",
    ["Python", "PostgreSQL", "AWS"],
  ),
  tech(
    "flutter",
    "layers",
    "Flutter",
    "When you want one UI toolkit across devices.",
    "Quand vous voulez une boîte à outils UI unique.",
    "Flutter is a strong path for branded, highly designed mobile — we use it when that is the job.",
    "Flutter est un bon chemin pour du mobile très design — nous l’utilisons quand c’est le brief.",
    ["Flutter", "Firebase"],
  ),
  tech(
    "postgresql",
    "database",
    "PostgreSQL",
    "A database you can still explain in five years.",
    "Une base que vous pourrez encore expliquer dans cinq ans.",
    "We default to Postgres unless there is a boring reason not to.",
    "Nous partons sur Postgres, sauf raison ennuyeuse de ne pas le faire.",
    ["PostgreSQL"],
  ),
  tech(
    "aws",
    "cloud",
    "AWS",
    "Accounts, networks, and deploys that a future hire can inherit.",
    "Comptes, réseaux et déploiements qu’un futur recrue pourra hériter.",
    "Cloud is not a logo on a slide. It is IAM, backups, and the 3 a.m. path.",
    "Le cloud n’est pas un logo. C’est l’IAM, les sauvegardes, et le chemin à 3 heures du matin.",
    ["AWS"],
  ),
];
