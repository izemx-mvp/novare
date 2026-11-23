// Rule-based "Assistant Novare": intents, keyword matching and the guided quote flow.
// Pure data + functions, no network calls.

import { site } from "@/config/site";
import type { ServiceSlug } from "@/data/services";
import { establishmentOptions, requestTypeOptions, tradeOptions, type Option } from "@/lib/quote";
import { isMoroccanPhone, normalize } from "@/lib/text";

export type IntentId =
  | "greeting"
  | "thanks"
  | "goodbye"
  | "quote"
  | "price"
  | "trades"
  | "urgent"
  | "maintenance"
  | "references"
  | "zone"
  | "hours"
  | "contact"
  | "careers"
  | ServiceSlug;

export type ChatAction =
  | { kind: "intent"; intent: IntentId }
  | { kind: "startQuote"; trade?: ServiceSlug | undefined }
  | { kind: "quoteAnswer"; value: string; label: string }
  | { kind: "cancel" }
  | { kind: "restart" }
  | { kind: "navigate"; href: string };

export type Chip = { label: string; action: ChatAction };

export type ChatContent =
  | { type: "text"; text: string }
  | { type: "service"; slug: ServiceSlug }
  | { type: "services" }
  | { type: "references" }
  | { type: "contact"; urgent?: boolean }
  | { type: "tip"; title: string; text: string }
  | { type: "recap"; fields: [string, string][]; summary: string }
  | { type: "link"; label: string; href: string };

export type BotReply = { contents: ChatContent[]; chips?: Chip[] | undefined };

// ---------- Chips ----------

export const mainChips: Chip[] = [
  { label: "Demander un devis", action: { kind: "startQuote" } },
  { label: "Nos métiers", action: { kind: "intent", intent: "trades" } },
  { label: "Panne urgente", action: { kind: "intent", intent: "urgent" } },
  { label: "Contrat de maintenance", action: { kind: "intent", intent: "maintenance" } },
  { label: "Nos références", action: { kind: "intent", intent: "references" } },
  { label: "Nous contacter", action: { kind: "intent", intent: "contact" } },
];

const otherQuestion: Chip = { label: "Autre question", action: { kind: "restart" } };

const tradeChips: Chip[] = tradeOptions
  .filter((o) => o.value !== "plusieurs")
  .map((o) => ({ label: o.label, action: { kind: "intent", intent: o.value as ServiceSlug } }));

export const welcome: BotReply = {
  contents: [
    { type: "text", text: "Bonjour 👋 Je suis l'assistant Novare. Comment puis-je vous aider ?" },
  ],
  chips: mainChips,
};

export const fallback: BotReply = {
  contents: [
    { type: "text", text: "Je n'ai pas bien compris. Voici ce que je peux faire pour vous :" },
    { type: "contact" },
  ],
  chips: mainChips,
};

// ---------- Keyword matching ----------

const tradeKeywords: Record<ServiceSlug, string[]> = {
  climatisation: [
    "clim",
    "climatisation",
    "climatiseur",
    "vrv",
    "vrf",
    "gainable",
    "split",
    "cassette",
    "pompe a chaleur",
    "pac",
    "eau glacee",
    "air conditionne",
    "chaud dans",
    "rafraichir",
  ],
  "plomberie-et-chauffage": [
    "plomberie",
    "plombier",
    "fuite",
    "eau chaude",
    "chauffage",
    "chaudiere",
    "ballon",
    "sanitaire",
    "robinet",
    "tuyau",
    "canalisation",
    "chauffe eau",
  ],
  "froid-cuisine-industrielle": [
    "froid",
    "chambre froide",
    "frigo",
    "frigorifique",
    "refrigeration",
    "congelateur",
    "cuisine",
    "cuisine industrielle",
    "vitrine",
    "surgele",
  ],
  "maintenance-multi-technique": [
    "multi technique",
    "multitechnique",
    "gestion technique",
    "facility",
  ],
  electricite: [
    "electricite",
    "electrique",
    "electricien",
    "panne courant",
    "courant",
    "tableau",
    "disjoncteur",
    "eclairage",
    "lumiere",
    "conformite",
    "prise",
    "coupure",
  ],
};

