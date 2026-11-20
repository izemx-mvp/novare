export const site = {
  name: "Novare Solutions Techniques",
  shortName: "Novare",
  location: "Marrakech, Maroc",
  address: "107, Hay Almassarii, étage 1, bureau 1, Marrakech",
  phones: ["+212 667 620 456", "+212 662 605 161", "+212 524 355 657"],
  email: "contact@novare.ma",
  whatsapp: "212667620456",
  mapUrl:
    "https://maps.google.com/maps?q=Hay%20Almassarii%20Marrakech&t=&z=14&ie=UTF8&iwloc=&output=embed",
} as const;

export const phoneHref = (phone: string) => `tel:${phone.replaceAll(" ", "")}`;

export const whatsappHref = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;