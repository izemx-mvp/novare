import { ArrowRight, Check, Phone } from "lucide-react";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import { referencesBySlugs } from "@/data/references";
import { services, type Service } from "@/data/services";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { Btn } from "@/components/site/Button";
import { Carousel } from "@/components/site/Carousel";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { QuoteSection } from "@/components/site/QuoteSection";
import { ReferenceGrid } from "@/components/site/ReferenceGrid";
import { Reveal } from "@/components/site/Reveal";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { SectionNav } from "@/components/site/SectionNav";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Stepper } from "@/components/site/Stepper";

/** Shared template for the 5 trade pages, fully driven by services.ts. */
export function TradePage({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);
  const related = referencesBySlugs(service.relatedReferences);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        size="lg"
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Nos métiers", href: "/fr/nos-metiers" },
          { label: service.name, href: service.path },
        ]}
        icon={
          <HouseBadge>
            <Icon className="size-5" />
          </HouseBadge>
        }
        eyebrow="Expertise Novare"
        title={service.name}
        description={service.pitch}
        aside={
          <div className="glass-dark hidden rounded-[1.5rem] border border-white/10 p-7 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
              En bref
            </p>
            <ul className="mt-5 space-y-3.5">
              {service.subServices.slice(0, 5).map((s) => (
                <li key={s.title} className="flex items-center gap-3 text-[0.9375rem] text-white">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary-300">
                    <Check className="size-3.5" />
                  </span>
                  {s.title}
                </li>
              ))}
            </ul>
            <a
              href={telHref(site.phones.mobile1)}
              className="mt-7 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 transition-colors hover:bg-white/10"
            >
              <span className="text-steel-200">Une question technique ?</span>
              <span className="flex items-center gap-2 font-semibold text-white">
                <Phone className="size-4" /> {site.phones.mobile1.display}
              </span>
            </a>
          </div>
        }
      >
        <Btn
          href={CONTACT_PATH}
          search={{ metier: service.slug }}
          size="lg"
          magnetic
          icon={<ArrowRight className="size-5" />}
        >
          Devis pour ce service
        </Btn>
        <Btn
          href={telHref(site.phones.mobile1)}
          variant="light"
          size="lg"
          iconLeft={<Phone className="size-5" />}
        >
          Appeler
        </Btn>
      </PageHero>

      <SectionNav
        items={[
          { id: "approche", label: "Approche" },
          { id: "prestations", label: "Prestations" },
          { id: "process", label: "Process" },
          { id: "pour-qui", label: "Pour qui" },
          ...(related.length > 0 ? [{ id: "references", label: "Références" }] : []),
          { id: "faq", label: "FAQ" },
          { id: "devis", label: "Devis" },
        ]}
      />

      {/* Intro */}
      <section id="approche" className="section-y relative overflow-hidden">
        <BlueprintLines
          variant="pipes"
          className="absolute -right-20 top-10 h-72 w-[50%] text-primary/15"
        />
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Notre approche"
            title={
              <>
                De l'étude à la maintenance, <Accent>un seul interlocuteur.</Accent>
              </>
            }
          />
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground lg:pt-12 lg:text-lg">
            {service.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Prestations */}
      <section id="prestations" className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Prestations"
            title={`Nos prestations en ${service.shortName.toLowerCase()}`}
            body="Installation neuve, rénovation, maintenance ou optimisation : nous intervenons sur l'ensemble du cycle de vie de vos équipements."
          />
          <FeatureGrid items={service.subServices} className="mt-14" numbered />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="surface-night section-y overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-grid-light" />
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="Notre process"
            title="Une méthode éprouvée, étape par étape"
            body="Chaque intervention suit un déroulé clair, pour des installations fiables et des délais tenus."
          />
          <Stepper steps={service.process} dark className="mt-16" />
        </div>
      </section>

      {/* Pour qui + engagements */}
      <section id="pour-qui" className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Pour qui ?"
            title="Des solutions adaptées à chaque établissement"
          />
          <FeatureGrid items={service.clients} columns={4} className="mt-14" />
          <div className="mt-24">
            <SectionHeading
              eyebrow="Nos engagements"
              title={
                <>
                  Ce que vous pouvez <Accent>attendre de nous</Accent>
                </>
              }
            />
            <FeatureGrid items={service.commitments} columns={4} className="mt-14" />
          </div>
        </div>
      </section>

      {/* References */}
      {related.length > 0 && (
        <section id="references" className="section-y bg-offwhite">
          <div className="container-site">
            <SectionHeading
              eyebrow="Références"
              title="Ils nous confient leurs installations"
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
            <ReferenceGrid items={related} className="mt-14" />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="section-y">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow={`FAQ · ${service.shortName}`}
            title="Vos questions, nos réponses"
            body="Vous ne trouvez pas votre réponse ? Nos techniciens vous répondent par téléphone ou WhatsApp."
          />
          <Reveal>
            <FAQAccordion faqs={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Other trades */}
      <section className="section-y surface-night overflow-hidden">
        <div className="container-site">
          <SectionHeading dark eyebrow="Nos autres métiers" title="Une expertise multi-technique" />
          <Carousel label="Nos autres métiers" dark className="mt-6">
            {others.map((s) => (
              <div key={s.slug} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
                <ServiceCard service={s} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <QuoteSection
        title={
          <>
            Votre projet en <Accent>{service.shortName.toLowerCase()}</Accent>
          </>
        }
        body="Décrivez votre besoin en quelques clics : nous vous recontactons rapidement avec une proposition adaptée."
        defaultTrade={service.slug}
      />
    </>
  );
}
