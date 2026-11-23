import type { Sector } from "@/data/sectors";
import type { Service } from "@/data/services";
import { breadcrumbJsonLd, faqJsonLd, pageHead, serviceJsonLd, type Crumb } from "@/lib/seo";

export function tradeHead(service: Service) {
  const crumbs: Crumb[] = [
    { label: "Accueil", href: "/fr" },
    { label: "Nos métiers", href: "/fr/nos-metiers" },
    { label: service.name, href: service.path },
  ];
  return pageHead({
    title: service.seoTitle,
    description: service.seoDescription,
    path: service.path,
    image: service.image,
    jsonLd: [
      serviceJsonLd({
        name: service.name,
        description: service.seoDescription,
        path: service.path,
        image: service.image,
      }),
      faqJsonLd(service.faqs),
      breadcrumbJsonLd(crumbs),
    ],
  });
}

export function sectorHead(sector: Sector) {
  const crumbs: Crumb[] = [
    { label: "Accueil", href: "/fr" },
    { label: "Secteurs", href: "/fr/secteurs" },
    { label: sector.name, href: sector.path },
  ];
  return pageHead({
    title: sector.seoTitle,
    description: sector.seoDescription,
    path: sector.path,
    image: sector.image,
    jsonLd: [faqJsonLd(sector.faqs), breadcrumbJsonLd(crumbs)],
  });
}

/** Simple page head with breadcrumb JSON-LD. */
export function simpleHead(input: {
  title: string;
  description: string;
  path: string;
  label: string;
  image?: string | undefined;
  extra?: Record<string, unknown>[];
}) {
  return pageHead({
    title: input.title,
    description: input.description,
    path: input.path,
    image: input.image,
    jsonLd: [
      breadcrumbJsonLd([
        { label: "Accueil", href: "/fr" },
        { label: input.label, href: input.path },
      ]),
      ...(input.extra ?? []),
    ],
  });
}
