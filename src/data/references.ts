import { images } from "@/config/images";
import type { ServiceSlug } from "@/data/services";

export type ReferenceCategory = "hotellerie" | "restauration";

export type Reference = {
  slug: string;
  name: string;
  category: ReferenceCategory;
  sectorLabel: string;
  sectorSlug: string;
  city: string;
  trades: ServiceSlug[];
  short: string;
  long: string[];
  image: string;
  imageAlt: string;
};

export const referenceCategories: { id: "all" | ReferenceCategory; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "hotellerie", label: "Hôtellerie" },
  { id: "restauration", label: "Restauration" },
];

export const references: Reference[] = [
  {
    slug: "la-mamounia",
    name: "La Mamounia",
    category: "hotellerie",
    sectorLabel: "Hôtellerie · Palace",
    sectorSlug: "hotellerie",
    city: "Marrakech",
    trades: ["climatisation", "plomberie-et-chauffage", "froid-cuisine-industrielle"],
    short:
      "Maintenance et optimisation des installations de climatisation et de production d'eau chaude.",
    long: [
      "Interventions techniques au sein d'un palace emblématique de Marrakech, où le confort des hôtes et la discrétion des équipes sont des exigences de chaque instant.",
      "Nos techniciens interviennent sur les équipements de climatisation, les réseaux d'eau chaude et les équipements frigorifiques, en coordination étroite avec les services techniques de l'établissement, pour préserver la continuité de service sans perturber l'expérience des clients.",
    ],
    image: images.sectors.hotellerie,
    imageAlt: "Techniciens Novare dans un patio d'hôtel de style marocain",
  },
  {
    slug: "mandarin-oriental",
    name: "Mandarin Oriental",
    category: "hotellerie",
    sectorLabel: "Hôtellerie · Palace",
    sectorSlug: "hotellerie",
    city: "Marrakech",
    trades: ["climatisation", "maintenance-multi-technique"],
    short:
      "Suivi technique et maintenance des systèmes de climatisation des villas et espaces communs.",
    long: [
      "Accompagnement technique d'un resort de prestige composé de villas et d'espaces de réception, où chaque équipement doit fonctionner de manière irréprochable.",
      "Novare intervient sur la maintenance préventive et corrective des installations de climatisation et apporte un appui multi-technique aux équipes en place, avec des interventions planifiées pour respecter la tranquillité des résidents.",
    ],
    image: images.trades.climatisation,
    imageAlt: "Technicien installant une cassette de climatisation dans un couloir d'hôtel",
  },
  {
    slug: "fairmont",
    name: "Fairmont",
    category: "hotellerie",
    sectorLabel: "Hôtellerie · Resort",
    sectorSlug: "hotellerie",
    city: "Marrakech",
    trades: ["climatisation", "electricite", "maintenance-multi-technique"],
    short:
      "Interventions multi-techniques sur les installations de climatisation et d'électricité.",
    long: [
      "Interventions dans un resort hôtelier aux installations techniques étendues, qui exigent une coordination rigoureuse entre les différents corps de métier.",
      "Nos équipes prennent en charge des travaux et des opérations de maintenance sur la climatisation et les installations électriques, avec un reporting précis à destination de la direction technique.",
    ],
    image: images.maintenanceHero,
    imageAlt: "Technicien en ronde de maintenance dans un local technique d'hôtel",
  },
  {
    slug: "hotel-es-saadi",
    name: "Hôtel Es Saadi",
    category: "hotellerie",
    sectorLabel: "Hôtellerie · Resort",
    sectorSlug: "hotellerie",
    city: "Marrakech",
    trades: ["plomberie-et-chauffage", "froid-cuisine-industrielle"],
    short: "Maintenance des réseaux de plomberie et des équipements de froid des cuisines.",
    long: [
      "Accompagnement d'un établissement hôtelier historique de Marrakech, dont les installations doivent concilier patrimoine bâti et exigences d'exploitation modernes.",
      "Novare intervient sur les réseaux de plomberie et de production d'eau chaude ainsi que sur les équipements frigorifiques des cuisines, avec une attention particulière à la continuité du service en restauration.",
    ],
    image: images.trades.plomberieChauffage,
    imageAlt: "Technicien réglant une vanne dans une chaufferie d'hôtel",
  },
  {
    slug: "mcdonalds",
    name: "McDonald's",
    category: "restauration",
    sectorLabel: "Restauration rapide",
    sectorSlug: "restauration-chr",
    city: "Marrakech",
    trades: ["froid-cuisine-industrielle", "climatisation", "electricite"],
    short:
      "Maintenance des équipements de froid, de climatisation et des installations électriques.",
    long: [
      "Interventions techniques dans des restaurants à très forte fréquentation, où chaque minute d'arrêt d'un équipement a un impact direct sur le service.",
      "Nos techniciens assurent la maintenance des équipements frigorifiques, de la climatisation des salles et des installations électriques, avec une réactivité adaptée aux contraintes de la restauration rapide.",
    ],
    image: images.sectors.restaurationChr,
    imageAlt: "Cuisine professionnelle d'un restaurant à forte fréquentation",
  },
  {
    slug: "anosta-orangeraie",
    name: "Anosta l'Orangeraie",
    category: "hotellerie",
    sectorLabel: "Hôtellerie · Résidence",
    sectorSlug: "hotellerie",
    city: "Marrakech",
    trades: ["climatisation", "plomberie-et-chauffage", "electricite"],
    short:
      "Installation et maintenance des équipements de climatisation, de plomberie et d'électricité.",
    long: [
      "Accompagnement technique d'un établissement d'hébergement au cadre verdoyant, attentif au confort de ses hôtes tout au long de l'année.",
      "Novare intervient sur les installations de climatisation, les réseaux de plomberie et l'électricité, de l'installation à la maintenance, avec un interlocuteur unique pour l'ensemble des métiers.",
    ],
    image: images.sectors.residentiel,
    imageAlt: "Techniciens entretenant un climatiseur mural dans un salon",
  },
];

export const getReference = (slug: string) => references.find((r) => r.slug === slug);

export const referencesBySlugs = (slugs: string[]) =>
  slugs.map((slug) => getReference(slug)).filter((r): r is Reference => Boolean(r));

export type Testimonial = { quote: string; role: string; establishment: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Avant l'été, Novare a révisé l'ensemble de nos unités de climatisation en planifiant les interventions chambre par chambre. Aucun client n'a été dérangé et nous n'avons eu aucune panne pendant la haute saison.",
    role: "Responsable technique",
    establishment: "Hôtel 5★, Marrakech",
  },
  {
    quote:
      "Notre chambre froide négative est tombée en panne un vendredi soir. Le technicien était sur place rapidement et le froid a été rétabli avant le service du lendemain. C'est exactement ce qu'on attend d'un prestataire.",
    role: "Chef exécutif",
    establishment: "Restaurant gastronomique, Guéliz",
  },
  {
    quote:
      "Le contrat de maintenance multi-technique nous a simplifié la vie : un seul interlocuteur, des rapports clairs après chaque visite et un budget enfin prévisible pour la copropriété.",
    role: "Gestionnaire de résidence",
    establishment: "Résidence privée, Marrakech",
  },
  {
    quote:
      "Leur diagnostic électrique a été très méthodique. Les travaux de mise en conformité ont été organisés par zones pour que nos équipes puissent continuer à travailler normalement.",
    role: "Directeur des opérations",
    establishment: "Site industriel, zone de Sidi Ghanem",
  },
];
