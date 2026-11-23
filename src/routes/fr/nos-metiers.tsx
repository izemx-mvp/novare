import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { simpleHead } from "@/lib/heads";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { TextMarquee } from "@/components/site/TextMarquee";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { ImageReveal, Reveal } from "@/components/site/Reveal";
import { SmartImage } from "@/components/site/SmartImage";

export const Route = createFileRoute("/fr/nos-metiers")({
  head: () =>
    simpleHead({
      title: "Nos métiers : climatisation, plomberie, froid, maintenance, électricité",
      description:
        "Les 5 métiers de Novare Solutions Techniques à Marrakech : climatisation, plomberie & chauffage, froid & cuisine industrielle, maintenance multi-technique et électricité.",
      path: "/fr/nos-metiers",
      label: "Nos métiers",
    }),
  component: TradesPage,
});

function TradesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Nos métiers", href: "/fr/nos-metiers" },
        ]}
        eyebrow="Nos métiers"
        title={
          <>
            Cinq expertises, <span className="text-gradient-light">une seule équipe.</span>
          </>
        }
        description="Climatisation, plomberie, froid, maintenance et électricité : Novare réunit les métiers techniques essentiels au bon fonctionnement de vos bâtiments, de l'étude à la maintenance."
        lines="circuit"
      >
        <Btn
          href="/fr/contact-et-devis"
          size="lg"
          magnetic
          icon={<ArrowRight className="size-5" />}
        >
          Demander un devis
        </Btn>
      </PageHero>

      <section className="section-y">
        <div className="container-site space-y-24 lg:space-y-32">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.slug}
                className="group relative grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                <div className={cn("relative min-w-0", reverse && "lg:order-2")}>
                  <ImageReveal className="overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
                    <SmartImage
                      src={service.image}
                      alt={service.imageAlt}
                      aspect="5/4"
                      imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </ImageReveal>
                  {/* floating glass label */}
                  <div className="glass-dark absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/15 py-2.5 pl-2.5 pr-4 text-white sm:bottom-6 sm:left-6">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold">
                      {service.subServices.length} prestations
                    </span>
                  </div>
                </div>
                <Reveal className="relative min-w-0">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 right-0 select-none font-display text-[8rem] font-bold leading-none text-transparent lg:-top-24 lg:text-[11rem]"
                    style={{ WebkitTextStroke: "1px rgb(19 66 134 / 0.12)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-4">
                    <HouseBadge>
                      <Icon className="size-5" />
                    </HouseBadge>
                    <span className="font-display text-sm font-semibold tabular text-steel">
                      {String(index + 1).padStart(2, "0")} / 05
                    </span>
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
                    {service.name}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                    {service.pitch}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {service.subServices.map((s) => (
                      <li
                        key={s.title}
                        className="rounded-full border border-navy/10 bg-offwhite px-3.5 py-1.5 text-sm font-medium text-navy"
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <Btn href={service.path} icon={<ArrowRight className="size-4" />}>
                      Découvrir
                    </Btn>
                    <Btn
                      href="/fr/contact-et-devis"
                      search={{ metier: service.slug }}
                      variant="outline"
                    >
                      Devis pour ce service
                    </Btn>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <TextMarquee className="border-y border-navy/5" />
      <CTABand />
    </>
  );
}
