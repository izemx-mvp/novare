import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import {
  referenceCategories,
  references,
  type Reference,
  type ReferenceCategory,
} from "@/data/references";
import { simpleHead } from "@/lib/heads";
import { cn } from "@/lib/utils";
import { CTABand } from "@/components/site/CTABand";
import { FiguresBand } from "@/components/site/FiguresBand";
import { PageHero } from "@/components/site/PageHero";
import { ReferenceCard } from "@/components/site/ReferenceCard";
import { ReferenceModal } from "@/components/site/ReferenceModal";
import { Testimonials } from "@/components/site/Testimonials";
import { Reveal } from "@/components/site/Reveal";
import { TextMarquee } from "@/components/site/TextMarquee";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/fr/nos-references")({
  head: () =>
    simpleHead({
      title: "Nos références : hôtels, palaces et restaurants à Marrakech",
      description:
        "La Mamounia, Mandarin Oriental, Fairmont, Hôtel Es Saadi, McDonald's, Anosta l'Orangeraie : ils confient leurs installations techniques à Novare.",
      path: "/fr/nos-references",
      label: "Nos références",
    }),
  component: ReferencesPage,
});

function ReferencesPage() {
  const [filter, setFilter] = useState<"all" | ReferenceCategory>("all");
  const [selected, setSelected] = useState<Reference | null>(null);
  const items = filter === "all" ? references : references.filter((r) => r.category === filter);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Nos références", href: "/fr/nos-references" },
        ]}
        eyebrow="Nos références"
        title={
          <>
            Ils nous font <span className="text-gradient-light">confiance.</span>
          </>
        }
        description="Palaces, resorts, établissements hôteliers et enseignes de restauration : plus de 1286 projets réalisés pour des clients exigeants à Marrakech."
        lines="pipes"
      />

      <section className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Projets" title="Une sélection de nos clients" />
            <Reveal>
              <LayoutGroup>
                <div
                  role="group"
                  aria-label="Filtrer les références"
                  className="inline-flex rounded-full border bg-offwhite p-1"
                >
                  {referenceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFilter(cat.id)}
                      aria-pressed={filter === cat.id}
                      className={cn(
                        "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                        filter === cat.id ? "text-white" : "text-navy hover:text-primary",
                      )}
                    >
                      {filter === cat.id && (
                        <motion.span
                          layoutId="ref-filter"
                          className="absolute inset-0 rounded-full bg-brand-gradient"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </Reveal>
          </div>

          <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((r) => (
                <motion.div
                  key={r.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ReferenceCard reference={r} onOpen={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <ReferenceModal reference={selected} onClose={() => setSelected(null)} />
        </div>
      </section>

      <TextMarquee
        words={["La Mamounia", "Mandarin Oriental", "Fairmont", "Es Saadi", "McDonald's", "Anosta"]}
        className="border-t border-navy/5"
      />
      <FiguresBand />

      <section className="section-y surface-night overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-dots-light opacity-50" />
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading dark eyebrow="Témoignages" title="La parole à nos clients" />
          <Reveal>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      <CTABand title="Votre établissement mérite le même niveau d'exigence." />
    </>
  );
}
