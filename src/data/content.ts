export type Trade = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  services: string[];
  icon: "wind" | "droplet" | "snowflake" | "settings" | "zap";
  audience: string[];
  faqs: { question: string; answer: string }[];
};

export const trades: Trade[] = [
  {
    slug: "climatisation",
    title: "Climatisation & traitement de l’air",
    shortTitle: "Climatisation",
    summary: "Des ambiances maîtrisées, pensées pour le confort et la performance.",
    description:
      "Novare étudie, installe et entretient vos équipements de climatisation, du système individuel aux installations centralisées.",
    services: ["Climatisation gainable", "Unités murales et cassettes", "Systèmes VRV", "Pompes à chaleur air-air", "Pompes à chaleur air-eau", "Groupes d’eau glacée"],
    icon: "wind",
    audience: ["Hôtellerie", "Restaurants & CHR", "Résidentiel", "Bureaux", "Industrie"],
    faqs: [
      { question: "Quels types de systèmes installez-vous ?", answer: "Nous intervenons sur les systèmes gainables, muraux, cassettes, VRV, pompes à chaleur et groupes d’eau glacée." },
      { question: "Proposez-vous la maintenance des installations ?", answer: "Oui. Nous réalisons des interventions préventives et correctives, avec un suivi adapté à votre site." },
    ],
  },
  {
    slug: "plomberie-et-chauffage",
    title: "Plomberie & chauffage",
    shortTitle: "Plomberie & chauffage",
    summary: "Des réseaux fiables, du premier raccordement au suivi dans la durée.",
    description:
      "Nos équipes prennent en charge les réseaux d’eau, les installations sanitaires et les solutions de chauffage centralisé.",
    services: ["Réseaux d’eau chaude et froide", "Installations sanitaires", "Chauffage centralisé", "Production d’eau chaude sanitaire", "Dépannage plomberie", "Réhabilitation des réseaux"],
    icon: "droplet",
    audience: ["Hôtellerie", "Restaurants & CHR", "Résidentiel", "Bureaux", "Industrie"],
    faqs: [
      { question: "Intervenez-vous sur des réseaux existants ?", answer: "Oui. Nous intervenons en création, en rénovation et en réhabilitation de réseaux d’eau et de chauffage." },
      { question: "Pouvez-vous prendre en charge un dépannage ?", answer: "Contactez-nous par téléphone pour nous décrire la situation et organiser la suite." },
    ],
  },
  {
    slug: "froid-cuisine-industrielle",
    title: "Froid & cuisine industrielle",
    shortTitle: "Froid & cuisine",
    summary: "La maîtrise du froid au service de vos équipements professionnels.",
    description:
      "Nous équipons et entretenons les installations frigorifiques et les équipements des cuisines professionnelles.",
    services: ["Chambres froides positives", "Chambres froides négatives", "Réfrigération professionnelle", "Équipements frigorifiques", "Cuisines industrielles", "Dépannage et optimisation énergétique"],
    icon: "snowflake",
    audience: ["Hôtellerie", "Restaurants & CHR", "Industrie", "Commerces alimentaires"],
    faqs: [
      { question: "Travaillez-vous avec les cuisines professionnelles ?", answer: "Oui. Nous intervenons sur les équipements frigorifiques et les installations de cuisines industrielles." },
      { question: "Entretenez-vous les chambres froides ?", answer: "Oui, en préventif comme en correctif, selon les besoins de votre établissement." },
    ],
  },
  {
    slug: "maintenance-multi-technique",
    title: "Maintenance multi-technique",
    shortTitle: "Maintenance",
    summary: "Un suivi coordonné pour préserver la continuité de vos équipements.",
    description:
      "Une organisation adaptée à vos installations, combinant prévention, diagnostic, assistance et interventions correctives.",
    services: ["Maintenance préventive", "Maintenance corrective", "Contrôle et suivi technique", "Assistance technique", "Diagnostic d’installations", "Gestion technique des bâtiments", "Contrats sur mesure"],
    icon: "settings",
    audience: ["Hôtellerie", "Restaurants & CHR", "Résidentiel", "Bureaux", "Industrie"],
    faqs: [
      { question: "Comment sont définis les contrats de maintenance ?", answer: "Le périmètre est défini selon vos équipements, vos besoins et les priorités de votre établissement." },
      { question: "La maintenance peut-elle couvrir plusieurs métiers ?", answer: "Oui. Un accompagnement multi-technique peut réunir plusieurs expertises dans un suivi coordonné." },
    ],
  },
  {
    slug: "electricite",
    title: "Électricité & courants faibles",
    shortTitle: "Électricité",
    summary: "Des installations électriques suivies avec méthode et exigence.",
    description:
      "De la distribution électrique à l’éclairage, Novare réalise vos installations et accompagne leur maintenance.",
    services: ["Installations basse tension", "Tableaux et armoires électriques", "Éclairage intérieur et extérieur", "Maintenance électrique", "Recherche de pannes", "Mise en conformité"],
    icon: "zap",
    audience: ["Hôtellerie", "Restaurants & CHR", "Résidentiel", "Bureaux", "Industrie"],
    faqs: [
      { question: "Quels travaux électriques prenez-vous en charge ?", answer: "Nous intervenons en basse tension, sur les tableaux, armoires, éclairages, pannes et besoins de mise en conformité." },
      { question: "Prenez-vous en charge la maintenance électrique ?", answer: "Oui, en complément des installations et selon le périmètre convenu avec votre établissement." },
    ],
  },
];

