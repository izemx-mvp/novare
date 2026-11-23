/** Lowercase, strip accents and punctuation: used for search and chatbot matching. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Moroccan phone numbers: 06/07/05 + 8 digits, or +212 / 00212 prefix. */
export function isMoroccanPhone(input: string): boolean {
  const digits = input.replace(/[\s.\-()]/g, "");
  return /^(?:(?:\+|00)212|0)[5-7]\d{8}$/.test(digits);
}

export function formatDateFr(iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
