import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, Phone } from "lucide-react";
import { images } from "@/config/images";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import {
  comparison,
  formulas,
  maintenanceBenefits,
  maintenanceFaqs,
  maintenanceProcess,
} from "@/data/maintenance";
import { sectors } from "@/data/sectors";
import { faqJsonLd } from "@/lib/seo";
import { simpleHead } from "@/lib/heads";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { CoverageChecklist } from "@/components/site/CoverageChecklist";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { QuoteSection } from "@/components/site/QuoteSection";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { SectorCard } from "@/components/site/SectorCard";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { Stepper } from "@/components/site/Stepper";

export const Route = createFileRoute("/fr/contrats-de-maintenance")({
  head: () =>
    simpleHead({
      title: "Contrats de maintenance multi-technique à Marrakech",
      description:
        "Contrats de maintenance Essentiel, Confort et Premium : visites préventives, intervention prioritaire, rapports et astreinte pour vos installations de climatisation, froid, plomberie et électricité.",
      path: "/fr/contrats-de-maintenance",
      label: "Contrats de maintenance",
      image: images.maintenanceHero,
      extra: [faqJsonLd(maintenanceFaqs)],
    }),
  component: MaintenancePage,
});

function Cell({ value }: { value: string }) {
  if (value === "—")
    return <Minus className="mx-auto size-4 text-steel-300" aria-label="Non inclus" />;
  if (value === "Oui" || value === "Incluse") {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-ink">
        <Check className="size-4 text-primary" /> {value}
      </span>
    );
  }
  return <span className="text-ink/80">{value}</span>;
}

function MaintenancePage() {
  return (
    <>
      <PageHero
        size="lg"
        image={images.maintenanceHero}
        imageAlt="Technicien Novare réalisant une visite de maintenance préventive"
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Contrats de maintenance", href: "/fr/contrats-de-maintenance" },
        ]}
        eyebrow="Contrats de maintenance"
        title={
          <>
            Anticipez les pannes, <span className="text-gradient-light">maîtrisez vos coûts.</span>
          </>
        }
        description="Un plan de maintenance construit pour vos équipements, des visites préventives planifiées et une intervention prioritaire : la sérénité technique, sans mauvaise surprise."
      >
        <Btn href="#formules" size="lg" magnetic icon={<ArrowRight className="size-5" />}>
          Voir les formules
        </Btn>
        <Btn
          href={telHref(site.phones.mobile1)}
          variant="light"
          size="lg"
          iconLeft={<Phone className="size-5" />}
        >
          Parler à un technicien
        </Btn>
      </PageHero>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Pourquoi un contrat"
            title={
              <>
                La maintenance préventive, <Accent>un investissement rentable</Accent>
              </>
            }
            body="Une panne coûte toujours plus cher qu'une visite : pièces en urgence, arrêt d'activité, marchandises perdues, clients mécontents."
          />
          <FeatureGrid items={maintenanceBenefits} columns={4} className="mt-14" />
        </div>
      </section>

      <section className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Périmètre"
            title="Composez votre couverture"
            body="Un contrat peut couvrir un seul métier ou l'ensemble de vos installations. Activez les métiers concernés pour visualiser les opérations incluses."
          />
          <Reveal className="mt-14">
            <CoverageChecklist />
          </Reveal>
        </div>
      </section>

      {/* Formulas */}
      <section id="formules" className="section-y scroll-mt-24">
        <div className="container-site">
          <SectionHeading
            align="center"
            eyebrow="Nos formules"
            title="Trois niveaux de service, un même engagement"
            body="Chaque formule est ajustée à vos équipements après un audit gratuit. Le prix dépend de votre parc et de la fréquence retenue."
          />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {formulas.map((f) => (
              <StaggerItem key={f.id} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.5rem] border p-8",
                    f.featured
                      ? "surface-night border-transparent shadow-[var(--shadow-glow)]"
                      : "bg-white shadow-[var(--shadow-soft)]",
                  )}
                >
                  {f.featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                      Le plus choisi
                    </span>
                  )}
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.14em]",
                      f.featured ? "text-primary-300" : "text-primary",
                    )}
                  >
                    {f.tagline}
                  </p>
                  <h3
                    className={cn(
                      "mt-3 text-4xl font-semibold",
                      f.featured ? "text-white" : "text-ink",
                    )}
                  >
                    {f.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm",
                      f.featured ? "text-steel-200" : "text-muted-foreground",
                    )}
                  >
                    Idéal pour : {f.idealFor}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3.5">
                    {f.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn(
                          "flex items-start gap-3 text-[0.9375rem]",
                          f.featured ? "text-white" : "text-ink/85",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                            f.featured
                              ? "bg-primary/25 text-primary-300"
                              : "bg-primary-50 text-primary",
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Btn
                    href={CONTACT_PATH}
                    search={{ type: "contrat" }}
                    variant={f.featured ? "primary" : "outline"}
                    className="mt-10 w-full"
                    icon={<ArrowRight className="size-4" />}
                  >
                    Recevoir une proposition
                  </Btn>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-16 overflow-x-auto rounded-[1.5rem] border bg-white shadow-[var(--shadow-soft)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Comparatif des formules de maintenance</caption>
              <thead>
                <tr className="border-b bg-offwhite">
                  <th
                    scope="col"
                    className="px-6 py-5 font-display text-base font-semibold text-ink"
                  >
                    Comparatif
                  </th>
                  {formulas.map((f) => (
                    <th
                      key={f.id}
                      scope="col"
                      className={cn(
                        "px-6 py-5 text-center font-display text-base font-semibold",
                        f.featured ? "text-primary" : "text-ink",
                      )}
                    >
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b last:border-b-0">
                    <th scope="row" className="px-6 py-4 font-medium text-ink">
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={cn("px-6 py-4 text-center", i === 1 && "bg-primary-50/50")}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="surface-night section-y overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-grid-light" />
        <div className="container-site">
          <SectionHeading dark eyebrow="Déroulement" title="Comment fonctionne votre contrat" />
          <Stepper steps={maintenanceProcess} dark className="mt-16" />
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading eyebrow="Secteurs" title="Des contrats adaptés à chaque activité" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {sectors.map((s) => (
              <StaggerItem key={s.slug} className="h-full">
                <SectorCard sector={s} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Vos questions sur les contrats" />
          <Reveal>
            <FAQAccordion faqs={maintenanceFaqs} />
          </Reveal>
        </div>
      </section>

      <QuoteSection
        className="bg-white"
        eyebrow="Proposition sur mesure"
        title={
          <>
            Recevez une <Accent>proposition de contrat</Accent>
          </>
        }
        body="Décrivez vos installations : nous organisons un audit gratuit et vous remettons une proposition détaillée."
        defaultType="contrat"
        defaultTrade="plusieurs"
      />
    </>
  );
}
