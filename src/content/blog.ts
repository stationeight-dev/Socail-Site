import type { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "why-station-eight",
    date: "2026-09-01",
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
    seoTitle: {
      en: "Why Station Eight Labs is named after Hut 8",
      fr: "Pourquoi Station Eight Labs s’inspire de Hut 8",
    },
    seoDescription: {
      en: "The name Station Eight Labs: Bletchley Park’s Hut 8, and the modern idea of a workspace where eight bits become a byte.",
      fr: "Le nom Station Eight Labs : Hut 8 à Bletchley Park, et l’idée moderne d’un espace où huit bits deviennent un octet.",
    },
  },
];
