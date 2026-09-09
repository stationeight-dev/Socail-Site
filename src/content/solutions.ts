import type { CatalogItem } from "./types";

function solution(
  slug: string,
  icon: string,
  en: string,
  fr: string,
  enTag: string,
  frTag: string,
  enProblem: string,
  frProblem: string,
): CatalogItem {
  return {
    slug,
    icon,
    title: { en, fr },
    tagline: { en: enTag, fr: frTag },
    description: { en: enTag, fr: frTag },
    problem: { en: enProblem, fr: frProblem },
    whatWeBuild: {
      en: ["Booking or intake", "Staff dashboard", "Payments or invoicing hooks", "Customer reminders", "Optional mobile app"],
      fr: ["Réservation ou admission", "Tableau de bord équipes", "Paiements ou facturation", "Rappels clients", "App mobile optionnelle"],
    },
    whoFor: {
      en: ["Independent operators", "Small groups with 2–20 sites", "Founders productizing a local trade"],
      fr: ["Indépendants", "Petits groupes de 2 à 20 sites", "Fondateurs qui productisent un métier local"],
    },
    stack: ["Next.js", "React Native", "PostgreSQL", "Stripe-ready"],
    faqs: {
      en: [
        {
          q: "Is this a boxed product or a custom build?",
          a: "Today: a custom build that can become a product. Our Products section is the waitlist for packaged editions.",
        },
        {
          q: "How fast can a first version go live?",
          a: "A focused first version is often 6–10 weeks if the workflow is clear.",
        },
      ],
      fr: [
        {
          q: "Produit boîte ou sur-mesure ?",
          a: "Aujourd’hui : un sur-mesure qui peut devenir produit. La rubrique Produits est la liste d’attente des éditions packagées.",
        },
        {
          q: "Délai pour une première version ?",
          a: "Une première version ciblée prend souvent 6 à 10 semaines si le flux est clair.",
        },
      ],
    },
    seoTitle: {
      en: `${en} software`,
      fr: `Logiciel ${fr.toLowerCase()}`,
    },
    seoDescription: {
      en: `${enTag} Custom software from Station Eight Labs for local and growing businesses.`,
      fr: `${frTag} Logiciels sur mesure par Station Eight Labs pour les entreprises locales et en croissance.`,
    },
  };
}

export const solutions: CatalogItem[] = [
  solution(
    "clinics",
    "stethoscope",
    "Clinic software",
    "Logiciel pour cliniques",
    "Appointments, records, and fewer phone-tag hours.",
    "Rendez-vous, dossiers, moins d’allers-retours téléphoniques.",
    "Front desks drown in calls, no-shows, and paper. The clinical work is not the bottleneck — the coordination is.",
    "L’accueil noie sous les appels, les absences et le papier. Ce n’est pas le soin qui bloque, c’est la coordination.",
  ),
  solution(
    "schools",
    "school",
    "School & institute software",
    "Logiciel pour écoles et instituts",
    "Admissions, attendance, parents, and fees in one place.",
    "Admissions, présence, parents et frais au même endroit.",
    "Institutes run on WhatsApp groups and spreadsheets until a term explodes. Then everyone wants a portal yesterday.",
    "Les instituts tournent sur des groupes WhatsApp et des tableurs jusqu’à l’explosion d’un trimestre.",
  ),
  solution(
    "gyms",
    "dumbbell",
    "Gym & studio software",
    "Logiciel pour salles et studios",
    "Memberships, classes, and the door that knows the member.",
    "Abonnements, cours, et une porte qui connaît le membre.",
    "Studios leak revenue in unpaid packs, no-shows, and trainers who cannot see the roster.",
    "Les studios perdent du revenu sur les packs impayés, les absences et des coachs sans planning lisible.",
  ),
  solution(
    "salons",
    "scissors",
    "Salon & spa software",
    "Logiciel pour salons et spas",
    "Chairs, staff, and repeat bookings.",
    "Fauteuils, équipes et rendez-vous qui reviennent.",
    "Walk-ins, commissions, and inventory of product sit in three notebooks. We put them in one console.",
    "Les passages, les commissions et le stock tiennent dans trois carnets. Nous les mettons dans une console.",
  ),
  solution(
    "restaurants",
    "utensils-crossed",
    "Restaurant software",
    "Logiciel pour restaurants",
    "Orders, floor, and a kitchen that is not guessing.",
    "Commandes, salle, et une cuisine qui ne devine plus.",
    "Hospitality software is often either a giant suite or a QR toy. We build the slice your room actually needs.",
    "Les logiciels CHR sont souvent une suite immense ou un jouet QR. Nous construisons la tranche dont votre salle a besoin.",
  ),
  solution(
    "retail-stores",
    "store",
    "Retail store software",
    "Logiciel pour commerces",
    "Stock, staff, and a catalog that matches the shelf.",
    "Stock, équipes, et un catalogue aligné sur le rayon.",
    "Offline retail still deserves a modern back office — without pretending you are Amazon.",
    "Le commerce physique mérite un back-office moderne — sans faire semblant d’être Amazon.",
  ),
  solution(
    "property",
    "key-round",
    "Property & PG software",
    "Logiciel immobilier et colocation",
    "Units, tenants, visits, and collections.",
    "Lots, locataires, visites et encaissements.",
    "Landlords and PG operators juggle beds, deposits, and maintenance on chat. That does not scale past a single building.",
    "Propriétaires et gestionnaires jonglent avec les lits, les cautions et la maintenance sur la messagerie.",
  ),
  solution(
    "field-services",
    "map-pinned",
    "Field service software",
    "Logiciel pour interventions",
    "Jobs, routes, and the technician’s phone.",
    "Interventions, tournées et le téléphone du technicien.",
    "Dispatch on a whiteboard dies the moment you have two crews. The phone in the van is the product.",
    "Le dispatch sur tableau blanc meurt dès qu’il y a deux équipes. Le téléphone dans l’utilitaire est le produit.",
  ),
];