const intentKeywords: { id: IntentId; words: string[] }[] = [
  {
    id: "urgent",
    words: [
      "urgence",
      "urgent",
      "panne",
      "depannage",
      "vite",
      "rapidement",
      "en panne",
      "ne marche plus",
      "ne fonctionne plus",
      "secours",
      "immediat",
      "maintenant",
    ],
  },
  {
    id: "price",
    words: ["prix", "tarif", "tarifs", "cout", "combien", "cher", "budget", "montant"],
  },
  { id: "quote", words: ["devis", "estimation", "proposition", "chiffrage", "chiffrer"] },
  {
    id: "maintenance",
    words: [
      "maintenance",
      "contrat",
      "entretien",
      "entretenir",
      "preventif",
      "preventive",
      "abonnement",
      "suivi",
    ],
  },
  {
    id: "references",
    words: [
      "reference",
      "references",
      "client",
      "clients",
      "hotels",
      "mamounia",
      "mandarin",
      "fairmont",
      "saadi",
      "mcdonald",
      "anosta",
      "projets",
      "realisations",
    ],
  },
  {
    id: "zone",
    words: [
      "zone",
      "ville",
      "marrakech",
      "maroc",
      "casablanca",
      "agadir",
      "rabat",
      "region",
      "deplacez",
      "intervenez ou",
      "ou intervenez",
    ],
  },
  {
    id: "hours",
    words: [
      "horaire",
      "horaires",
      "ouvert",
      "ouverture",
      "heure",
      "dimanche",
      "samedi",
      "week end",
      "weekend",
      "ferme",
    ],
  },
  {
    id: "careers",
    words: [
      "carriere",
      "emploi",
      "recrutement",
      "recrutez",
      "job",
      "travail",
      "candidature",
      "postuler",
      "cv",
      "stage",
    ],
  },
  {
    id: "contact",
    words: [
      "contact",
      "contacter",
      "telephone",
      "tel",
      "numero",
      "appeler",
      "email",
      "mail",
      "adresse",
      "whatsapp",
      "joindre",
      "bureau",
    ],
  },
  {
    id: "trades",
    words: [
      "metier",
      "metiers",
      "services",
      "prestations",
      "que faites vous",
      "activites",
      "expertises",
    ],
  },
  { id: "thanks", words: ["merci", "parfait", "super", "genial", "top"] },
  {
    id: "goodbye",
    words: ["au revoir", "bye", "a bientot", "bonne journee", "bonne soiree", "ciao"],
  },
  { id: "greeting", words: ["bonjour", "salut", "hello", "bonsoir", "salam", "coucou", "hey"] },
];

function hits(text: string, words: string[]): number {
  const padded = ` ${text} `;
  return words.reduce(
    (count, word) =>
      padded.includes(` ${word} `) || (word.length > 4 && padded.includes(word))
        ? count + 1
        : count,
    0,
  );
}

export function detectTrade(input: string): ServiceSlug | undefined {
  const text = normalize(input);
  let best: ServiceSlug | undefined;
  let bestScore = 0;
  for (const [slug, words] of Object.entries(tradeKeywords) as [ServiceSlug, string[]][]) {
    const score = hits(text, words);
    if (score > bestScore) {
      best = slug;
      bestScore = score;
    }
  }
  return best;
}

/** Returns the most relevant intent for a free-text message. */
export function matchIntent(input: string): IntentId | undefined {
  const text = normalize(input);
  if (!text) return undefined;
  const trade = detectTrade(text);
  const scores = new Map<IntentId, number>();
  for (const { id, words } of intentKeywords) {
    const score = hits(text, words);
    if (score > 0) scores.set(id, score);
  }
  // Priority: emergencies first, then prices, then explicit quote requests.
  if (scores.has("urgent")) return "urgent";
  if (scores.has("price")) return "price";
  if (scores.has("quote")) return "quote";
  if (scores.has("maintenance") && trade !== "maintenance-multi-technique") {
    return trade && !text.includes("contrat") ? trade : "maintenance";
  }
  if (trade) return trade;
  let best: IntentId | undefined;
  let bestScore = 0;
  for (const [id, score] of scores) {
    if (score > bestScore) {
      best = id;
      bestScore = score;
    }
  }
  return best;
}

// ---------- Responses ----------

