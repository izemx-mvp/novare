import { images } from "@/config/images";
import type { IconName } from "@/components/site/icons";

export type ServiceSlug =
  | "climatisation"
  | "plomberie-et-chauffage"
  | "froid-cuisine-industrielle"
  | "maintenance-multi-technique"
  | "electricite";

export type Faq = { question: string; answer: string };
export type Item = { title: string; text: string; icon: IconName };
export type Step = { title: string; text: string };

export type Service = {
  slug: ServiceSlug;
  path: string;
  name: string;
  shortName: string;
  /** One-liner for menus and cards. */
  short: string;
  /** Hero pitch. */
  pitch: string;
  description: string[];
  icon: IconName;
  image: string;
  imageAlt: string;
  highlights: string[];
  subServices: Item[];
  process: Step[];
  clients: Item[];
  commitments: Item[];
  faqs: Faq[];
  relatedReferences: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "climatisation",
    path: "/fr/climatisation",
    name: "Climatisation",
    shortName: "Climatisation",
    short: "Gainable, VRV/VRF, PAC et eau glacée : le confort thermique maîtrisé.",
    pitch:
      "Étude, installation, mise en service et maintenance de vos systèmes de climatisation, du split mural au groupe d'eau glacée, pour un confort constant et une consommation maîtrisée.",
    description: [
      "Sous le climat de Marrakech, la climatisation n'est pas un confort accessoire : c'est un équipement critique pour vos clients, vos équipes et vos marchandises. Novare conçoit et entretient des installations dimensionnées au plus juste, adaptées à l'usage réel de chaque espace.",
      "Nos techniciens interviennent sur l'ensemble des technologies du marché, en installation neuve comme en rénovation, avec une attention constante portée à l'efficacité énergétique, au niveau sonore et à la durabilité des équipements.",
    ],
    icon: "wind",
    image: images.trades.climatisation,
    imageAlt:
      "Technicien Novare contrôlant une unité de climatisation sur une terrasse technique à Marrakech",
    highlights: ["Gainable & VRV/VRF", "Pompes à chaleur", "Groupes d'eau glacée"],
    subServices: [
      {
        title: "Climatisation gainable",
        text: "Diffusion discrète par plénums et bouches, idéale pour les chambres, suites et bureaux exigeants.",
        icon: "airVent",
      },
      {
        title: "Murale & cassette",
        text: "Solutions rapides à déployer pour commerces, salles de réunion et espaces de vie.",
        icon: "fan",
      },
      {
        title: "Systèmes VRV / VRF",
        text: "Débit de réfrigérant variable pour piloter finement de nombreuses zones avec un seul réseau.",
        icon: "layers",
      },
      {
        title: "PAC air-air & air-eau",
        text: "Chauffage et rafraîchissement réversibles, avec un rendement élevé toute l'année.",
        icon: "thermometer",
      },
      {
        title: "Groupes d'eau glacée",
        text: "Production centralisée pour hôtels et grands sites, avec réseaux hydrauliques et ventilo-convecteurs.",
        icon: "snowflake",
      },
      {
        title: "Optimisation énergétique",
        text: "Réglages, régulation et remplacement ciblé pour réduire la consommation sans perdre en confort.",
        icon: "leaf",
      },
    ],
    process: [
      {
        title: "Étude technique",
        text: "Bilan thermique, relevé des contraintes du bâtiment et choix de la technologie adaptée.",
      },
      {
        title: "Installation",
        text: "Pose soignée des unités, réseaux frigorifiques, condensats et alimentation électrique.",
      },
      {
        title: "Mise en service",
        text: "Tirage au vide, charge, contrôle des pressions et réglage de la régulation.",
      },
      {
        title: "Maintenance",
        text: "Visites préventives, nettoyage des échangeurs et interventions correctives rapides.",
      },
      {
        title: "Optimisation",
        text: "Suivi des performances et recommandations pour réduire les consommations.",
      },
    ],
    clients: [
      {
        title: "Hôtels & palaces",
        text: "Confort silencieux des chambres et maîtrise des grands volumes.",
        icon: "hotel",
      },
      {
        title: "Professionnels",
        text: "Bureaux, commerces et showrooms climatisés toute l'année.",
        icon: "briefcase",
      },
      {
        title: "Résidences",
        text: "Villas et résidences équipées de solutions discrètes et durables.",
        icon: "home",
      },
      {
        title: "Industrie",
        text: "Ambiances contrôlées pour process, stockage et locaux techniques.",
        icon: "factory",
      },
    ],
    commitments: [
      {
        title: "Confort thermique",
        text: "Températures stables et diffusion homogène, sans courant d'air.",
        icon: "thermometer",
      },
      {
        title: "Efficacité énergétique",
        text: "Des équipements réglés pour consommer juste ce qu'il faut.",
        icon: "leaf",
      },
      {
        title: "Fiabilité",
        text: "Des installations conformes aux règles de l'art et testées avant remise.",
        icon: "shield",
      },
      {
        title: "Durabilité",
        text: "Un entretien qui prolonge la durée de vie de vos équipements.",
        icon: "refresh",
      },
    ],
    faqs: [
      {
        question: "Quel système de climatisation choisir pour mon établissement ?",
        answer:
          "Le choix dépend de la surface, du nombre de zones, de l'usage et des contraintes architecturales. Après une visite technique, nous comparons les solutions (gainable, VRV/VRF, cassette, eau glacée) et vous recommandons celle qui offre le meilleur équilibre entre confort, coût d'exploitation et intégration.",
      },
      {
        question: "À quelle fréquence faut-il entretenir une climatisation ?",
        answer:
          "Pour un usage professionnel à Marrakech, nous recommandons au minimum deux visites préventives par an, idéalement avant l'été et avant l'hiver. Les sites à forte sollicitation, comme les hôtels, bénéficient d'un suivi trimestriel.",
      },
      {
        question: "Intervenez-vous sur des installations posées par une autre entreprise ?",
        answer:
          "Oui. Nous réalisons un diagnostic complet de l'existant, quelle que soit la marque ou l'installateur d'origine, puis nous proposons un plan de remise à niveau et de maintenance.",
      },
      {
        question: "Pouvez-vous réduire la consommation de ma climatisation existante ?",
        answer:
          "Dans la plupart des cas, oui : nettoyage des échangeurs, réglage de la régulation, contrôle de la charge en fluide et programmation horaire permettent des gains sensibles. Nous identifions aussi les équipements dont le remplacement serait rentable.",
      },
      {
        question: "Le devis est-il gratuit ?",
        answer:
          "Oui. Chaque devis est gratuit et établi sur mesure après échange avec vous et, si nécessaire, une visite technique du site.",
      },
    ],
    relatedReferences: ["la-mamounia", "mandarin-oriental", "fairmont"],
    seoTitle: "Climatisation à Marrakech : installation et maintenance",
    seoDescription:
      "Installation, mise en service et maintenance de climatisation gainable, murale, cassette, VRV/VRF, pompes à chaleur et groupes d'eau glacée à Marrakech. Devis gratuit.",
  },
  {
    slug: "plomberie-et-chauffage",
    path: "/fr/plomberie-et-chauffage",
    name: "Plomberie & Chauffage",
    shortName: "Plomberie & Chauffage",
    short: "Réseaux d'eau, sanitaires, chauffage et eau chaude sanitaire.",
    pitch:
      "Des réseaux d'eau fiables et une eau chaude disponible à chaque instant : Novare conçoit, réhabilite et entretient vos installations de plomberie et de chauffage, de l'étude à la maintenance.",
    description: [
      "Une fuite, une baisse de pression ou une eau chaude qui tarde à arriver suffisent à dégrader l'expérience d'un client ou le fonctionnement d'un site. Nos plombiers-chauffagistes traitent vos réseaux comme un système complet, de la production à chaque point de puisage.",
      "Nous intervenons sur les réseaux neufs comme existants, avec des solutions de réhabilitation qui limitent les travaux lourds et préservent l'activité de votre établissement.",
    ],
    icon: "droplet",
    image: images.trades.plomberieChauffage,
    imageAlt: "Réseau de tuyauteries d'eau chaude et de chauffage dans un local technique",
    highlights: ["Réseaux eau chaude & froide", "Chauffage centralisé", "Eau chaude sanitaire"],
    subServices: [
      {
        title: "Réseaux eau chaude & froide",
        text: "Création, extension et équilibrage des réseaux de distribution, du compteur au point de puisage.",
        icon: "droplets",
      },
      {
        title: "Équipements sanitaires",
        text: "Pose et remplacement de sanitaires, robinetterie et équipements de salles de bains.",
        icon: "droplet",
      },
      {
        title: "Chauffage centralisé",
        text: "Chaufferies, chaudières, circulateurs et émetteurs pour un chauffage homogène.",
        icon: "flame",
      },
      {
        title: "Production d'eau chaude",
        text: "Ballons, préparateurs, PAC et solaire thermique dimensionnés selon vos pics de consommation.",
        icon: "thermometer",
      },
      {
        title: "Maintenance & dépannage",
        text: "Recherche de fuites, désembouage, remplacement de pièces et interventions rapides.",
        icon: "wrench",
      },
      {
        title: "Réhabilitation & optimisation",
        text: "Rénovation de réseaux vieillissants, calorifugeage et réduction des pertes.",
        icon: "refresh",
      },
    ],
    process: [
      {
        title: "Étude",
        text: "Relevé de l'existant, calcul des besoins en eau chaude et en chauffage.",
      },
      {
        title: "Conception",
        text: "Choix des matériaux, tracé des réseaux et dimensionnement des équipements.",
      },
      {
        title: "Réalisation",
        text: "Travaux propres et coordonnés, adaptés à la continuité de votre activité.",
      },
      {
        title: "Essais & mise en service",
        text: "Épreuves d'étanchéité, équilibrage et réglage des températures.",
      },
      {
        title: "Maintenance",
        text: "Contrôles périodiques, détartrage, désembouage et dépannage.",
      },
    ],
    clients: [
      {
        title: "Résidentiel",
        text: "Villas, riads et résidences aux réseaux fiables et durables.",
        icon: "home",
      },
      {
        title: "Hôtels",
        text: "Eau chaude disponible à toute heure, dans chaque chambre.",
        icon: "hotel",
      },
      {
        title: "Locaux commerciaux",
        text: "Sanitaires et réseaux adaptés à l'accueil du public.",
        icon: "building",
      },
      {
        title: "Sites industriels",
        text: "Réseaux de process, d'eau de lavage et de chauffage.",
        icon: "factory",
      },
    ],
    commitments: [
      {
        title: "Étanchéité garantie",
        text: "Chaque réseau est éprouvé avant sa remise en service.",
        icon: "shield",
      },
      {
        title: "Eau chaude maîtrisée",
        text: "Des températures stables et une production dimensionnée.",
        icon: "thermometer",
      },
      {
        title: "Chantiers propres",
        text: "Interventions organisées pour limiter la gêne sur site.",
        icon: "sparkles",
      },
      { title: "Réactivité", text: "Prise en charge rapide des fuites et pannes.", icon: "timer" },
    ],
    faqs: [
      {
        question: "Pouvez-vous intervenir sur une fuite rapidement ?",
        answer:
          "Oui. Les fuites font partie de nos interventions prioritaires. Appelez-nous directement : nous vous indiquons les premiers gestes à faire et organisons l'intervention dans les meilleurs délais.",
      },
      {
        question: "Mon eau chaude met du temps à arriver, que faire ?",
        answer:
          "C'est souvent le signe d'un bouclage absent ou mal équilibré, d'un réseau trop long ou d'un circulateur défaillant. Un diagnostic permet d'identifier la cause et de proposer une correction ciblée.",
      },
      {
        question: "Intervenez-vous en rénovation de réseaux anciens ?",
        answer:
          "Oui. Nous réhabilitons les réseaux vieillissants en planifiant les travaux par zones, afin de préserver l'activité de votre établissement pendant le chantier.",
      },
      {
        question: "Quelle solution de production d'eau chaude pour un hôtel ?",
        answer:
          "Nous dimensionnons la production selon le nombre de chambres, les pics du matin et du soir et l'énergie disponible : préparateurs, pompes à chaleur, solaire thermique ou combinaison de plusieurs solutions.",
      },
      {
        question: "Proposez-vous l'entretien des chaudières ?",
        answer:
          "Oui, dans le cadre d'interventions ponctuelles ou d'un contrat de maintenance : contrôle de combustion, nettoyage, vérification des sécurités et réglages.",
      },
    ],
    relatedReferences: ["hotel-es-saadi", "anosta-orangeraie", "la-mamounia"],
    seoTitle: "Plomberie et chauffage à Marrakech",
    seoDescription:
      "Réseaux d'eau chaude et froide, équipements sanitaires, chauffage centralisé, production d'eau chaude sanitaire, maintenance et dépannage à Marrakech.",
  },
  {
    slug: "froid-cuisine-industrielle",
    path: "/fr/froid-cuisine-industrielle",
    name: "Froid & Cuisine industrielle",
    shortName: "Froid & Cuisine",
    short: "Chambres froides, réfrigération et cuisines professionnelles.",
    pitch:
      "Chambres froides positives et négatives, équipements frigorifiques et cuisines industrielles : Novare garantit la chaîne du froid et la continuité de vos services, avec des interventions rapides pour limiter les interruptions.",
    description: [
      "Dans une cuisine professionnelle, une panne de froid se mesure en marchandises perdues et en services perturbés. Nos frigoristes conçoivent, installent et entretiennent vos équipements avec une exigence : que la température reste sous contrôle, en toutes circonstances.",
      "Nous accompagnons aussi l'installation complète de cuisines industrielles, en coordonnant le froid, l'eau, l'électricité et l'extraction pour un outil de travail cohérent et performant.",
    ],
    icon: "snowflake",
    image: images.trades.froidCuisine,
    imageAlt: "Chambre froide professionnelle en inox dans une cuisine de restaurant",
    highlights: ["Chambres froides", "Réfrigération pro", "Cuisines industrielles"],
    subServices: [
      {
        title: "Chambres froides positives",
        text: "Conservation entre 0 et +8 °C pour produits frais, légumes et produits laitiers.",
        icon: "thermometer",
      },
      {
        title: "Chambres froides négatives",
        text: "Stockage jusqu'à −25 °C pour surgelés, avec portes et panneaux adaptés.",
        icon: "snowflake",
      },
      {
        title: "Systèmes de réfrigération",
        text: "Groupes de condensation, centrales frigorifiques et réseaux de fluide.",
        icon: "gauge",
      },
      {
        title: "Équipements frigorifiques",
        text: "Vitrines, tables réfrigérées, armoires et cellules de refroidissement.",
        icon: "layers",
      },
      {
        title: "Cuisines industrielles",
        text: "Installation et raccordement des équipements de cuisson, de laverie et de froid.",
        icon: "chef",
      },
      {
        title: "Optimisation énergétique",
        text: "Réglages, récupération de chaleur et remplacement des composants énergivores.",
        icon: "leaf",
      },
    ],
    process: [
      {
        title: "Analyse des besoins",
        text: "Volumes stockés, rotations, températures cibles et contraintes d'hygiène.",
      },
      {
        title: "Dimensionnement",
        text: "Calcul des puissances frigorifiques et choix des équipements adaptés.",
      },
      {
        title: "Installation",
        text: "Montage des panneaux, groupes, évaporateurs et raccordements.",
      },
      {
        title: "Mise en froid",
        text: "Descente en température contrôlée, réglage des dégivrages et alarmes.",
      },
      {
        title: "Suivi & dépannage",
        text: "Maintenance préventive et interventions rapides en cas d'alerte.",
      },
    ],
    clients: [
      { title: "Hôtels", text: "Économats, cuisines centrales et offices d'étage.", icon: "hotel" },
      {
        title: "Restaurants & CHR",
        text: "Froid fiable pour des services sans interruption.",
        icon: "utensils",
      },
      {
        title: "Cuisines professionnelles",
        text: "Laboratoires, traiteurs et cuisines de collectivité.",
        icon: "chef",
      },
      {
        title: "Commerces alimentaires",
        text: "Vitrines, réserves et chambres de stockage.",
        icon: "building",
      },
    ],
    commitments: [
      {
        title: "Chaîne du froid",
        text: "Des températures tenues et contrôlées en permanence.",
        icon: "thermometer",
      },
      {
        title: "Interventions rapides",
        text: "Priorité aux pannes qui menacent vos marchandises.",
        icon: "timer",
      },
      {
        title: "Hygiène & conformité",
        text: "Des installations pensées pour les exigences sanitaires.",
        icon: "shield",
      },
      {
        title: "Sobriété énergétique",
        text: "Des équipements réglés pour consommer moins.",
        icon: "leaf",
      },
    ],
    faqs: [
      {
        question: "Chambre froide positive ou négative : que choisir ?",
        answer:
          "La chambre positive (0 à +8 °C) convient aux produits frais ; la négative (−18 à −25 °C) aux surgelés. Beaucoup d'établissements combinent les deux, parfois dans un même ensemble avec un sas commun. Nous vous conseillons selon vos volumes et vos rotations.",
      },
      {
        question: "Que faire si ma chambre froide ne descend plus en température ?",
        answer:
          "Gardez la porte fermée, vérifiez l'alimentation électrique et que l'évaporateur n'est pas pris en glace, puis appelez-nous. Selon la durée de la panne, transférez les produits les plus sensibles vers un autre équipement froid.",
      },
      {
        question: "Installez-vous des cuisines industrielles complètes ?",
        answer:
          "Oui. Nous coordonnons l'installation et le raccordement des équipements de froid, de cuisson et de laverie, ainsi que les réseaux d'eau et d'électricité associés.",
      },
      {
        question: "Pouvez-vous réduire la consommation de mes équipements de froid ?",
        answer:
          "Oui : nettoyage des condenseurs, réglage des dégivrages, contrôle des joints de porte, optimisation de la charge en fluide et, si pertinent, remplacement de composants plus sobres.",
      },
      {
        question: "Proposez-vous un contrat de maintenance pour le froid ?",
        answer:
          "Oui. Nos contrats prévoient des visites préventives régulières et un délai d'intervention prioritaire, essentiel pour les équipements qui conditionnent votre activité.",
      },
    ],
    relatedReferences: ["mcdonalds", "la-mamounia", "hotel-es-saadi"],
    seoTitle: "Froid et cuisine industrielle à Marrakech",
    seoDescription:
      "Chambres froides positives et négatives, réfrigération professionnelle, installation de cuisines industrielles, maintenance et dépannage pour hôtels et CHR à Marrakech.",
  },
  {
    slug: "maintenance-multi-technique",
    path: "/fr/maintenance-multi-technique",
    name: "Maintenance multi-technique",
    shortName: "Maintenance",
    short: "Un interlocuteur unique pour suivre tous vos équipements.",
    pitch:
      "Climatisation, plomberie, froid et électricité suivis par une seule équipe : la maintenance multi-technique Novare préserve la continuité de vos installations et simplifie votre gestion technique.",
    description: [
      "Multiplier les prestataires, c'est multiplier les délais, les zones grises et les coûts. Avec la maintenance multi-technique, Novare devient votre interlocuteur unique pour l'ensemble des équipements de votre bâtiment.",
      "Nous construisons avec vous un plan de maintenance adapté à vos installations et à vos priorités, puis nous en assurons le suivi, avec des comptes rendus clairs après chaque intervention.",
    ],
    icon: "wrench",
    image: images.trades.maintenance,
    imageAlt:
      "Technicien de maintenance multi-technique réalisant un contrôle dans un local technique",
    highlights: ["Préventif & correctif", "Diagnostic & optimisation", "Contrats sur mesure"],
    subServices: [
      {
        title: "Maintenance des installations",
        text: "Prise en charge de vos équipements CVC, plomberie, froid et électricité.",
        icon: "settings",
      },
      {
        title: "Contrôle & suivi",
        text: "Relevés, contrôles réglementaires et historique de chaque équipement.",
        icon: "clipboard",
      },
      {
        title: "Préventive & corrective",
        text: "Des visites planifiées pour anticiper, des interventions rapides pour réparer.",
        icon: "refresh",
      },
      {
        title: "Assistance technique",
        text: "Un appui réactif à vos équipes internes, au quotidien.",
        icon: "users",
      },
      {
        title: "Diagnostic & optimisation",
        text: "Audits ciblés et recommandations pour fiabiliser et réduire les coûts.",
        icon: "search",
      },
      {
        title: "Gestion technique des bâtiments",
        text: "Pilotage global des installations et coordination des intervenants.",
        icon: "building",
      },
    ],
    process: [
      {
        title: "Audit initial",
        text: "Inventaire des équipements, état des lieux et identification des risques.",
      },
      {
        title: "Plan de maintenance",
        text: "Fréquences, gammes d'intervention et priorités définies avec vous.",
      },
      {
        title: "Visites préventives",
        text: "Contrôles, nettoyages et réglages selon le planning convenu.",
      },
      {
        title: "Interventions correctives",
        text: "Prise en charge rapide des pannes, avec délai prioritaire.",
      },
      {
        title: "Rapports & suivi",
        text: "Comptes rendus détaillés et recommandations d'amélioration.",
      },
    ],
    clients: [
      {
        title: "Résidentiel",
        text: "Résidences et copropriétés aux parties communes suivies.",
        icon: "home",
      },
      {
        title: "Tertiaire",
        text: "Bureaux et commerces aux équipements toujours disponibles.",
        icon: "briefcase",
      },
      {
        title: "Hôtels",
        text: "Une équipe technique en appui de vos services, toute l'année.",
        icon: "hotel",
      },
      {
        title: "Industrie",
        text: "Disponibilité des utilités et des locaux techniques.",
        icon: "factory",
      },
    ],
    commitments: [
      {
        title: "Interlocuteur unique",
        text: "Une seule équipe pour tous vos métiers techniques.",
        icon: "users",
      },
      {
        title: "Traçabilité",
        text: "Chaque intervention documentée et consultable.",
        icon: "file",
      },
      {
        title: "Anticipation",
        text: "Moins de pannes grâce à un préventif rigoureux.",
        icon: "calendar",
      },
      {
        title: "Maîtrise des coûts",
        text: "Un budget de maintenance prévisible et optimisé.",
        icon: "gauge",
      },
    ],
    faqs: [
      {
        question: "Qu'est-ce que la maintenance multi-technique ?",
        answer:
          "C'est la prise en charge, par une seule entreprise, de la maintenance de plusieurs familles d'équipements d'un bâtiment : climatisation, plomberie, chauffage, froid, électricité. Vous gagnez en coordination, en réactivité et en lisibilité.",
      },
      {
        question: "Comment est défini le contenu d'un contrat ?",
        answer:
          "Après un audit de vos installations, nous définissons ensemble le périmètre, la fréquence des visites, le délai d'intervention et le format des rapports. Le contrat est ensuite ajusté selon l'évolution de votre site.",
      },
      {
        question: "Travaillez-vous avec nos équipes techniques internes ?",
        answer:
          "Oui. Nous intervenons souvent en complément d'une équipe interne, en apportant une expertise spécialisée, des moyens supplémentaires et un appui en cas de pic d'activité.",
      },
      {
        question: "Recevons-nous un compte rendu après chaque visite ?",
        answer:
          "Oui. Chaque visite donne lieu à un rapport précisant les contrôles réalisés, les anomalies constatées et les actions recommandées.",
      },
      {
        question: "Le contrat inclut-il les dépannages ?",
        answer:
          "Selon la formule choisie, les interventions correctives peuvent être incluses ou bénéficier d'un délai prioritaire. Nous adaptons la formule à vos besoins.",
      },
    ],
    relatedReferences: ["fairmont", "mandarin-oriental", "anosta-orangeraie"],
    seoTitle: "Maintenance multi-technique à Marrakech",
    seoDescription:
      "Maintenance préventive et corrective, contrôle et suivi, assistance technique, diagnostic et gestion technique des bâtiments à Marrakech. Contrats sur mesure.",
  },
  {
    slug: "electricite",
    path: "/fr/electricite",
    name: "Électricité",
    shortName: "Électricité",
    short: "Basse tension, tableaux, éclairage et mise en conformité.",
    pitch:
      "Installations basse tension, tableaux et armoires, éclairage intérieur et extérieur, maintenance et mise en conformité : une électricité sûre et fiable pour faire fonctionner tout le reste.",
    description: [
      "L'électricité alimente chaque équipement de votre bâtiment. Une installation mal dimensionnée ou vieillissante, et c'est la climatisation, le froid ou la production d'eau chaude qui s'arrêtent. Nos électriciens réalisent des installations sûres, lisibles et évolutives.",
      "De la distribution principale à l'éclairage d'ambiance, nous intervenons en neuf comme en rénovation, avec une priorité constante : la sécurité des personnes et la continuité de service.",
    ],
    icon: "zap",
    image: images.trades.electricite,
    imageAlt: "Électricien Novare intervenant sur une armoire électrique basse tension",
    highlights: ["Basse tension", "Tableaux & armoires", "Mise en conformité"],
    subServices: [
      {
        title: "Installation basse tension",
        text: "Distribution, câblage et protections pour bâtiments neufs et rénovés.",
        icon: "plug",
      },
      {
        title: "Tableaux & armoires",
        text: "Conception, câblage et repérage clair de vos tableaux électriques.",
        icon: "circuit",
      },
      {
        title: "Éclairage intérieur & extérieur",
        text: "Éclairage fonctionnel, d'ambiance et de façade, avec solutions LED sobres.",
        icon: "lightbulb",
      },
      {
        title: "Maintenance électrique",
        text: "Contrôles périodiques, thermographie et resserrage des connexions.",
        icon: "settings",
      },
      {
        title: "Détection des pannes",
        text: "Recherche méthodique de défauts et remise en service rapide.",
        icon: "search",
      },
      {
        title: "Mise en conformité",
        text: "Diagnostic de l'existant et travaux de mise en sécurité des installations.",
        icon: "shield",
      },
    ],
    process: [
      {
        title: "Diagnostic",
        text: "État des lieux de l'installation, des protections et des puissances.",
      },
      { title: "Conception", text: "Schémas, bilan de puissance et choix des équipements." },
      { title: "Réalisation", text: "Travaux soignés, repérage et documentation à jour." },
      {
        title: "Contrôles & essais",
        text: "Vérification des protections, isolements et continuités.",
      },
      {
        title: "Maintenance",
        text: "Visites périodiques et interventions rapides en cas de défaut.",
      },
    ],
    clients: [
      {
        title: "Résidentiel",
        text: "Installations sûres pour villas et résidences.",
        icon: "home",
      },
      {
        title: "Commercial",
        text: "Commerces, bureaux et showrooms bien éclairés.",
        icon: "building",
      },
      { title: "Hôtels", text: "Continuité de service et éclairages soignés.", icon: "hotel" },
      {
        title: "Industriel",
        text: "Distribution de puissance et armoires de commande.",
        icon: "factory",
      },
    ],
    commitments: [
      {
        title: "Sécurité",
        text: "Protection des personnes et des biens avant tout.",
        icon: "shield",
      },
      {
        title: "Conformité",
        text: "Des installations réalisées selon les normes en vigueur.",
        icon: "badge",
      },
      { title: "Lisibilité", text: "Tableaux repérés et schémas tenus à jour.", icon: "file" },
      {
        title: "Continuité",
        text: "Des interventions organisées pour limiter les coupures.",
        icon: "zap",
      },
    ],
    faqs: [
      {
        question: "Mon disjoncteur saute régulièrement, est-ce grave ?",
        answer:
          "Un disjoncteur qui se déclenche signale une surcharge, un court-circuit ou un défaut d'isolement. Il ne faut pas le forcer : un diagnostic permet d'identifier le circuit en cause et d'éviter un risque d'échauffement.",
      },
      {
        question: "Comment savoir si mon installation doit être mise en conformité ?",
        answer:
          "Une installation ancienne, modifiée à plusieurs reprises ou dont le tableau n'est plus repéré mérite un diagnostic. Nous vérifions les protections, la mise à la terre, les sections de câbles et vous remettons une liste de travaux priorisée.",
      },
      {
        question: "Installez-vous de l'éclairage LED ?",
        answer:
          "Oui, en intérieur comme en extérieur. Le passage au LED réduit fortement la consommation et la maintenance, tout en améliorant la qualité de la lumière.",
      },
      {
        question: "Intervenez-vous sur les armoires électriques industrielles ?",
        answer:
          "Oui. Nous réalisons le câblage, la modification et la maintenance d'armoires de distribution et de commande pour les sites industriels et tertiaires.",
      },
      {
        question: "Proposez-vous la maintenance électrique préventive ?",
        answer:
          "Oui : contrôles visuels, resserrage des connexions, tests des différentiels, thermographie des tableaux et vérification de l'éclairage de sécurité.",
      },
    ],
    relatedReferences: ["fairmont", "mcdonalds", "anosta-orangeraie"],
    seoTitle: "Électricité à Marrakech : installation et mise en conformité",
    seoDescription:
      "Installation électrique basse tension, tableaux et armoires, éclairage intérieur et extérieur, maintenance électrique, dépannage et mise en conformité à Marrakech.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export function requireService(slug: ServiceSlug): Service {
  const service = getService(slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