export type Sector = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  needs: string[];
  solutions: string[];
  faq: { question: string; answer: string }[];
};

export const sectors: Sector[] = [
  { slug: "hotellerie", title: "Hôtellerie", label: "Hôtellerie", summary: "Des installations techniques au service du confort de vos clients et de la continuité de vos opérations.", needs: ["Confort thermique des chambres et espaces communs", "Continuité des équipements techniques", "Coordination des interventions sur site"], solutions: ["climatisation", "plomberie-et-chauffage", "froid-cuisine-industrielle", "maintenance-multi-technique", "electricite"], faq: [{ question: "Intervenez-vous dans les hôtels ?", answer: "L’hôtellerie fait partie des secteurs accompagnés par Novare, de l’installation à la maintenance." }] },
  { slug: "restauration-chr", title: "Restauration & CHR", label: "Restauration · CHR", summary: "Des solutions techniques adaptées aux cuisines, salles et équipements professionnels.", needs: ["Préservation de la chaîne du froid", "Équipements de cuisine fonctionnels", "Confort des clients et équipes"], solutions: ["froid-cuisine-industrielle", "climatisation", "plomberie-et-chauffage", "electricite", "maintenance-multi-technique"], faq: [{ question: "Prenez-vous en charge les équipements de cuisine ?", answer: "Oui. Novare intervient sur le froid et les équipements de cuisines professionnelles." }] },
  { slug: "residentiel", title: "Résidentiel", label: "Résidentiel", summary: "Des équipements pérennes et un confort quotidien pour les résidences.", needs: ["Confort thermique au fil des saisons", "Réseaux d’eau et équipements fiables", "Entretien des installations"], solutions: ["climatisation", "plomberie-et-chauffage", "electricite", "maintenance-multi-technique"], faq: [{ question: "Accompagnez-vous les projets résidentiels ?", answer: "Oui. Les résidences font partie des établissements accompagnés par nos équipes." }] },
  { slug: "tertiaire-bureaux", title: "Tertiaire & bureaux", label: "Tertiaire · Bureaux", summary: "Un environnement de travail confortable, avec des installations suivies et coordonnées.", needs: ["Qualité des espaces de travail", "Suivi des équipements techniques", "Interventions coordonnées"], solutions: ["climatisation", "electricite", "plomberie-et-chauffage", "maintenance-multi-technique"], faq: [{ question: "Proposez-vous un suivi technique des bureaux ?", answer: "Oui. Nos équipes proposent des solutions de maintenance adaptées aux installations de chaque site." }] },
  { slug: "industrie", title: "Industrie", label: "Industrie", summary: "Des expertises techniques qui accompagnent vos équipements et vos espaces de production.", needs: ["Disponibilité des installations", "Maîtrise du froid et des équipements", "Maintenance préventive et corrective"], solutions: ["froid-cuisine-industrielle", "electricite", "climatisation", "plomberie-et-chauffage", "maintenance-multi-technique"], faq: [{ question: "Intervenez-vous sur des sites industriels ?", answer: "Oui. Novare accompagne les sites industriels sur plusieurs métiers techniques." }] },
];

