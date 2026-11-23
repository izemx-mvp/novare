import { ArrowRight, Phone } from "lucide-react";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import { referencesBySlugs } from "@/data/references";
import type { Sector } from "@/data/sectors";
import { getService, type Service } from "@/data/services";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { GlowCard } from "@/components/site/GlowCard";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { MaintenanceTeaser } from "@/components/site/MaintenanceTeaser";
import { PageHero } from "@/components/site/PageHero";
import { SectionNav } from "@/components/site/SectionNav";
import { ReferenceGrid } from "@/components/site/ReferenceGrid";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { ServiceTile } from "@/components/site/ServiceCard";

export function SectorPage({ sector }: { sector: Sector }) {
  const Icon = getIcon(sector.icon);
  const solutions = sector.solutions
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
  const refs = referencesBySlugs(sector.references);

  return (
    <>
      <PageHero
        size="lg"
        image={sector.image}
        imageAlt={sector.imageAlt}
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Secteurs", href: "/fr/secteurs" },
          { label: sector.name, href: sector.path },
        ]}
        icon={
          <HouseBadge>
            <Icon className="size-5" />
          </HouseBadge>
        }
        eyebrow="Secteur"
        title={sector.name}
        description={sector.intro}
      >
        <Btn href={CONTACT_PATH} size="lg" magnetic icon={<ArrowRight className="size-5" />}>
          Demander un devis
        </Btn>
        <Btn
          href={telHref(site.phones.mobile1)}
          variant="light"
          size="lg"
          iconLeft={<Phone className="size-5" />}
        >
          {site.phones.mobile1.display}
        </Btn>
      </PageHero>

      <SectionNav
        items={[
          { id: "enjeux", label: "Vos enjeux" },
          { id: "solutions", label: "Nos solutions" },
          ...(refs.length > 0 ? [{ id: "references", label: "Références" }] : []),
          { id: "faq", label: "FAQ" },
        ]}
      />

      <section id="enjeux" className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Vos enjeux"
            title={
              <>
                Ce qui compte <Accent>pour vous</Accent>
              </>
            }
            body="Chaque secteur a ses exigences. Voici celles que nous plaçons au cœur de nos interventions."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sector.challenges.map((c, i) => (
              <StaggerItem key={c.title} className="h-full">
                <GlowCard className="flex h-full flex-col bg-white p-7 shadow-[var(--shadow-soft)]">
                  <span className="font-display text-4xl font-semibold text-gradient tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="solutions" className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nos solutions"
            title="Nos métiers au service de votre activité"
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <ServiceTile service={s} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {refs.length > 0 && (
        <section id="references" className="section-y">
          <div className="container-site">
            <SectionHeading
              eyebrow="Références"
              title="Ils nous font confiance"
              action={
                <Btn
                  href="/fr/nos-references"
                  variant="outline"
                  icon={<ArrowRight className="size-4" />}
                >
                  Toutes nos références
                </Btn>
              }
            />
            <ReferenceGrid items={refs} className="mt-14" />
          </div>
        </section>
      )}

      <MaintenanceTeaser />

      <section id="faq" className="section-y bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions fréquentes"
            body={`Les réponses aux questions les plus fréquentes de nos clients · ${sector.name}.`}
          />
          <Reveal>
            <FAQAccordion faqs={sector.faqs} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
