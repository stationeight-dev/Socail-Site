import type { Localized } from "./types";

export type Author = {
  slug: string;
  name: string;
  role: Localized<string>;
  bio: Localized<string>;
  initials: string;
};

export const authors: Author[] = [
  {
    slug: "neeraj-singh",
    name: "Neeraj Singh",
    role: {
      en: "Founder & Full Stack Engineer",
      fr: "Fondateur et ingénieur full stack",
    },
    bio: {
      en: "Founder of Station Eight Labs. Six-plus years shipping full-stack, AI, and cloud systems across fintech, healthcare, and mobility.",
      fr: "Fondateur de Station Eight Labs. Plus de six ans à livrer des systèmes full stack, IA et cloud dans la fintech, la santé et la mobilité.",
    },
    initials: "NS",
  },
  {
    slug: "sahil-dangi",
    name: "Sahil Dangi",
    role: {
      en: "Engineering Lead",
      fr: "Responsable ingénierie",
    },
    bio: {
      en: "Leads delivery at Station Eight Labs, holding architecture and code quality steady from first commit to launch.",
      fr: "Pilote la livraison chez Station Eight Labs, en tenant l’architecture et la qualité du code du premier commit au lancement.",
    },
    initials: "SD",
  },
  {
    slug: "avinash-singh",
    name: "Avinash Singh",
    role: {
      en: "Product & Growth",
      fr: "Produit et croissance",
    },
    bio: {
      en: "Works the line between product and go-to-market at Station Eight Labs — scoping, positioning, and the occasional technical essay.",
      fr: "Travaille à la frontière entre produit et croissance chez Station Eight Labs — cadrage, positionnement, et parfois un essai technique.",
    },
    initials: "AS",
  },
];

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug) ?? authors[0];
}
