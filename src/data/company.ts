import type { IconName } from "@/components/site/icons";

type Item = { title: string; text: string; icon: IconName };

export const methodSteps = [
  {
    title: "Étude",
    text: "Visite du site, écoute de vos besoins et analyse technique des contraintes.",
  },
  {
    title: "Conception",
    text: "Choix des solutions, dimensionnement et proposition chiffrée détaillée.",
  },
  {
    title: "Installation",
    text: "Travaux réalisés par nos équipes qualifiées, selon un planning concerté.",
  },
  {
    title: "Mise en service",
    text: "Essais, réglages et remise des équipements avec explications.",
  },
  { title: "Maintenance", text: "Suivi préventif et correctif pour des performances durables." },
];

export const methodChapters = [
  {
    id: "etude",
    kicker: "Chapitre 01",
    title: "Étudier avant d'agir",
    text: "Tout commence par une visite. Nos techniciens relèvent l'existant, mesurent, écoutent vos équipes et identifient les contraintes du bâtiment. Ce diagnostic est la base d'une solution juste : ni surdimensionnée, ni fragile.",
    points: [
      "Relevé des installations existantes",
      "Bilan thermique et électrique",
      "Analyse des usages et des contraintes",
    ],
  },
  {
    id: "conception",
    kicker: "Chapitre 02",
    title: "Concevoir les réseaux",
    text: "Nous traduisons le diagnostic en un projet technique : tracé des réseaux, choix des équipements, dimensionnement. Vous recevez une proposition claire, détaillée et chiffrée, sans zone d'ombre.",
    points: [
      "Schémas et tracés des réseaux",
      "Sélection des équipements adaptés",
      "Proposition chiffrée détaillée",
    ],
  },
  {
    id: "installation",
    kicker: "Chapitre 03",
    title: "Installer et mettre en service",
    text: "Nos équipes réalisent les travaux selon un planning concerté, avec un chantier propre et organisé. Chaque installation est testée, réglée et mise en service avant d'être remise, explications à l'appui.",
    points: [
      "Planning adapté à votre activité",
      "Essais et réglages systématiques",
      "Remise des équipements et consignes",
    ],
  },
  {
    id: "maintenance",
    kicker: "Chapitre 04",
    title: "Maintenir dans la durée",
    text: "Une installation performante le reste grâce à un suivi rigoureux. Visites préventives, contrôles, interventions correctives prioritaires : nous veillons sur vos équipements et documentons chaque passage.",
    points: [
      "Visites préventives planifiées",
      "Interventions correctives prioritaires",
      "Rapport après chaque visite",
    ],
  },
  {
    id: "optimisation",
    kicker: "Chapitre 05",
    title: "Optimiser la performance",
    text: "Les données recueillies au fil des visites révèlent des marges de progrès : réglages, remplacements ciblés, récupération d'énergie. Nous vous proposons un plan d'optimisation pour consommer moins et durer plus.",
    points: [
      "Analyse des consommations",
      "Réglages et améliorations ciblées",
      "Plan d'optimisation énergétique",
    ],
  },
];

export const methodCommitments: Item[] = [
  {
    title: "Un interlocuteur identifié",
    text: "Un responsable technique suit votre dossier du premier appel à la maintenance.",
    icon: "users",
  },
  {
    title: "Des devis transparents",
    text: "Des propositions détaillées, poste par poste, sans coûts cachés.",
    icon: "file",
  },
  { title: "Des délais tenus", text: "Un planning annoncé, suivi et respecté.", icon: "calendar" },
  {
    title: "Des chantiers propres",
    text: "Zones protégées, nettoyage et respect de vos espaces.",
    icon: "sparkles",
  },
];

