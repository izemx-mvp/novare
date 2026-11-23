import { images } from "@/config/images";
import type { ServiceSlug } from "@/data/services";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type PostSection = { id: string; title: string; blocks: PostBlock[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  service: ServiceSlug;
  readingTime: number;
  date: string;
  cover: string;
  coverAlt: string;
  intro: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "entretien-climatisation-avant-ete-marrakech",
    title: "Entretien de la climatisation avant l'été à Marrakech",
    excerpt:
      "Avec des pointes à plus de 40 °C, l'été met les climatiseurs à rude épreuve. Les contrôles à réaliser au printemps pour éviter la panne en pleine canicule.",
    category: "Climatisation",
    service: "climatisation",
    readingTime: 6,
    date: "2026-04-14",
    cover: images.trades.climatisation,
    coverAlt: "Unités extérieures de climatisation alignées sur une terrasse technique",
    intro:
      "À Marrakech, les températures estivales dépassent régulièrement 40 °C entre juin et septembre. Pour un hôtel, un restaurant ou des bureaux, c'est la période où la climatisation travaille le plus, et donc celle où une panne coûte le plus cher. La bonne nouvelle : la grande majorité des pannes estivales s'anticipent avec un entretien réalisé au printemps.",
    sections: [
      {
        id: "pourquoi-avant-ete",
        title: "Pourquoi intervenir avant l'été ?",
        blocks: [
          {
            type: "p",
            text: "Un climatiseur qui a peu servi pendant l'hiver accumule de la poussière, des dépôts sur les échangeurs et parfois de petites fuites de fluide frigorigène passées inaperçues. Tant que la demande reste faible, l'appareil compense. Mais dès les premières fortes chaleurs, il fonctionne à pleine puissance pendant de longues heures et le moindre défaut se transforme en panne.",
          },
          {
            type: "p",
            text: "Intervenir en avril ou en mai présente aussi un avantage pratique : les techniciens sont plus disponibles qu'en juillet, les pièces de rechange se commandent sans urgence, et vous pouvez planifier les travaux sans pression sur votre activité. Pour un hôtel, c'est la garantie d'aborder la haute saison avec des chambres prêtes.",
          },
          {
            type: "quote",
            text: "Une installation entretenue avant l'été consomme moins, tombe moins en panne et assure un confort plus stable pendant toute la saison chaude.",
          },
        ],
      },
      {
        id: "points-de-controle",
        title: "Les points de contrôle essentiels",
        blocks: [
          {
            type: "p",
            text: "Une visite préventive complète ne se limite pas au nettoyage des filtres. Voici les opérations que réalisent nos techniciens sur chaque installation :",
          },
          {
            type: "ul",
            items: [
              "Nettoyage ou remplacement des filtres des unités intérieures, pour la qualité de l'air et le débit.",
              "Nettoyage des échangeurs intérieurs et extérieurs : un condenseur encrassé fait chuter le rendement et augmente la consommation.",
              "Contrôle des pressions et de la charge en fluide frigorigène, avec recherche de fuite si nécessaire.",
              "Vérification de l'évacuation des condensats et désinfection des bacs, pour éviter fuites et odeurs.",
              "Contrôle des connexions électriques, des intensités absorbées et des protections.",
              "Test de la régulation, des thermostats et des programmations horaires.",
            ],
          },
          {
            type: "p",
            text: "Sur les installations centralisées, comme les systèmes VRV/VRF ou les groupes d'eau glacée, s'ajoutent le contrôle des pompes, des vannes, de la qualité de l'eau du réseau et la lecture des historiques d'alarmes.",
          },
        ],
      },
      {
        id: "unites-exterieures",
        title: "Attention particulière aux unités extérieures",
        blocks: [
          {
            type: "p",
            text: "À Marrakech, les unités extérieures sont exposées au soleil direct, à la poussière et parfois au sable porté par le vent. Un condenseur partiellement obstrué peut perdre une part importante de sa capacité d'échange : le compresseur force, chauffe, et finit par se mettre en sécurité aux heures les plus chaudes.",
          },
          {
            type: "p",
            text: "Nous vérifions donc systématiquement le dégagement autour des unités, l'état des ailettes, la propreté des batteries et le bon fonctionnement des ventilateurs. Lorsque c'est possible, un ombrage ventilé ou un déplacement de l'unité peut améliorer durablement les performances.",
          },
        ],
      },
      {
        id: "signaux-alerte",
        title: "Les signaux qui doivent vous alerter",
        blocks: [
          {
            type: "p",
            text: "Entre deux visites, certains signes indiquent qu'une intervention est nécessaire sans attendre :",
          },
          {
            type: "ul",
            items: [
              "L'air soufflé est moins froid qu'auparavant ou la pièce met plus de temps à se rafraîchir.",
              "Des gouttes d'eau apparaissent sous l'unité intérieure.",
              "L'appareil émet des bruits inhabituels : sifflements, claquements, vibrations.",
              "Une odeur de moisi se dégage au démarrage.",
              "La facture d'électricité augmente sans changement d'usage.",
            ],
          },
          {
            type: "p",
            text: "Dans tous ces cas, il est préférable de faire contrôler l'équipement rapidement : un défaut mineur traité tôt évite souvent le remplacement d'un compresseur.",
          },
        ],
      },
      {
        id: "contrat-entretien",
        title: "Le contrat d'entretien : la solution pour les professionnels",
        blocks: [
          {
            type: "p",
            text: "Pour un établissement qui compte de nombreuses unités, un contrat de maintenance permet de planifier les visites au bon moment, de disposer d'un historique par équipement et de bénéficier d'un délai d'intervention prioritaire en cas de panne. C'est particulièrement utile pour les hôtels, où une chambre sans climatisation en août est une chambre qui ne se vend pas.",
          },
          {
            type: "p",
            text: "Chez Novare, nous recommandons au minimum deux visites par an pour un usage professionnel, et un rythme trimestriel pour les sites les plus sollicités. Chaque visite donne lieu à un rapport précisant les contrôles réalisés et les actions recommandées.",
          },
          {
            type: "p",
            text: "Vous souhaitez préparer votre installation pour l'été ? Nos équipes réalisent un diagnostic complet et vous proposent un plan d'entretien adapté, avec un devis gratuit.",
          },
        ],
      },
    ],
  },
  {
    slug: "chambre-froide-positive-ou-negative",
    title: "Chambre froide positive ou négative : comment choisir ?",
    excerpt:
      "Températures, produits stockés, isolation, consommation : les critères pour choisir la bonne chambre froide pour votre restaurant ou votre hôtel.",
    category: "Froid & Cuisine",
    service: "froid-cuisine-industrielle",
    readingTime: 6,
    date: "2026-03-02",
    cover: images.trades.froidCuisine,
    coverAlt: "Intérieur d'une chambre froide professionnelle avec étagères inox",
    intro:
      "Pour un restaurant, un hôtel ou un traiteur, la chambre froide est le cœur de la cuisine. Mal choisie ou mal dimensionnée, elle pèse sur la consommation électrique, complique l'organisation et met en jeu la sécurité alimentaire. Première question à se poser : positive ou négative ? Voici comment trancher.",
    sections: [
      {
        id: "definitions",
        title: "Positive, négative : de quoi parle-t-on ?",
        blocks: [
          {
            type: "p",
            text: "Une chambre froide positive maintient une température supérieure à 0 °C, généralement entre 0 et +8 °C selon les produits. Elle sert à conserver les produits frais : viandes et poissons en attente de préparation, produits laitiers, fruits et légumes, préparations du jour.",
          },
          {
            type: "p",
            text: "Une chambre froide négative maintient une température inférieure à 0 °C, le plus souvent entre −18 et −25 °C. Elle est destinée au stockage longue durée des produits surgelés et congelés.",
          },
          {
            type: "p",
            text: "Les deux technologies reposent sur le même principe, mais leurs exigences diffèrent sensiblement : épaisseur d'isolation, type de porte, puissance frigorifique, gestion du dégivrage et sécurités.",
          },
        ],
      },
      {
        id: "criteres",
        title: "Les critères de choix",
        blocks: [
          { type: "h3", text: "La nature des produits et leurs rotations" },
          {
            type: "p",
            text: "Un restaurant qui travaille principalement du frais avec des livraisons quotidiennes aura surtout besoin de froid positif. Un hôtel avec une forte capacité de banquets, ou un établissement éloigné de ses fournisseurs, aura intérêt à disposer d'une capacité négative pour sécuriser ses stocks.",
          },
          { type: "h3", text: "Le volume à stocker" },
          {
            type: "p",
            text: "On dimensionne une chambre froide à partir du volume de marchandises, de la fréquence de réapprovisionnement et des pics d'activité. Une chambre trop petite oblige à surcharger les étagères et gêne la circulation de l'air ; une chambre trop grande consomme inutilement.",
          },
          { type: "h3", text: "L'emplacement disponible" },
          {
            type: "p",
            text: "La chambre doit être placée à l'abri des sources de chaleur, avec un accès facile depuis la zone de réception et la cuisine. L'emplacement du groupe frigorifique est tout aussi important : à Marrakech, un condenseur exposé en plein soleil perd en efficacité.",
          },
        ],
      },
      {
        id: "isolation-portes",
        title: "Isolation, portes et sols : les différences techniques",
        blocks: [
          {
            type: "p",
            text: "Une chambre négative nécessite des panneaux isolants plus épais, un sol isolé pour éviter le gel du support et une porte équipée de résistances chauffantes pour empêcher le givrage du joint. La puissance frigorifique est également plus élevée et l'évaporateur doit être dégivré régulièrement.",
          },
          {
            type: "ul",
            items: [
              "Panneaux : épaisseur adaptée à la température cible et à l'environnement.",
              "Portes : battantes ou coulissantes, avec joints chauffants en négatif.",
              "Sol : isolé et antidérapant, avec seuil adapté aux chariots.",
              "Éclairage : étanche et adapté aux basses températures.",
              "Sécurité : dispositif d'ouverture intérieure et alarme homme enfermé.",
            ],
          },
        ],
      },
      {
        id: "combiner",
        title: "Combiner les deux : la solution la plus courante",
        blocks: [
          {
            type: "p",
            text: "Dans la majorité des cuisines professionnelles, la réponse n'est pas l'un ou l'autre, mais les deux. Une configuration fréquente consiste à installer une chambre négative accessible depuis une chambre positive qui joue le rôle de sas. Les entrées d'air chaud dans la partie négative sont réduites, ce qui limite le givre et la consommation.",
          },
          {
            type: "quote",
            text: "Une chambre froide bien conçue se juge sur trois points : la stabilité de sa température, sa consommation et la facilité avec laquelle vos équipes l'utilisent au quotidien.",
          },
        ],
      },
      {
        id: "entretien",
        title: "Entretien et consommation",
        blocks: [
          {
            type: "p",
            text: "Quel que soit le type choisi, l'entretien conditionne la fiabilité. Un condenseur propre, des joints de porte en bon état, des dégivrages correctement réglés et une charge de fluide contrôlée garantissent une température stable et une consommation maîtrisée.",
          },
          {
            type: "p",
            text: "Nous recommandons un enregistrement continu de la température avec alarme, afin d'être alerté avant que la situation ne devienne critique. En cas de panne, chaque heure compte : un contrat de maintenance avec délai d'intervention prioritaire est la meilleure assurance pour vos marchandises.",
          },
          {
            type: "p",
            text: "Vous avez un projet de chambre froide ou souhaitez faire contrôler votre installation ? Nos frigoristes étudient vos besoins et vous remettent une proposition détaillée, gratuitement.",
          },
        ],
      },
    ],
  },
  {
    slug: "contrat-de-maintenance-reduit-vos-couts",
    title: "Pourquoi un contrat de maintenance réduit vos coûts",
    excerpt:
      "Moins de pannes, des équipements qui durent plus longtemps, un budget prévisible : comment la maintenance préventive se rentabilise.",
    category: "Maintenance",
    service: "maintenance-multi-technique",
    readingTime: 5,
    date: "2026-05-20",
    cover: images.trades.maintenance,
    coverAlt: "Technicien remplissant un rapport de maintenance devant une installation",
    intro:
      "Beaucoup d'établissements ne font appel à un technicien que lorsqu'un équipement tombe en panne. Cette approche semble économique, mais elle coûte presque toujours plus cher à moyen terme. Un contrat de maintenance bien construit transforme des dépenses imprévues en un budget maîtrisé.",
    sections: [
      {
        id: "cout-cache",
        title: "Le coût caché de la maintenance « à la panne »",
        blocks: [
          {
            type: "p",
            text: "Le prix d'un dépannage ne se limite pas à la facture du technicien. Il faut y ajouter les pièces commandées en urgence, l'arrêt d'activité, les marchandises perdues lorsqu'il s'agit d'équipements de froid, et parfois l'insatisfaction des clients : une chambre d'hôtel sans climatisation ou un restaurant sans eau chaude ont des conséquences immédiates.",
          },
          {
            type: "p",
            text: "Surtout, une panne survient rarement au bon moment. Elle tombe pendant un pic d'activité, précisément quand les équipements sont le plus sollicités et que les techniciens sont le moins disponibles.",
          },
        ],
      },
      {
        id: "leviers",
        title: "Les quatre leviers d'économie",
        blocks: [
          { type: "h3", text: "1. Moins de pannes" },
          {
            type: "p",
            text: "La maintenance préventive détecte les défauts avant qu'ils ne provoquent un arrêt : connexion qui chauffe, roulement bruyant, légère fuite de fluide, filtre colmaté. Les interventions sont planifiées, rapides et peu coûteuses.",
          },
          { type: "h3", text: "2. Une consommation énergétique réduite" },
          {
            type: "p",
            text: "Un équipement encrassé ou mal réglé consomme davantage pour produire le même résultat. Nettoyer les échangeurs, ajuster la régulation et contrôler les charges de fluide permet de retrouver le rendement nominal des installations.",
          },
          { type: "h3", text: "3. Une durée de vie prolongée" },
          {
            type: "p",
            text: "Un compresseur, une chaudière ou un tableau électrique entretenus régulièrement durent nettement plus longtemps. Le remplacement des équipements lourds est repoussé et peut être anticipé dans votre plan d'investissement.",
          },
          { type: "h3", text: "4. Un budget prévisible" },
          {
            type: "p",
            text: "Avec un contrat, le coût de la maintenance est connu à l'avance. Les dépenses imprévues diminuent, et les recommandations formulées lors des visites permettent de programmer les travaux nécessaires au moment le plus opportun.",
          },
        ],
      },
      {
        id: "contenu-contrat",
        title: "Ce que doit contenir un bon contrat",
        blocks: [
          {
            type: "ul",
            items: [
              "Un inventaire précis des équipements couverts.",
              "Une fréquence de visites adaptée à chaque famille d'équipements.",
              "Des gammes de maintenance détaillées : ce qui est contrôlé, nettoyé, mesuré.",
              "Un délai d'intervention garanti en cas de panne.",
              "Un rapport après chaque visite, avec les anomalies et recommandations.",
              "Un interlocuteur identifié qui connaît votre site.",
            ],
          },
          {
            type: "quote",
            text: "Le meilleur contrat n'est pas le plus complet, c'est celui qui correspond exactement à vos équipements et à vos priorités.",
          },
        ],
      },
      {
        id: "multi-technique",
        title: "L'intérêt d'un contrat multi-technique",
        blocks: [
          {
            type: "p",
            text: "Confier la climatisation, la plomberie, le froid et l'électricité à un seul prestataire simplifie considérablement la gestion. Les pannes à la frontière entre deux métiers, par exemple une climatisation qui disjoncte, sont traitées sans renvoi de responsabilité, et la coordination des interventions est assurée par une seule équipe.",
          },
          {
            type: "p",
            text: "C'est l'approche que nous proposons chez Novare : un audit initial de vos installations, un plan de maintenance construit avec vous, puis un suivi documenté. Nos formules Essentiel, Confort et Premium s'adaptent à la taille de votre site et au niveau de service attendu.",
          },
        ],
      },
    ],
  },
  {
    slug: "vrv-ou-gainable-hotel",
    title: "VRV ou gainable : quel système pour un hôtel ?",
    excerpt:
      "Deux technologies, deux philosophies. Comparatif concret pour choisir la climatisation de vos chambres et espaces communs.",
    category: "Climatisation",
    service: "climatisation",
    readingTime: 6,
    date: "2026-06-10",
    cover: images.sectors.hotellerie,
    coverAlt: "Chambre d'hôtel haut de gamme avec diffuseurs de climatisation discrets",
    intro:
      "Lors de la construction ou de la rénovation d'un hôtel, le choix du système de climatisation engage l'établissement pour quinze à vingt ans. Deux solutions reviennent souvent : le système VRV (ou VRF) et la climatisation gainable. Elles ne s'opposent pas forcément, mais répondent à des logiques différentes.",
    sections: [
      {
        id: "principes",
        title: "Deux principes de fonctionnement",
        blocks: [
          {
            type: "p",
            text: "Un système VRV/VRF (volume ou débit de réfrigérant variable) relie plusieurs unités intérieures à un ou plusieurs groupes extérieurs par un réseau frigorifique unique. La quantité de fluide envoyée à chaque unité est ajustée en permanence selon les besoins de chaque pièce.",
          },
          {
            type: "p",
            text: "La climatisation gainable désigne une unité intérieure installée en faux plafond, qui distribue l'air par un réseau de gaines jusqu'à des bouches de soufflage. L'appareil est invisible : seules les grilles apparaissent.",
          },
          {
            type: "p",
            text: "Point important : ces deux notions se combinent. Un système VRV peut alimenter des unités intérieures gainables. La vraie question est donc souvent celle de l'architecture globale : production centralisée ou systèmes indépendants, et type d'unités intérieures.",
          },
        ],
      },
      {
        id: "atouts-vrv",
        title: "Les atouts du VRV/VRF",
        blocks: [
          {
            type: "ul",
            items: [
              "Pilotage individuel de chaque chambre avec un nombre limité de groupes extérieurs.",
              "Très bon rendement à charge partielle, situation la plus fréquente dans un hôtel.",
              "Possibilité de récupération d'énergie entre zones en froid et zones en chaud selon les modèles.",
              "Supervision centralisée : la réception ou le service technique visualise l'état de chaque unité.",
              "Encombrement réduit des réseaux par rapport à l'eau glacée.",
            ],
          },
          {
            type: "p",
            text: "En contrepartie, le VRV demande une conception rigoureuse des réseaux frigorifiques, une mise en service soignée et une maintenance réalisée par des techniciens qualifiés.",
          },
        ],
      },
      {
        id: "atouts-gainable",
        title: "Les atouts du gainable",
        blocks: [
          {
            type: "ul",
            items: [
              "Discrétion totale : aucun appareil visible dans la chambre.",
              "Diffusion homogène de l'air par plusieurs bouches.",
              "Niveau sonore très faible lorsque les gaines sont bien dimensionnées.",
              "Intégration naturelle de l'air neuf et de la filtration.",
            ],
          },
          {
            type: "p",
            text: "Le gainable exige en revanche de la hauteur de faux plafond et un accès pour la maintenance des unités et des filtres, à prévoir dès la conception.",
          },
        ],
      },
      {
        id: "criteres-hotel",
        title: "Les critères décisifs pour un hôtel",
        blocks: [
          { type: "h3", text: "Le nombre de chambres et la configuration" },
          {
            type: "p",
            text: "Pour un établissement de plusieurs dizaines de chambres, un système centralisé (VRV ou eau glacée) est généralement plus pertinent que des systèmes indépendants. Pour un riad ou une maison d'hôtes, des solutions plus simples peuvent suffire.",
          },
          { type: "h3", text: "Le niveau de gamme" },
          {
            type: "p",
            text: "Dans l'hôtellerie haut de gamme, l'esthétique et le silence priment : les unités gainables ou encastrées sont presque toujours privilégiées dans les chambres et suites.",
          },
          { type: "h3", text: "Les contraintes du bâtiment" },
          {
            type: "p",
            text: "Hauteur sous plafond, emplacement des groupes extérieurs, bâtiment existant ou neuf, contraintes patrimoniales : ces éléments orientent fortement le choix.",
          },
          {
            type: "quote",
            text: "Dans la plupart des hôtels, la solution optimale combine un VRV pour la production et des unités gainables pour la diffusion dans les chambres.",
          },
        ],
      },
      {
        id: "notre-approche",
        title: "Notre approche",
        blocks: [
          {
            type: "p",
            text: "Chez Novare, chaque projet hôtelier commence par une étude technique : bilan thermique par zone, analyse des usages, contraintes architecturales et objectifs énergétiques. Nous comparons ensuite les scénarios sur la base du coût d'installation, du coût d'exploitation et du niveau de confort.",
          },
          {
            type: "p",
            text: "Une fois l'installation en service, nous en assurons la maintenance pour préserver ses performances dans la durée. Vous préparez un projet ? Contactez-nous pour une étude gratuite.",
          },
        ],
      },
    ],
  },
  {
    slug: "mise-en-conformite-electrique-points-cles",
    title: "Mise en conformité électrique : les points clés",
    excerpt:
      "Protections, mise à la terre, tableaux, éclairage de sécurité : ce qu'il faut vérifier pour une installation sûre et pérenne.",
    category: "Électricité",
    service: "electricite",
    readingTime: 5,
    date: "2026-07-08",
    cover: images.trades.electricite,
    coverAlt: "Tableau électrique moderne avec disjoncteurs repérés",
    intro:
      "Une installation électrique vieillit, se modifie au fil des aménagements et finit parfois par ne plus correspondre aux usages. La mise en conformité vise un objectif simple : garantir la sécurité des personnes et des biens, et la continuité de service de vos équipements.",
    sections: [
      {
        id: "quand",
        title: "Quand faut-il envisager une mise en conformité ?",
        blocks: [
          {
            type: "ul",
            items: [
              "L'installation a plus de quinze ou vingt ans et n'a jamais été rénovée.",
              "Des circuits ont été ajoutés au fil du temps sans mise à jour du tableau.",
              "Les disjoncteurs se déclenchent régulièrement.",
              "Le tableau n'est plus repéré ou les schémas ne sont pas disponibles.",
              "Vous changez d'activité, agrandissez vos locaux ou ajoutez des équipements puissants.",
              "Un assureur ou un organisme de contrôle a relevé des anomalies.",
            ],
          },
        ],
      },
      {
        id: "points-cles",
        title: "Les points vérifiés lors d'un diagnostic",
        blocks: [
          { type: "h3", text: "La mise à la terre" },
          {
            type: "p",
            text: "Une prise de terre efficace et des liaisons équipotentielles correctes sont la base de la protection des personnes contre les contacts indirects. Nous mesurons la valeur de la terre et vérifions la continuité des conducteurs de protection.",
          },
          { type: "h3", text: "Les dispositifs de protection" },
          {
            type: "p",
            text: "Chaque circuit doit être protégé contre les surcharges et les courts-circuits par un disjoncteur adapté à la section des câbles. Les dispositifs différentiels protègent les personnes ; leur bon fonctionnement doit être testé.",
          },
          { type: "h3", text: "Le tableau électrique" },
          {
            type: "p",
            text: "Un tableau conforme est accessible, protégé, ventilé et clairement repéré. Les connexions doivent être serrées : un desserrage provoque des échauffements, première cause d'incendie d'origine électrique.",
          },
          { type: "h3", text: "Les canalisations et l'éclairage de sécurité" },
          {
            type: "p",
            text: "Nous contrôlons l'état des câbles, des conduits et des boîtes de dérivation, ainsi que l'éclairage de sécurité dans les établissements recevant du public, indispensable pour l'évacuation.",
          },
        ],
      },
      {
        id: "thermographie",
        title: "La thermographie, un outil précieux",
        blocks: [
          {
            type: "p",
            text: "La thermographie infrarouge permet de détecter, sans coupure, les points chauds dans un tableau : connexion desserrée, disjoncteur en surcharge, déséquilibre entre phases. C'est un excellent outil de maintenance préventive, particulièrement adapté aux hôtels et sites industriels où l'on cherche à éviter toute interruption.",
          },
          {
            type: "quote",
            text: "Un point chaud détecté aujourd'hui, c'est une panne ou un départ de feu évité demain.",
          },
        ],
      },
      {
        id: "deroulement",
        title: "Comment se déroulent les travaux ?",
        blocks: [
          {
            type: "p",
            text: "Après le diagnostic, nous remettons une liste de travaux hiérarchisée : les points de sécurité immédiate, puis les améliorations recommandées. Les travaux sont organisés par zones ou par circuits, afin de limiter les coupures, et peuvent être réalisés en dehors des heures d'activité.",
          },
          {
            type: "p",
            text: "À l'issue des travaux, l'installation est testée, le tableau est repéré et les schémas sont mis à jour. Une maintenance électrique périodique permet ensuite de conserver ce niveau de sécurité dans le temps.",
          },
          {
            type: "p",
            text: "Vous avez un doute sur votre installation ? Nos électriciens réalisent un diagnostic et vous remettent un devis détaillé, gratuitement.",
          },
        ],
      },
    ],
  },
  {
    slug: "optimiser-production-eau-chaude-hotel",
    title: "Optimiser la production d'eau chaude dans un hôtel",
    excerpt:
      "Pics de consommation, bouclage, températures, énergie : les leviers pour une eau chaude toujours disponible et moins coûteuse.",
    category: "Plomberie & Chauffage",
    service: "plomberie-et-chauffage",
    readingTime: 6,
    date: "2026-09-15",
    cover: images.trades.plomberieChauffage,
    coverAlt: "Ballons de production d'eau chaude sanitaire dans une chaufferie d'hôtel",
    intro:
      "Une douche qui tarde à chauffer ou une eau tiède à 8 heures du matin : pour un client d'hôtel, l'eau chaude est une évidence, et son absence une source immédiate d'insatisfaction. Pour l'exploitant, c'est aussi l'un des premiers postes de consommation énergétique. Bonne nouvelle : confort et économies vont ici dans le même sens.",
    sections: [
      {
        id: "comprendre-besoins",
        title: "Comprendre les besoins réels",
        blocks: [
          {
            type: "p",
            text: "La consommation d'eau chaude d'un hôtel n'est pas régulière : elle se concentre sur deux pics, le matin entre 7 h et 10 h et le soir en fin de journée. S'y ajoutent les besoins de la cuisine, de la blanchisserie et, le cas échéant, du spa.",
          },
          {
            type: "p",
            text: "Le dimensionnement doit donc combiner deux paramètres : la puissance de production et le volume de stockage. Une production sous-dimensionnée ne suit pas le pic du matin ; un stockage surdimensionné entraîne des pertes thermiques inutiles toute la journée.",
          },
        ],
      },
      {
        id: "bouclage",
        title: "Le bouclage : clé du confort",
        blocks: [
          {
            type: "p",
            text: "Dans un bâtiment étendu, l'eau chaude refroidit dans les canalisations lorsqu'elle ne circule pas. Le bouclage fait circuler en permanence l'eau chaude dans une boucle reliant la production aux étages, afin qu'elle soit disponible quasi immédiatement à chaque robinet.",
          },
          {
            type: "p",
            text: "Un bouclage mal équilibré se traduit par des chambres où l'eau arrive vite et d'autres où il faut attendre plusieurs minutes. L'équilibrage des réseaux, le contrôle du circulateur et le calorifugeage des canalisations sont des interventions simples aux effets très visibles.",
          },
        ],
      },
      {
        id: "temperatures",
        title: "Températures et sécurité sanitaire",
        blocks: [
          {
            type: "p",
            text: "La gestion des températures répond à un double enjeu : limiter le développement des bactéries dans les réseaux et éviter les risques de brûlure aux points de puisage. Les bonnes pratiques consistent à maintenir une température élevée en production et dans la boucle, puis à mitiger l'eau au plus près des usages.",
          },
          {
            type: "ul",
            items: [
              "Contrôler régulièrement les températures de production et de retour de boucle.",
              "Purger les points de puisage peu utilisés, notamment dans les chambres inoccupées.",
              "Détartrer les ballons et échangeurs selon la dureté de l'eau.",
              "Vérifier les mitigeurs thermostatiques et les soupapes de sécurité.",
            ],
          },
        ],
      },
      {
        id: "leviers-energie",
        title: "Les leviers d'économie d'énergie",
        blocks: [
          { type: "h3", text: "Le calorifugeage" },
          {
            type: "p",
            text: "Des canalisations et ballons non isolés perdent de la chaleur en continu. Le calorifugeage est l'un des investissements les plus rapidement rentabilisés.",
          },
          { type: "h3", text: "La pompe à chaleur" },
          {
            type: "p",
            text: "Les pompes à chaleur dédiées à l'eau chaude sanitaire offrent un excellent rendement sous le climat de Marrakech. Elles peuvent fonctionner seules ou en complément d'une production existante.",
          },
          { type: "h3", text: "Le solaire thermique" },
          {
            type: "p",
            text: "Avec un ensoleillement exceptionnel, Marrakech se prête particulièrement bien au solaire thermique, qui peut couvrir une part importante des besoins annuels en eau chaude.",
          },
          { type: "h3", text: "La récupération de chaleur" },
          {
            type: "p",
            text: "La chaleur rejetée par les groupes de climatisation ou de froid peut être récupérée pour préchauffer l'eau sanitaire. Une solution particulièrement intéressante en été, quand la climatisation fonctionne à plein.",
          },
          {
            type: "quote",
            text: "L'eau chaude la plus économique est celle que l'on ne perd pas : isoler, équilibrer et réguler avant d'investir dans de nouveaux équipements.",
          },
        ],
      },
      {
        id: "accompagnement",
        title: "Notre accompagnement",
        blocks: [
          {
            type: "p",
            text: "Novare réalise un diagnostic complet de votre production d'eau chaude : mesure des températures, analyse des consommations, contrôle du bouclage et de l'état des équipements. Nous vous proposons ensuite un plan d'action priorisé, des réglages immédiats aux investissements à plus long terme.",
          },
          {
            type: "p",
            text: "La maintenance régulière de la production et des réseaux, intégrée à un contrat, garantit ensuite un confort constant à vos clients. Contactez-nous pour un diagnostic gratuit de votre installation.",
          },
        ],
      },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postCategories = ["Tous", ...Array.from(new Set(posts.map((p) => p.category)))];
