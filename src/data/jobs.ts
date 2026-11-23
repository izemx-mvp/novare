import type { IconName } from "@/components/site/icons";

export type Job = {
  slug: string;
  title: string;
  icon: IconName;
  type: string;
  summary: string;
  missions: string[];
  profile: string[];
};

export const jobs: Job[] = [
  {
    slug: "technicien-frigoriste",
    title: "Technicien frigoriste",
    icon: "snowflake",
    type: "CDI · Marrakech",
    summary:
      "Installation, mise en service et maintenance des chambres froides et équipements frigorifiques professionnels.",
    missions: [
      "Installer et mettre en service des chambres froides positives et négatives",
      "Réaliser la maintenance préventive des groupes et évaporateurs",
      "Diagnostiquer et dépanner les installations frigorifiques",
      "Rédiger les comptes rendus d'intervention",
    ],
    profile: [
      "Formation en froid et climatisation",
      "Maîtrise des circuits frigorifiques et des fluides",
      "Rigueur, autonomie et sens du service",
      "Permis B apprécié",
    ],
  },
  {
    slug: "technicien-cvc",
    title: "Technicien CVC",
    icon: "wind",
    type: "CDI · Marrakech",
    summary:
      "Intervention sur les systèmes de climatisation, ventilation et chauffage, du split au VRV.",
    missions: [
      "Installer des systèmes gainables, muraux, cassettes et VRV/VRF",
      "Mettre en service et régler les installations",
      "Assurer la maintenance préventive et corrective",
      "Conseiller les clients sur l'optimisation de leurs équipements",
    ],
    profile: [
      "Formation en génie climatique ou équivalent",
      "Expérience sur systèmes VRV/VRF appréciée",
      "Aisance relationnelle en environnement hôtelier",
      "Goût du travail bien fait",
    ],
  },
  {
    slug: "electricien",
    title: "Électricien",
    icon: "zap",
    type: "CDI · Marrakech",
    summary:
      "Réalisation et maintenance d'installations électriques basse tension en hôtellerie, tertiaire et industrie.",
    missions: [
      "Réaliser des installations basse tension et câbler des tableaux",
      "Rechercher et réparer les pannes électriques",
      "Participer aux travaux de mise en conformité",
      "Assurer la maintenance préventive des tableaux",
    ],
    profile: [
      "Formation en électricité bâtiment ou industrielle",
      "Lecture de schémas électriques",
      "Respect strict des règles de sécurité",
      "Esprit d'équipe",
    ],
  },
  {
    slug: "plombier-chauffagiste",
    title: "Plombier-chauffagiste",
    icon: "droplet",
    type: "CDI · Marrakech",
    summary:
      "Création, rénovation et dépannage des réseaux d'eau, du chauffage et de la production d'eau chaude.",
    missions: [
      "Réaliser des réseaux d'eau chaude et froide",
      "Installer et entretenir chaudières et ballons",
      "Intervenir sur les fuites et dépannages",
      "Équilibrer les réseaux et bouclages",
    ],
    profile: [
      "Formation en plomberie et chauffage",
      "Expérience en réseaux collectifs appréciée",
      "Réactivité et organisation",
      "Soin apporté aux finitions",
    ],
  },
  {
    slug: "technicien-maintenance-multi-technique",
    title: "Technicien de maintenance multi-technique",
    icon: "wrench",
    type: "CDI · Marrakech",
    summary:
      "Suivi des installations de nos clients sous contrat : climatisation, plomberie, froid et électricité.",
    missions: [
      "Réaliser les visites préventives planifiées",
      "Diagnostiquer et traiter les pannes de premier niveau",
      "Tenir à jour l'historique des équipements",
      "Être l'interlocuteur technique des clients sur site",
    ],
    profile: [
      "Polyvalence technique sur plusieurs métiers",
      "Capacité de diagnostic et d'analyse",
      "Sens du contact client",
      "Rigueur dans le reporting",
    ],
  },
];

export const joinReasons: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Des chantiers d'exception",
    text: "Palaces, grands hôtels, restaurants et sites industriels : des projets techniques variés et exigeants.",
    icon: "hotel",
  },
  {
    title: "Montée en compétences",
    text: "Accompagnement terrain, partage d'expérience et formation continue sur les nouvelles technologies.",
    icon: "sparkles",
  },
  {
    title: "Une équipe soudée",
    text: "Une organisation à taille humaine où chaque technicien compte et où l'entraide est la règle.",
    icon: "users",
  },
  {
    title: "Sécurité avant tout",
    text: "Équipements de protection, outillage professionnel et procédures claires sur chaque intervention.",
    icon: "shield",
  },
];