export const pillars: Item[] = [
  {
    title: "Expertise technique",
    text: "Cinq métiers maîtrisés par des techniciens qualifiés, sur toutes les technologies du marché.",
    icon: "award",
  },
  {
    title: "Réactivité",
    text: "Une prise en charge rapide et des interventions d'urgence assurées 7j/7.",
    icon: "timer",
  },
  {
    title: "Qualité & sécurité",
    text: "Des installations conformes aux règles de l'art, contrôlées avant chaque remise.",
    icon: "shield",
  },
  {
    title: "Matériel de qualité",
    text: "Des équipements de marques reconnues, choisis pour leur fiabilité et leur efficacité.",
    icon: "badge",
  },
];

export const values: Item[] = [
  {
    title: "Réactivité",
    text: "Une réponse rapide à chaque demande, parce qu'une panne n'attend pas.",
    icon: "timer",
  },
  {
    title: "Précision",
    text: "Des diagnostics rigoureux et des installations réalisées dans les règles de l'art.",
    icon: "target",
  },
  {
    title: "Satisfaction client",
    text: "Un travail jugé à l'aune de votre confort et de la continuité de votre activité.",
    icon: "heart",
  },
  {
    title: "Suivi rigoureux",
    text: "Chaque intervention tracée, chaque équipement suivi dans la durée.",
    icon: "clipboard",
  },
];

export const team: Item[] = [
  {
    title: "Techniciens qualifiés",
    text: "Frigoristes, techniciens CVC, électriciens et plombiers-chauffagistes formés et expérimentés.",
    icon: "hardhat",
  },
  {
    title: "Équipe multi-technique",
    text: "Des compétences complémentaires coordonnées pour traiter chaque installation dans sa globalité.",
    icon: "layers",
  },
  {
    title: "Intervention efficace",
    text: "Des équipes équipées et organisées pour intervenir vite et bien, du premier coup.",
    icon: "zap",
  },
];

export const timeline = [
  {
    title: "Étude",
    text: "Visite technique, relevés et analyse de vos besoins pour définir la solution adaptée.",
  },
  {
    title: "Installation",
    text: "Mise en œuvre par nos équipes, dans le respect du planning et de votre activité.",
  },
  {
    title: "Mise en service",
    text: "Essais, réglages et remise des équipements, avec les explications utiles à vos équipes.",
  },
  {
    title: "Maintenance",
    text: "Suivi préventif et correctif pour préserver les performances de vos installations.",
  },
];

export const heroIndicators = [
  { value: "1286+", label: "projets réalisés" },
  { value: "7j/7", label: "interventions d'urgence" },
  { value: "5", label: "métiers techniques" },
];

export const emergencyTips = [
  {
    trade: "Climatisation",
    icon: "wind" as IconName,
    breakdowns: ["Plus d'air froid", "Fuite d'eau sous l'unité", "Unité qui se met en sécurité"],
    tip: "Coupez l'appareil au disjoncteur s'il fuit ou émet une odeur de brûlé. Ne relancez pas plusieurs fois une unité en défaut.",
  },
  {
    trade: "Plomberie & Chauffage",
    icon: "droplet" as IconName,
    breakdowns: ["Fuite importante", "Plus d'eau chaude", "Chaudière en défaut"],
    tip: "Fermez la vanne d'arrêt générale ou celle de la zone concernée, coupez l'électricité si l'eau approche d'appareils électriques.",
  },
  {
    trade: "Froid & Cuisine",
    icon: "snowflake" as IconName,
    breakdowns: [
      "Chambre froide qui remonte en température",
      "Givre excessif",
      "Alarme de température",
    ],
    tip: "Gardez la porte fermée, notez la température affichée et transférez les produits les plus sensibles vers un autre équipement froid.",
  },
  {
    trade: "Électricité",
    icon: "zap" as IconName,
    breakdowns: ["Coupure générale", "Disjoncteur qui saute", "Odeur de brûlé au tableau"],
    tip: "Ne réarmez pas un disjoncteur qui retombe aussitôt. En cas d'odeur de brûlé ou de fumée, coupez le général si vous pouvez le faire sans risque.",
  },
];
