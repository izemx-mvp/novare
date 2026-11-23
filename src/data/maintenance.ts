import type { IconName } from "@/components/site/icons";
import type { Faq, ServiceSlug } from "@/data/services";

export const maintenanceBenefits: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Moins de pannes",
    text: "Un préventif rigoureux détecte les défauts avant qu'ils ne provoquent un arrêt.",
    icon: "shield",
  },
  {
    title: "Coûts maîtrisés",
    text: "Un budget prévisible, sans dépenses d'urgence ni pièces commandées dans la précipitation.",
    icon: "gauge",
  },
  {
    title: "Intervention prioritaire",
    text: "Vos demandes passent en tête de planning, avec un délai d'intervention garanti.",
    icon: "timer",
  },
  {
    title: "Équipements durables",
    text: "Des installations entretenues qui conservent leurs performances plus longtemps.",
    icon: "refresh",
  },
];

export type CoverageGroup = { trade: ServiceSlug; label: string; items: string[] };

export const coverage: CoverageGroup[] = [
  {
    trade: "climatisation",
    label: "Climatisation",
    items: [
      "Nettoyage des filtres et échangeurs",
      "Contrôle des pressions et de la charge en fluide",
      "Vérification des condensats",
      "Test de la régulation et des thermostats",
      "Contrôle électrique des unités",
    ],
  },
  {
    trade: "plomberie-et-chauffage",
    label: "Plomberie & Chauffage",
    items: [
      "Contrôle des températures d'eau chaude",
      "Équilibrage du bouclage",
      "Détartrage des ballons",
      "Vérification des organes de sécurité",
      "Recherche de fuites",
    ],
  },
  {
    trade: "froid-cuisine-industrielle",
    label: "Froid & Cuisine",
    items: [
      "Relevé des températures et alarmes",
      "Nettoyage des condenseurs",
      "Contrôle des joints de porte",
      "Réglage des dégivrages",
      "Contrôle de l'étanchéité du circuit",
    ],
  },
  {
    trade: "electricite",
    label: "Électricité",
    items: [
      "Resserrage des connexions",
      "Test des différentiels",
      "Thermographie des tableaux",
      "Contrôle de l'éclairage de sécurité",
      "Vérification des protections",
    ],
  },
  {
    trade: "maintenance-multi-technique",
    label: "Multi-technique",
    items: [
      "Inventaire et historique des équipements",
      "Planning de visites coordonné",
      "Assistance technique aux équipes",
      "Rapports après chaque visite",
      "Recommandations d'optimisation",
    ],
  },
];

export type Formula = {
  id: "essentiel" | "confort" | "premium";
  name: string;
  tagline: string;
  idealFor: string;
  featured?: boolean;
  features: string[];
};

export const formulas: Formula[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Le socle préventif",
    idealFor: "Résidences, commerces et petits établissements",
    features: [
      "2 visites préventives par an",
      "Rapport après chaque visite",
      "Intervention prioritaire sous 48 h",
      "Assistance téléphonique aux heures ouvrées",
    ],
  },
  {
    id: "confort",
    name: "Confort",
    tagline: "Le suivi régulier",
    idealFor: "Restaurants, bureaux et hôtels de taille moyenne",
    featured: true,
    features: [
      "4 visites préventives par an",
      "Rapport détaillé et recommandations",
      "Intervention prioritaire sous 24 h",
      "Main-d'œuvre corrective incluse",
      "Interlocuteur technique dédié",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "La sérénité totale",
    idealFor: "Hôtels, palaces et sites critiques",
    features: [
      "Visites mensuelles",
      "Tableau de bord et bilan annuel",
      "Intervention prioritaire sous 4 h",
      "Astreinte 7j/7",
      "Main-d'œuvre corrective incluse",
      "Plan d'optimisation énergétique",
    ],
  },
];

export type ComparisonRow = { label: string; values: [string, string, string] };

export const comparison: ComparisonRow[] = [
  { label: "Fréquence des visites", values: ["Semestrielle", "Trimestrielle", "Mensuelle"] },
  { label: "Délai d'intervention prioritaire", values: ["48 h", "24 h", "4 h"] },
  {
    label: "Rapports",
    values: ["Rapport de visite", "Rapport + recommandations", "Tableau de bord + bilan annuel"],
  },
  { label: "Astreinte", values: ["Heures ouvrées", "6j/7", "7j/7"] },
  { label: "Main-d'œuvre corrective", values: ["Sur devis", "Incluse", "Incluse"] },
  { label: "Interlocuteur dédié", values: ["—", "Oui", "Oui"] },
  { label: "Optimisation énergétique", values: ["—", "Recommandations", "Plan d'action suivi"] },
];

export const maintenanceProcess = [
  {
    title: "Audit",
    text: "Inventaire de vos équipements, état des lieux et identification des points sensibles.",
  },
  { title: "Plan", text: "Fréquences, gammes d'intervention et priorités définies avec vous." },
  {
    title: "Visites préventives",
    text: "Contrôles, nettoyages et réglages selon le planning convenu.",
  },
  { title: "Correctif", text: "Prise en charge prioritaire des pannes, dans le délai garanti." },
  {
    title: "Rapport",
    text: "Compte rendu, historique et recommandations pour améliorer vos installations.",
  },
];

export const maintenanceFaqs: Faq[] = [
  {
    question: "Quelle est la durée d'un contrat de maintenance ?",
    answer:
      "Nos contrats sont généralement conclus pour un an, renouvelables. La première année permet d'établir un historique précis et d'ajuster les fréquences de visite.",
  },
  {
    question: "Peut-on combiner plusieurs métiers dans un même contrat ?",
    answer:
      "Oui, c'est même recommandé. Un contrat multi-technique couvre la climatisation, la plomberie, le froid et l'électricité avec un planning coordonné et un interlocuteur unique.",
  },
  {
    question: "Comment est fixé le prix d'un contrat ?",
    answer:
      "Le prix dépend du nombre et du type d'équipements, de la fréquence des visites et du niveau de service choisi. Après un audit gratuit, nous vous remettons une proposition détaillée.",
  },
  {
    question: "Que se passe-t-il en cas de panne entre deux visites ?",
    answer:
      "Vous nous contactez et votre demande est traitée en priorité, dans le délai prévu par votre formule. Selon la formule, la main-d'œuvre corrective est incluse.",
  },
  {
    question: "Puis-je changer de formule en cours de contrat ?",
    answer:
      "Oui. Le contrat évolue avec votre établissement : ajout d'équipements, changement de formule ou extension à d'autres métiers.",
  },
];