const tradeIntro: Record<ServiceSlug, string> = {
  climatisation:
    "Nous étudions, installons et entretenons tous les systèmes de climatisation : gainable, murale, cassette, VRV/VRF, pompes à chaleur air-air et air-eau, groupes d'eau glacée. Avec un objectif : un confort stable et une consommation maîtrisée.",
  "plomberie-et-chauffage":
    "Nos plombiers-chauffagistes prennent en charge vos réseaux d'eau chaude et froide, vos sanitaires, le chauffage centralisé et la production d'eau chaude, de l'étude au dépannage.",
  "froid-cuisine-industrielle":
    "Chambres froides positives et négatives, réfrigération professionnelle, cuisines industrielles : nous garantissons la chaîne du froid avec des interventions rapides pour limiter les interruptions.",
  "maintenance-multi-technique":
    "Avec la maintenance multi-technique, Novare devient votre interlocuteur unique pour la climatisation, la plomberie, le froid et l'électricité : préventif, correctif, diagnostic et rapports.",
  electricite:
    "Installations basse tension, tableaux et armoires, éclairage intérieur et extérieur, recherche de pannes et mise en conformité : une électricité sûre pour tout votre bâtiment.",
};

const safetyTips: Record<ServiceSlug, string> = {
  climatisation:
    "Coupez l'unité au disjoncteur si elle fuit ou dégage une odeur inhabituelle, et évitez de la relancer plusieurs fois.",
  "plomberie-et-chauffage":
    "Fermez la vanne d'arrêt de la zone concernée et coupez l'électricité si l'eau approche d'appareils électriques.",
  "froid-cuisine-industrielle":
    "Gardez la porte fermée, notez la température affichée et transférez les produits sensibles vers un autre équipement froid.",
  "maintenance-multi-technique":
    "Sécurisez la zone, coupez l'alimentation de l'équipement concerné si c'est sans risque, puis appelez-nous.",
  electricite:
    "Ne réarmez pas un disjoncteur qui retombe aussitôt. En cas d'odeur de brûlé, coupez le général si vous pouvez le faire sans risque.",
};

export function intentReply(
  intent: IntentId,
  context: { trade?: ServiceSlug | undefined } = {},
): BotReply {
  switch (intent) {
    case "greeting":
      return {
        contents: [
          {
            type: "text",
            text: "Bonjour ! Ravi de vous accueillir. Que puis-je faire pour vous ?",
          },
        ],
        chips: mainChips,
      };
    case "thanks":
      return {
        contents: [{ type: "text", text: "Avec plaisir ! Puis-je vous aider pour autre chose ?" }],
        chips: mainChips,
      };
    case "goodbye":
      return {
        contents: [
          {
            type: "text",
            text: "Merci de votre visite et à bientôt chez Novare. Nos équipes restent joignables au besoin.",
          },
          { type: "contact" },
        ],
      };
    case "quote":
      return {
        contents: [
          {
            type: "text",
            text: "Avec plaisir ! Je vous pose quelques questions rapides pour préparer votre demande de devis.",
          },
        ],
      };
    case "price":
      return {
        contents: [
          {
            type: "text",
            text: "Chaque installation est différente : nous ne communiquons donc pas de prix standard. Bonne nouvelle, chaque devis est gratuit et établi sur mesure, après échange avec vous et, si besoin, une visite technique.",
          },
        ],
        chips: [
          { label: "Demander un devis gratuit", action: { kind: "startQuote" } },
          otherQuestion,
        ],
      };
    case "trades":
      return {
        contents: [
          {
            type: "text",
            text: "Novare intervient sur 5 métiers techniques, de l'installation à la maintenance :",
          },
          { type: "services" },
        ],
        chips: tradeChips,
      };
    case "urgent": {
      const trade = context.trade;
      return {
        contents: [
          {
            type: "text",
            text: "Pour une panne urgente, le plus rapide est de nous appeler directement. Nos interventions d'urgence sont assurées 7j/7.",
          },
          { type: "contact", urgent: true },
          ...(trade
            ? [
                {
                  type: "tip" as const,
                  title: "En attendant notre technicien",
                  text: safetyTips[trade],
                },
              ]
            : [
                {
                  type: "tip" as const,
                  title: "En attendant notre technicien",
                  text: "Sécurisez la zone, coupez l'alimentation de l'équipement concerné si c'est sans risque et notez les éventuels messages d'erreur.",
                },
              ]),
        ],
        chips: [
          {
            label: "Page dépannage urgent",
            action: { kind: "navigate", href: "/fr/depannage-urgent" },
          },
          otherQuestion,
        ],
      };
    }
    case "maintenance":
      return {
        contents: [
          {
            type: "text",
            text: "Nos contrats de maintenance (Essentiel, Confort, Premium) combinent visites préventives, intervention prioritaire et rapports après chaque passage. Ils couvrent un ou plusieurs métiers selon vos besoins.",
          },
          {
            type: "link",
            label: "Découvrir les contrats de maintenance",
            href: "/fr/contrats-de-maintenance",
          },
        ],
        chips: [
          {
            label: "Recevoir une proposition",
            action: { kind: "startQuote", trade: "maintenance-multi-technique" },
          },
          otherQuestion,
        ],
      };
    case "references":
      return {
        contents: [
          {
            type: "text",
            text: "Plus de 1286 projets réalisés. Parmi les établissements qui nous font confiance :",
          },
          { type: "references" },
          { type: "link", label: "Voir toutes nos références", href: "/fr/nos-references" },
        ],
        chips: [{ label: "Demander un devis", action: { kind: "startQuote" } }, otherQuestion],
      };
    case "zone":
      return {
        contents: [
          {
            type: "text",
            text: `Nous sommes basés à Marrakech (${site.address.full}) et intervenons à Marrakech et dans sa région. Pour les projets d'envergure ou les clients sous contrat, nous pouvons aussi intervenir ailleurs au Maroc.`,
          },
        ],
        chips: [
          { label: "Demander un devis", action: { kind: "startQuote" } },
          { label: "Nous contacter", action: { kind: "intent", intent: "contact" } },
        ],
      };
    case "hours":
      return {
        contents: [
          {
            type: "text",
            text: `Nos équipes sont joignables ${site.hours.regular.replace("Lun – Sam :", "du lundi au samedi, de").replace(" – ", " à ")}. ${site.hours.emergency}.`,
          },
          { type: "contact" },
        ],
        chips: [otherQuestion],
      };
    case "contact":
      return {
        contents: [
          {
            type: "text",
            text: `Vous pouvez nous joindre par téléphone, WhatsApp ou email. Notre bureau : ${site.address.full}.`,
          },
          { type: "contact" },
        ],
        chips: [{ label: "Demander un devis", action: { kind: "startQuote" } }, otherQuestion],
      };
    case "careers":
      return {
        contents: [
          {
            type: "text",
            text: "Nous recrutons régulièrement des techniciens frigoristes, CVC, électriciens, plombiers-chauffagistes et techniciens de maintenance multi-technique.",
          },
          { type: "link", label: "Voir les opportunités", href: "/fr/carrieres" },
        ],
        chips: [otherQuestion],
      };
    default:
      return {
        contents: [
          { type: "text", text: tradeIntro[intent] },
          { type: "service", slug: intent },
        ],
        chips: [
          { label: "Devis pour ce service", action: { kind: "startQuote", trade: intent } },
          otherQuestion,
        ],
      };
  }
}