export const references = [
  { name: "La Mamounia", sector: "Hôtellerie", detail: "Référence hôtelière" },
  { name: "Mandarin Oriental", sector: "Hôtellerie", detail: "Référence hôtelière" },
  { name: "Fairmont", sector: "Hôtellerie", detail: "Référence hôtelière" },
  { name: "Hôtel Es Saadi", sector: "Hôtellerie", detail: "Référence hôtelière" },
  { name: "McDonald’s", sector: "Restauration · CHR", detail: "Référence restauration" },
  { name: "Anosta l’Orangeraie", sector: "Résidentiel", detail: "Référence résidentielle" },
];

export const posts = [
  { slug: "entretenir-climatisation", category: "Climatisation", title: "Pourquoi entretenir régulièrement sa climatisation ?", excerpt: "Les points essentiels pour préserver le fonctionnement de vos installations et le confort des espaces.", readTime: "5 min" },
  { slug: "chambre-froide", category: "Froid professionnel", title: "Chambre froide : les bons réflexes au quotidien", excerpt: "Quelques repères pratiques pour surveiller vos équipements de froid professionnel.", readTime: "4 min" },
  { slug: "maintenance-preventive", category: "Maintenance", title: "Maintenance préventive : anticiper plutôt que subir", excerpt: "Comment organiser un suivi technique adapté aux équipements de votre établissement.", readTime: "6 min" },
  { slug: "eau-chaude-sanitaire", category: "Plomberie & chauffage", title: "Eau chaude sanitaire : les points à surveiller", excerpt: "Les équipements et réseaux à intégrer dans le suivi d’un bâtiment.", readTime: "4 min" },
  { slug: "installations-electriques", category: "Électricité", title: "Bien suivre ses installations électriques", excerpt: "Un suivi régulier contribue à la fiabilité des tableaux et équipements électriques.", readTime: "5 min" },
  { slug: "cuisine-professionnelle", category: "CHR", title: "Les équipements techniques d’une cuisine professionnelle", excerpt: "Froid, eau, électricité : les expertises qui font fonctionner une cuisine.", readTime: "5 min" },
];

export const methodSteps = [
  { title: "Étude", text: "Nous écoutons votre besoin et analysons les spécificités de votre site." },
  { title: "Installation", text: "Nos équipes mettent en œuvre la solution technique définie pour votre projet." },
  { title: "Mise en service", text: "Les équipements sont vérifiés et mis en service avec soin." },
  { title: "Maintenance", text: "Nous accompagnons vos installations dans leur suivi préventif et correctif." },
  { title: "Optimisation", text: "Nous identifions les pistes d’amélioration adaptées à vos équipements." },
];

export const faqs = [
  { category: "Expertises", question: "Quels métiers techniques propose Novare ?", answer: "Novare intervient en climatisation, plomberie et chauffage, froid et cuisine industrielle, électricité et maintenance multi-technique." },
  { category: "Expertises", question: "Dans quels secteurs intervenez-vous ?", answer: "Nos secteurs comprennent l’hôtellerie, la restauration et le CHR, le résidentiel, le tertiaire et l’industrie." },
  { category: "Maintenance", question: "Proposez-vous des contrats de maintenance ?", answer: "Oui. Les contrats sont définis selon vos équipements, vos priorités et les besoins de votre établissement." },
  { category: "Maintenance", question: "La maintenance peut-elle couvrir plusieurs métiers ?", answer: "Oui. Une approche multi-technique coordonne le suivi de plusieurs familles d’équipements." },
  { category: "Intervention", question: "Comment demander un devis ?", answer: "Appelez-nous, écrivez-nous ou utilisez le formulaire de demande de devis. Nous reprendrons contact avec vous." },
  { category: "Intervention", question: "Où se trouve Novare ?", answer: "Notre adresse est 107, Hay Almassarii, étage 1, bureau 1, Marrakech." },
];

export const metrics = [
  { value: "1 286+", label: "projets réalisés" },
  { value: "10+", label: "ans d’expérience" },
  { value: "100 %", label: "équipe qualifiée" },
  { value: "100 %", label: "clients satisfaits" },
];