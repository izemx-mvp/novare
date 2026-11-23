// Company identity, contact channels, navigation and SEO defaults.
// Everything a non-developer may want to edit lives here.

export type Phone = { label: string; display: string; tel: string };

export const site = {
  name: "Novare Solutions Techniques",
  shortName: "Novare",
  legalName: "Novare Solutions Techniques",
  tagline: "Solutions techniques fiables pour vos bâtiments.",
  pitch:
    "Installation, maintenance et optimisation des équipements techniques des hôtels, restaurants, résidences, bureaux et sites industriels à Marrakech.",
  domain: "https://novare.ma",
  city: "Marrakech",
  country: "Maroc",
  address: {
    street: "107, Hay Almassarii, étage 1, bureau 1",
    city: "Marrakech",
    country: "Maroc",
    countryCode: "MA",
    full: "107, Hay Almassarii, étage 1, bureau 1, Marrakech",
  },
  geo: { lat: 31.6295, lng: -7.9811 },
  phones: {
    mobile1: { label: "Mobile", display: "+212 667 620 456", tel: "+212667620456" },
    mobile2: { label: "Mobile", display: "+212 662 605 161", tel: "+212662605161" },
    landline: { label: "Fixe", display: "+212 524 355 657", tel: "+212524355657" },
  } satisfies Record<string, Phone>,
  email: "contact@novare.ma",
  whatsapp: { number: "212667620456", display: "+212 667 620 456" },
  hours: {
    regular: "Lun – Sam : 8h00 – 19h00",
    emergency: "Interventions d'urgence 7j/7",
  },
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  figures: [
    { value: 1286, suffix: "+", label: "projets réalisés" },
    { value: 10, suffix: "+", label: "ans d'expérience" },
    { value: 100, suffix: " %", label: "équipe qualifiée" },
    { value: 100, suffix: " %", label: "clients satisfaits" },
  ],
  mapsLink: "https://www.google.com/maps/search/?api=1&query=107%20Hay%20Almassarii%20Marrakech",
  mapsEmbed:
    "https://maps.google.com/maps?q=107%20Hay%20Almassarii%20Marrakech&t=&z=15&ie=UTF8&iwloc=&output=embed",
  seo: {
    titleTemplate: "%s | Novare Solutions Techniques",
    defaultTitle:
      "Novare Solutions Techniques | Climatisation, plomberie, froid et électricité à Marrakech",
    defaultDescription:
      "Novare Solutions Techniques : installation, maintenance et optimisation de climatisation, plomberie, chauffage, froid, cuisines industrielles et électricité pour hôtels, restaurants et entreprises à Marrakech.",
    locale: "fr_MA",
  },
} as const;

export const allPhones: Phone[] = [site.phones.mobile1, site.phones.mobile2, site.phones.landline];

export const telHref = (phone: Phone) => `tel:${phone.tel}`;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${site.whatsapp.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mailtoHref = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const defaultWhatsappMessage = "Bonjour Novare, je souhaite un devis pour…";

// ---------- Navigation ----------

export type NavLink = { label: string; href: string; description?: string };

export const nav = {
  novare: [
    {
      label: "Qui sommes-nous",
      href: "/fr/qui-sommes-nous",
      description: "Notre histoire, nos équipes, nos valeurs",
    },
    {
      label: "Notre méthode",
      href: "/fr/notre-methode",
      description: "De l'étude à l'optimisation, pas à pas",
    },
    { label: "Carrières", href: "/fr/carrieres", description: "Rejoignez nos équipes techniques" },
  ] satisfies NavLink[],
  main: [
    { label: "Contrats de maintenance", href: "/fr/contrats-de-maintenance" },
    { label: "Références", href: "/fr/nos-references" },
    { label: "Conseils", href: "/fr/conseils" },
    { label: "Contact & Devis", href: "/fr/contact-et-devis" },
  ] satisfies NavLink[],
  quick: [
    { label: "Nos métiers", href: "/fr/nos-metiers" },
    { label: "Secteurs", href: "/fr/secteurs" },
    { label: "Contrats de maintenance", href: "/fr/contrats-de-maintenance" },
    { label: "Dépannage urgent", href: "/fr/depannage-urgent" },
    { label: "Nos références", href: "/fr/nos-references" },
    { label: "Conseils", href: "/fr/conseils" },
    { label: "FAQ", href: "/fr/faq" },
    { label: "Carrières", href: "/fr/carrieres" },
  ] satisfies NavLink[],
  legal: [
    { label: "Mentions légales", href: "/fr/mentions-legales" },
    { label: "Politique de confidentialité", href: "/fr/politique-de-confidentialite" },
  ] satisfies NavLink[],
};

export const CONTACT_PATH = "/fr/contact-et-devis";