// ---------- Guided quote flow ----------

export type QuoteStepId = "trade" | "type" | "establishment" | "city" | "name" | "phone";

export type QuoteStep = {
  id: QuoteStepId;
  label: string;
  question: string;
  options?: Option[];
  placeholder?: string;
  validate?: (value: string) => string | null;
};

export const quoteSteps: QuoteStep[] = [
  {
    id: "trade",
    label: "Métier",
    question: "Pour quel métier souhaitez-vous un devis ?",
    options: tradeOptions,
  },
  {
    id: "type",
    label: "Type de demande",
    question: "Quel est le type de votre demande ?",
    options: requestTypeOptions,
  },
  {
    id: "establishment",
    label: "Établissement",
    question: "Quel type d'établissement est concerné ?",
    options: establishmentOptions,
  },
  {
    id: "city",
    label: "Ville",
    question: "Dans quelle ville se situe le site ?",
    placeholder: "Ex. Marrakech",
    validate: (v) => (v.trim().length >= 2 ? null : "Indiquez une ville, par exemple Marrakech."),
  },
  {
    id: "name",
    label: "Nom",
    question: "Quel est votre nom ?",
    placeholder: "Votre nom",
    validate: (v) => (v.trim().length >= 2 ? null : "Indiquez votre nom (2 caractères minimum)."),
  },
  {
    id: "phone",
    label: "Téléphone",
    question: "Enfin, à quel numéro pouvons-nous vous rappeler ?",
    placeholder: "06 12 34 56 78",
    validate: (v) =>
      isMoroccanPhone(v)
        ? null
        : "Ce numéro ne semble pas valide. Exemple : 06 12 34 56 78 ou +212 6 12 34 56 78.",
  },
];
