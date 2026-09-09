import type { Localized } from "./types";

export const processSteps: Array<{
  n: string;
  title: Localized<string>;
  body: Localized<string>;
}> = [
  {
    n: "01",
    title: { en: "Discovery", fr: "Découverte" },
    body: {
      en: "We sit with the problem: users, constraints, existing systems, and what “done” actually means.",
      fr: "Nous partons du problème : utilisateurs, contraintes, systèmes existants, et ce que « terminé » veut vraiment dire.",
    },
  },
  {
    n: "02",
    title: { en: "Strategy", fr: "Stratégie" },
    body: {
      en: "Architecture, scope, and a sequence that ships value before it ships theatre.",
      fr: "Architecture, périmètre et un ordre de livraison qui crée de la valeur avant le spectacle.",
    },
  },
  {
    n: "03",
    title: { en: "Design", fr: "Conception" },
    body: {
      en: "Interfaces and flows that are quiet, legible, and built for the people who will live in them.",
      fr: "Des interfaces et des parcours lisibles, calmes, pensés pour celles et ceux qui les utiliseront chaque jour.",
    },
  },
  {
    n: "04",
    title: { en: "Build", fr: "Construction" },
    body: {
      en: "Clean code, tests, and weekly visibility. You own everything we write.",
      fr: "Code propre, tests et visibilité hebdomadaire. Vous possédez tout ce que nous écrivons.",
    },
  },
  {
    n: "05",
    title: { en: "Launch", fr: "Lancement" },
    body: {
      en: "Deploy, observe, and harden. Stores, domains, analytics, and the boring details that keep nights quiet.",
      fr: "Déploiement, observation, durcissement. Stores, domaines, analytics, et les détails ennuyeux qui protègent vos nuits.",
    },
  },
  {
    n: "06",
    title: { en: "Hold", fr: "Tenue" },
    body: {
      en: "Maintenance, iteration, and productization when a custom system is ready to become a product.",
      fr: "Maintenance, itérations, et productisation lorsqu’un système sur mesure est prêt à devenir un produit.",
    },
  },
];
