import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { CONTACT_PATH } from "@/config/site";
import { team, timeline, values } from "@/data/company";
import { simpleHead } from "@/lib/heads";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { FiguresBand } from "@/components/site/FiguresBand";
import { HouseFrame } from "@/components/site/HouseShape";
import { PageHero } from "@/components/site/PageHero";
import { ReferencesMarquee } from "@/components/site/ReferencesMarquee";
import { ImageReveal, Reveal } from "@/components/site/Reveal";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { TextMarquee } from "@/components/site/TextMarquee";
import { SmartImage } from "@/components/site/SmartImage";

export const Route = createFileRoute("/fr/qui-sommes-nous")({
  head: () =>
    simpleHead({
      title: "Qui sommes-nous ? Entreprise de solutions techniques à Marrakech",
      description:
        "Novare Solutions Techniques, entreprise marocaine basée à Marrakech : installation, maintenance et optimisation des équipements techniques avec professionnalisme, rigueur et réactivité.",
      path: "/fr/qui-sommes-nous",
      label: "Qui sommes-nous",
      image: images.aboutHero,
    }),
  component: AboutPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function AboutPage() {
  return (
    <>
      <PageHero
        size="lg"
        image={images.aboutHero}
        imageAlt="Équipe de techniciens Novare devant un chantier à Marrakech"
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Qui sommes-nous", href: "/fr/qui-sommes-nous" },
        ]}
        eyebrow="Qui sommes-nous"
        title={
          <>
            Des techniciens <span className="text-gradient-light">exigeants</span>, au service de
            vos bâtiments.
          </>
        }
        description="Novare Solutions Techniques est une entreprise marocaine basée à Marrakech, spécialisée dans les solutions techniques et la maintenance multi-service des bâtiments."
      >
        <Btn href={CONTACT_PATH} size="lg" magnetic icon={<ArrowRight className="size-5" />}>
          Travailler avec nous
        </Btn>
        <Btn href="/fr/notre-methode" variant="light" size="lg">
          Notre méthode
        </Btn>
      </PageHero>

      {/* Presentation */}
      <section className="section-y relative overflow-hidden">
        <BlueprintLines
          variant="pipes"
          className="absolute -left-20 bottom-0 h-72 w-1/2 text-primary/10"
        />
        <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Notre entreprise"
              title={
                <>
                  Installer, maintenir, <Accent>optimiser.</Accent>
                </>
              }
            />
            <Reveal className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
              <p>
                Depuis plus de dix ans, Novare accompagne les hôtels, palaces, restaurants,
                résidences, bureaux et sites industriels de Marrakech dans la gestion de leurs
                équipements techniques : climatisation, plomberie et chauffage, froid et cuisines
                industrielles, électricité.
              </p>
              <p>
                Notre métier : installer des équipements fiables, les maintenir en parfait état de
                fonctionnement et optimiser leurs performances dans la durée. Nous intervenons de
                l'étude technique jusqu'à la maintenance, avec un interlocuteur unique pour
                l'ensemble de vos installations.
              </p>
              <p>
                Ce qui nous distingue ? Une culture du{" "}
                <strong className="font-semibold text-ink">professionnalisme</strong>, de la{" "}
                <strong className="font-semibold text-ink">rigueur</strong> et de la{" "}
                <strong className="font-semibold text-ink">réactivité</strong>, partagée par chacun
                de nos techniciens.
              </p>
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-md pb-10 sm:pb-0">
            <HouseFrame className="absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] text-primary/25" />
            <ImageReveal>
              <SmartImage
                src={images.trades.maintenance}
                alt="Technicien Novare réalisant un contrôle sur une installation"
                aspect="4/5"
                mask="house"
              />
            </ImageReveal>
            {/* Secondary photo, overlapping */}
            <Reveal
              delay={0.2}
              className="absolute -bottom-2 -left-4 w-[46%] overflow-hidden rounded-2xl border-4 border-white shadow-[var(--shadow-lift)] sm:-bottom-8 sm:-left-12"
            >
              <SmartImage
                src={images.trades.climatisation}
                alt="Installation d'une cassette de climatisation dans un couloir d'hôtel"
                aspect="1/1"
              />
            </Reveal>
            {/* Floating figure badge */}
            <Reveal
              delay={0.35}
              className="glass absolute -right-3 top-10 rounded-2xl border border-navy/10 px-5 py-4 shadow-[var(--shadow-lift)] sm:-right-10"
            >
              <span className="block font-display text-3xl font-semibold text-gradient tabular">10+</span>
              <span className="block text-xs font-medium uppercase tracking-[0.12em] text-steel">
                ans d'expérience
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <FiguresBand />

      {/* Team */}
      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Notre équipe"
            title="Des compétences complémentaires, une même exigence"
            body="Nos équipes réunissent les savoir-faire nécessaires pour prendre en charge l'ensemble des équipements de votre bâtiment."
          />
          <FeatureGrid items={team} className="mt-14" />
        </div>
      </section>

      {/* Values */}
      <section className="surface-night section-y overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-grid-light" />
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="Nos valeurs"
            title={
              <>
                Ce qui guide <Accent dark>chacune de nos interventions</Accent>
              </>
            }
          />
          <FeatureGrid items={values} columns={4} dark className="mt-14" />
        </div>
      </section>

      <TextMarquee
        words={["Réactivité", "Précision", "Rigueur", "Professionnalisme", "Satisfaction"]}
        className="border-b border-navy/5"
      />

      {/* Timeline */}
      <section className="section-y bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Notre accompagnement"
              title="Le cycle de vie de vos installations"
              body="Nous vous accompagnons à chaque étape, avec la même équipe et la même exigence."
            />
          </div>
          <ol className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute bottom-4 left-[1.4rem] top-4 w-px origin-top bg-gradient-to-b from-steel via-primary to-navy"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1.6, ease }}
            />
            {timeline.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative flex gap-8 pb-12 last:pb-0"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
              >
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-semibold text-white shadow-[var(--shadow-glow)] ring-8 ring-offwhite">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 rounded-[1.25rem] border bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
                  <h3 className="text-2xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <ReferencesMarquee />
      <CTABand />
    </>
  );
}
