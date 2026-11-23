import { images } from "@/config/images";
import { allPhones, site } from "@/config/site";

type JsonLd = Record<string, unknown>;

export type Crumb = { label: string; href: string };

export type PageHeadInput = {
  title: string;
  description: string;
  path: string;
  image?: string | undefined;
  type?: "website" | "article" | undefined;
  jsonLd?: JsonLd[] | undefined;
  noindex?: boolean | undefined;
};

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${site.domain}${path.startsWith("/") ? path : `/${path}`}`;

/** Builds the TanStack Router head() payload for a page. */
export function pageHead({
  title,
  description,
  path,
  image,
  type = "website",
  jsonLd = [],
  noindex,
}: PageHeadInput) {
  const fullTitle = title.includes("Novare") ? title : site.seo.titleTemplate.replace("%s", title);
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? images.og);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:locale", content: site.seo.locale },
      { property: "og:site_name", content: site.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    areaServed: { "@type": "City", name: site.city },
    provider: { "@type": "HVACBusiness", name: site.name, url: site.domain },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    datePublished: input.date,
    dateModified: input.date,
    mainEntityOfPage: absoluteUrl(input.path),
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(images.logo) },
    },
  };
}

export function localBusinessJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${site.domain}/#business`,
    name: site.name,
    description: site.pitch,
    url: site.domain,
    logo: absoluteUrl(images.logo),
    image: absoluteUrl(images.og),
    email: site.email,
    telephone: site.phones.landline.tel,
    contactPoint: allPhones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.tel,
      contactType: "customer service",
      areaServed: "MA",
      availableLanguage: ["French", "Arabic"],
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: { "@type": "City", name: site.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    sameAs: Object.values(site.socials).filter(Boolean),
  };
}
