import type { Faq } from "@/data/services";
import { services } from "@/data/services";
import { maintenanceFaqs } from "@/data/maintenance";

export type FaqCategory = { id: string; label: string; faqs: Faq[] };

export const generalFaqs: Faq[] = [
  {
    question: "Dans quelle zone intervenez-vous ?",
    answer:
      "Nous intervenons à Marrakech et dans sa région. Pour les projets d'envergure ou les clients sous contrat, nous pouvons intervenir dans d'autres villes du Maroc : contactez-nous pour en discuter.",
  },
  {
    question: "Quels sont vos horaires ?",
    answer:
      "Nos équipes sont joignables du lundi au samedi, de 8h00 à 19h00. Pour les urgences, nous assurons des interventions 7j/7.",
  },
  {
    question: "Le devis est-il gratuit ?",
    answer:
      "Oui. Tous nos devis sont gratuits et établis sur mesure, après échange avec vous et, si nécessaire, une visite technique.",
  },
  {
    question: "Quels types d'établissements accompagnez-vous ?",
    answer:
      "Hôtels et palaces, restaurants et CHR, résidences et villas, bureaux et commerces, ainsi que des sites industriels.",
  },
  {
    question: "Travaillez-vous avec des particuliers ?",
    answer:
      "Oui. Nous accompagnons aussi les particuliers pour leurs villas, riads et appartements, en installation comme en maintenance.",
  },
];

export const quoteFaqs: Faq[] = [
  {
    question: "Comment demander un devis ?",
    answer:
      "Remplissez le formulaire de demande de devis, écrivez-nous sur WhatsApp ou appelez-nous. Nous revenons vers vous rapidement pour préciser votre besoin.",
  },
  {
    question: "Combien de temps faut-il pour recevoir un devis ?",
    answer:
      "Pour une demande simple, nous vous transmettons généralement une proposition sous quelques jours. Pour un projet nécessitant une étude technique, le délai est fixé avec vous après la visite.",
  },
  {
    question: "Pourquoi ne communiquez-vous pas de prix en ligne ?",
    answer:
      "Chaque installation est différente : surface, équipements existants, contraintes du bâtiment, niveau de service attendu. Un devis sur mesure garantit un prix juste, sans mauvaise surprise.",
  },
  {
    question: "Une visite technique est-elle nécessaire ?",
    answer:
      "Pour les projets d'installation et les contrats de maintenance, une visite permet d'établir une proposition précise. Pour un dépannage, un premier échange téléphonique suffit souvent.",
  },
];

export const emergencyFaqs: Faq[] = [
  {
    question: "Que faire en cas de panne urgente ?",
    answer:
      "Appelez directement l'un de nos numéros mobiles ou écrivez-nous sur WhatsApp. Décrivez la panne et l'équipement concerné : nous vous indiquons les premiers gestes et organisons l'intervention.",
  },
  {
    question: "Intervenez-vous le week-end ?",
    answer:
      "Oui. Les interventions d'urgence sont assurées 7j/7, en priorité pour nos clients sous contrat de maintenance.",
  },
  {
    question: "Quelles pannes sont considérées comme urgentes ?",
    answer:
      "Une panne de froid menaçant des marchandises, une fuite d'eau importante, une coupure électrique, une absence totale de climatisation ou d'eau chaude dans un établissement recevant du public.",
  },
];

export const faqCategories: FaqCategory[] = [
  { id: "general", label: "Général", faqs: generalFaqs },
  { id: "devis", label: "Devis", faqs: quoteFaqs },
  { id: "urgence", label: "Urgences", faqs: emergencyFaqs },
  { id: "maintenance", label: "Contrats", faqs: maintenanceFaqs },
  ...services.map((service) => ({
    id: service.slug,
    label: service.shortName,
    faqs: service.faqs,
  })),
];

export const allFaqs: Faq[] = faqCategories.flatMap((c) => c.faqs);
