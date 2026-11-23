import { mailtoHref, whatsappHref } from "@/config/site";
import { services } from "@/data/services";

export type Option = { value: string; label: string };

export const tradeOptions: Option[] = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "plusieurs", label: "Plusieurs métiers" },
];

export const requestTypeOptions: Option[] = [
  { value: "installation", label: "Installation" },
  { value: "maintenance", label: "Maintenance" },
  { value: "urgence", label: "Dépannage urgent" },
  { value: "contrat", label: "Contrat de maintenance" },
  { value: "etude", label: "Étude technique" },
];

export const establishmentOptions: Option[] = [
  { value: "hotel", label: "Hôtel" },
  { value: "restaurant", label: "Restaurant / CHR" },
  { value: "residence", label: "Résidence" },
  { value: "bureau", label: "Bureau / Tertiaire" },
  { value: "industrie", label: "Industrie" },
  { value: "particulier", label: "Particulier" },
];

export const callbackOptions: Option[] = [
  { value: "matin", label: "Matin (8h – 12h)" },
  { value: "midi", label: "Midi (12h – 14h)" },
  { value: "apres-midi", label: "Après-midi (14h – 19h)" },
  { value: "indifferent", label: "Peu importe" },
];

export const labelOf = (options: Option[], value: string | undefined) =>
  options.find((o) => o.value === value)?.label ?? value ?? "";

export const isTradeValue = (value: unknown): value is string =>
  typeof value === "string" && tradeOptions.some((o) => o.value === value);

export const isRequestTypeValue = (value: unknown): value is string =>
  typeof value === "string" && requestTypeOptions.some((o) => o.value === value);

/** Builds a clean, readable French summary for WhatsApp / email. */
export function buildSummary(title: string, lines: [string, string | undefined][]): string {
  const body = lines
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `• ${label} : ${value?.trim()}`)
    .join("\n");
  return `Bonjour Novare,\n\n${title}\n\n${body}\n\nMerci de me recontacter.`;
}

export function sendLinks(subject: string, summary: string) {
  return { whatsapp: whatsappHref(summary), email: mailtoHref(subject, summary) };
}

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  if (url.startsWith("mailto:")) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
