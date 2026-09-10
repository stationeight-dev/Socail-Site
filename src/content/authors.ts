import type { Localized } from "./types";

export type Author = {
  slug: string;
  name: string;
  bio: Localized<string>;
  initials: string;
};

export const authors: Author[] = [
  {
    slug: "neeraj-singh",
    name: "Neeraj Singh",
    bio: {
      en: "Full-stack, AI, and cloud engineer at Station Eight Labs — six-plus years shipping systems across fintech, healthcare, and mobility.",
      fr: "Ingénieur full stack, IA et cloud chez Station Eight Labs — plus de six ans à livrer des systèmes dans la fintech, la santé et la mobilité.",
    },
    initials: "NS",
  },
  {
    slug: "sahil-dangi",
    name: "Sahil Dangi",
    bio: {
      en: "Works across architecture and delivery at Station Eight Labs, from first commit to launch.",
      fr: "Travaille sur l’architecture et la livraison chez Station Eight Labs, du premier commit au lancement.",
    },
    initials: "SD",
  },
  {
    slug: "avinash-singh",
    name: "Avinash Singh",
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
