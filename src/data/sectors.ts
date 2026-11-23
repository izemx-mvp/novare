import { images } from "@/config/images";
import type { IconName } from "@/components/site/icons";
import type { Faq, ServiceSlug } from "@/data/services";

export type SectorSlug =
  "hotellerie" | "restauration-chr" | "residentiel" | "tertiaire-bureaux" | "industrie";

export type Sector = {
  slug: SectorSlug;
  path: string;
  name: string;
  short: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  intro: string;
  challenges: { title: string; text: string }[];
  solutions: ServiceSlug[];
  references: string[];
  faqs: Faq[];
  seoTitle: string;
  seoDescription: string;
};

export const sectors: Sector[] = [
  {
    slug: "hotellerie",
    path: "/fr/secteurs/hotellerie",
    name: "Hôtellerie",
    short: "Hôtels, palaces et resorts : un confort irréprochable, en continu.",
    icon: "hotel",
    image: images.sectors.hotellerie,
    imageAlt: "Hall d'un hôtel de luxe à Marrakech baigné de lumière",
    intro:
      "Dans un hôtel, les équipements techniques sont invisibles tant qu'ils fonctionnent. Novare accompagne les hôtels, palaces et resorts de Marrakech pour que la climatisation, l'eau chaude, le froid des cuisines et l'électricité restent à la hauteur de l'expérience promise à chaque client.",
    challenges: [
      {
        title: "Confort des chambres",
        text: "Température, silence et eau chaude disponibles à toute heure, dans chaque chambre.",
      },
      {
        title: "Continuité de service",
        text: "Aucune panne ne doit interrompre la restauration, le spa ou l'accueil.",
      },
      {
        title: "Interventions discrètes",
        text: "Des équipes qui travaillent sans déranger les clients, selon un planning concerté.",
      },
      {
        title: "Maîtrise énergétique",
        text: "Des consommations contrôlées sur des installations sollicitées toute l'année.",
      },
    ],
    solutions: [
      "climatisation",
      "plomberie-et-chauffage",
      "froid-cuisine-industrielle",
      "maintenance-multi-technique",
      "electricite",
    ],
    references: [
      "la-mamounia",
      "mandarin-oriental",
      "fairmont",
      "hotel-es-saadi",
      "anosta-orangeraie",
    ],
    faqs: [
      {
        question: "Pouvez-vous intervenir sans perturber nos clients ?",
        answer:
          "Oui. Nous planifions les interventions avec votre service technique et votre gouvernance : par étage, par aile ou aux heures creuses, avec des équipes formées aux exigences de l'hôtellerie haut de gamme.",
      },
      {
        question: "Proposez-vous une astreinte pour les hôtels ?",
        answer:
          "Oui, dans le cadre de nos contrats de maintenance. L'astreinte garantit une prise en charge rapide des pannes critiques, y compris le week-end.",
      },
      {
        question: "Intervenez-vous sur tous les équipements d'un hôtel ?",
        answer:
          "Climatisation, eau chaude, chauffage, plomberie, froid des cuisines et électricité : nos cinq métiers couvrent l'essentiel des équipements techniques d'un établissement hôtelier.",
      },
    ],
    seoTitle: "Maintenance technique pour hôtels à Marrakech",
    seoDescription:
      "Climatisation, eau chaude, froid de cuisine et électricité pour hôtels, palaces et resorts à Marrakech. Interventions discrètes et contrats de maintenance.",
  },
  {
    slug: "restauration-chr",
    path: "/fr/secteurs/restauration-chr",
    name: "Restauration & CHR",
    short: "Cuisines, froid et salles : la continuité de chaque service.",
    icon: "utensils",
    image: images.sectors.restaurationChr,
    imageAlt: "Cuisine professionnelle de restaurant en plein service",
    intro:
      "Restaurants, cafés, traiteurs et cuisines d'hôtels partagent une même exigence : que tout fonctionne au moment du coup de feu. Novare prend en charge le froid, les équipements de cuisine, la climatisation des salles et l'électricité, avec une réactivité pensée pour le rythme du CHR.",
    challenges: [
      {
        title: "Chaîne du froid",
        text: "Chambres froides et équipements frigorifiques tenus à température, en permanence.",
      },
      {
        title: "Équipements de cuisine",
        text: "Des outils de production fiables, raccordés et entretenus dans les règles.",
      },
      {
        title: "Confort des salles",
        text: "Une climatisation efficace et silencieuse pour les clients comme pour les équipes.",
      },
      {
        title: "Réactivité",
        text: "Des dépannages rapides pour éviter les pertes de marchandises et de chiffre d'affaires.",
      },
    ],
    solutions: [
      "froid-cuisine-industrielle",
      "climatisation",
      "electricite",
      "plomberie-et-chauffage",
      "maintenance-multi-technique",
    ],
    references: ["mcdonalds", "hotel-es-saadi", "la-mamounia"],
    faqs: [
      {
        question: "Intervenez-vous en urgence sur les chambres froides ?",
        answer:
          "Oui. Les pannes de froid font partie de nos interventions prioritaires. Appelez-nous directement pour une prise en charge rapide.",
      },
      {
        question: "Pouvez-vous équiper une cuisine professionnelle complète ?",
        answer:
          "Oui : froid, raccordements des équipements de cuisson et de laverie, réseaux d'eau et électricité, coordonnés par une seule équipe.",
      },
      {
        question: "Proposez-vous des contrats pour plusieurs restaurants ?",
        answer:
          "Oui. Nous pouvons regrouper plusieurs établissements dans un même contrat, avec un planning de visites et un reporting par site.",
      },
    ],
    seoTitle: "Froid, cuisine et climatisation pour restaurants à Marrakech",
    seoDescription:
      "Chambres froides, cuisines professionnelles, climatisation et électricité pour restaurants, cafés et CHR à Marrakech. Dépannage rapide et maintenance.",
  },
  {
    slug: "residentiel",
    path: "/fr/secteurs/residentiel",
    name: "Résidentiel",
    short: "Villas, riads et résidences : un confort durable au quotidien.",
    icon: "home",
    image: images.sectors.residentiel,
    imageAlt: "Villa contemporaine avec piscine dans la palmeraie de Marrakech",
    intro:
      "Villas, riads, résidences et copropriétés : Novare installe et entretient les équipements qui font le confort du quotidien. Climatisation discrète, eau chaude fiable, électricité sûre, avec un suivi qui préserve la valeur de votre bien.",
    challenges: [
      {
        title: "Confort en toute saison",
        text: "Rafraîchir l'été, chauffer l'hiver, avec des équipements silencieux.",
      },
      {
        title: "Esthétique & discrétion",
        text: "Des installations intégrées à l'architecture, y compris dans les riads.",
      },
      { title: "Fiabilité des réseaux", text: "Eau chaude, pression et étanchéité contrôlées." },
      {
        title: "Entretien simplifié",
        text: "Un interlocuteur unique pour l'ensemble des équipements.",
      },
    ],
    solutions: [
      "climatisation",
      "plomberie-et-chauffage",
      "electricite",
      "maintenance-multi-technique",
    ],
    references: ["anosta-orangeraie"],
    faqs: [
      {
        question: "Intervenez-vous chez les particuliers ?",
        answer:
          "Oui, pour les villas, riads et appartements, en installation comme en maintenance.",
      },
      {
        question: "Pouvez-vous intégrer la climatisation dans un riad ?",
        answer:
          "Oui. Nous privilégions des solutions discrètes, comme le gainable ou les unités encastrées, adaptées aux contraintes architecturales des riads.",
      },
      {
        question: "Gérez-vous l'entretien des parties communes d'une résidence ?",
        answer:
          "Oui, dans le cadre d'un contrat de maintenance multi-technique couvrant les équipements collectifs.",
      },
    ],
    seoTitle: "Climatisation et plomberie pour villas et résidences à Marrakech",
    seoDescription:
      "Climatisation, plomberie, chauffage, eau chaude et électricité pour villas, riads et résidences à Marrakech. Installation et maintenance.",
  },
  {
    slug: "tertiaire-bureaux",
    path: "/fr/secteurs/tertiaire-bureaux",
    name: "Tertiaire & Bureaux",
    short: "Des espaces de travail confortables et des équipements suivis.",
    icon: "briefcase",
    image: images.sectors.tertiaireBureaux,
    imageAlt: "Plateau de bureaux lumineux et climatisé",
    intro:
      "Bureaux, plateaux, commerces et showrooms : le confort des espaces de travail influence directement la productivité et l'image de votre entreprise. Novare installe et maintient vos équipements avec une organisation adaptée aux horaires de vos équipes.",
    challenges: [
      {
        title: "Qualité de l'air & confort",
        text: "Températures homogènes et renouvellement d'air maîtrisé.",
      },
      {
        title: "Continuité d'activité",
        text: "Des interventions planifiées hors des heures de bureau si nécessaire.",
      },
      {
        title: "Électricité fiable",
        text: "Des installations dimensionnées pour les équipements informatiques.",
      },
      {
        title: "Coûts maîtrisés",
        text: "Une maintenance préventive qui évite les dépenses imprévues.",
      },
    ],
    solutions: [
      "climatisation",
      "electricite",
      "maintenance-multi-technique",
      "plomberie-et-chauffage",
    ],
    references: ["fairmont"],
    faqs: [
      {
        question: "Pouvez-vous intervenir en dehors des heures de bureau ?",
        answer:
          "Oui. Nous planifions les interventions lourdes en soirée ou le samedi pour ne pas perturber vos équipes.",
      },
      {
        question: "Intervenez-vous sur des plateaux de bureaux à aménager ?",
        answer:
          "Oui. Nous adaptons la climatisation, l'éclairage et la distribution électrique lors des aménagements ou réaménagements d'espaces.",
      },
      {
        question: "Proposez-vous un suivi annuel des équipements ?",
        answer:
          "Oui, avec un contrat de maintenance définissant les visites, les délais d'intervention et les rapports.",
      },
    ],
    seoTitle: "Maintenance technique pour bureaux et tertiaire à Marrakech",
    seoDescription:
      "Climatisation, électricité et maintenance multi-technique pour bureaux, commerces et showrooms à Marrakech.",
  },
  {
    slug: "industrie",
    path: "/fr/secteurs/industrie",
    name: "Industrie",
    short: "Disponibilité des utilités et des équipements de production.",
    icon: "factory",
    image: images.sectors.industrie,
    imageAlt: "Atelier industriel avec réseaux techniques apparents",
    intro:
      "Sur un site industriel, la disponibilité des utilités conditionne la production. Novare accompagne les entreprises de la région de Marrakech sur le froid, la climatisation des locaux techniques, l'électricité et la maintenance des installations.",
    challenges: [
      { title: "Disponibilité", text: "Limiter les arrêts de production liés aux utilités." },
      {
        title: "Ambiances contrôlées",
        text: "Températures maîtrisées pour process, stockage et locaux techniques.",
      },
      {
        title: "Puissance électrique",
        text: "Distribution, armoires et protections adaptées aux machines.",
      },
      { title: "Maintenance planifiée", text: "Un préventif calé sur vos cycles de production." },
    ],
    solutions: [
      "froid-cuisine-industrielle",
      "electricite",
      "climatisation",
      "maintenance-multi-technique",
      "plomberie-et-chauffage",
    ],
    references: ["mcdonalds"],
    faqs: [
      {
        question: "Intervenez-vous sur des sites en production ?",
        answer:
          "Oui. Nous organisons les interventions selon vos cycles de production et vos consignes de sécurité.",
      },
      {
        question: "Pouvez-vous climatiser des locaux techniques ou salles serveurs ?",
        answer:
          "Oui, avec des solutions dimensionnées pour un fonctionnement continu et, si nécessaire, redondantes.",
      },
      {
        question: "Réalisez-vous des armoires électriques sur mesure ?",
        answer:
          "Oui : conception, câblage, modification et maintenance d'armoires de distribution et de commande.",
      },
    ],
    seoTitle: "Froid, électricité et maintenance industrielle à Marrakech",
    seoDescription:
      "Froid industriel, climatisation des locaux techniques, électricité et maintenance multi-technique pour sites industriels à Marrakech.",
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
