import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONTACT_PATH } from "@/config/site";
import { methodChapters, methodCommitments } from "@/data/company";
import { simpleHead } from "@/lib/heads";
import { cn } from "@/lib/utils";
import { BlueprintMethod } from "@/components/site/BlueprintMethod";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { PageHero } from "@/components/site/PageHero";
import { TextMarquee } from "@/components/site/TextMarquee";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/fr/notre-methode")({
  head: () =>
    simpleHead({
      title: "Notre méthode : de l'étude à l'optimisation",
      description:
        "Étude, conception, installation, maintenance, optimisation : découvrez la méthode Novare pour des installations techniques fiables et performantes dans la durée.",
      path: "/fr/notre-methode",
      label: "Notre méthode",
    }),
  component: MethodPage,
});

type Chapter = (typeof methodChapters)[number];

function ChapterBlock({
  chapter,
  index,
  onActive,
}: {
  chapter: Chapter;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      id={chapter.id}
      className="flex min-h-[70svh] flex-col justify-center py-12 lg:min-h-[85svh]"
    >
      <div className="mb-8 rounded-[1.5rem] bg-night p-6 lg:hidden">
        <BlueprintMethod step={index} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {chapter.kicker}
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight text-ink lg:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {chapter.text}
        </p>
        <ul className="mt-8 space-y-3">
          {chapter.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-ink/85">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary-50 text-primary">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function MethodPage() {
  const [active, setActive] = useState(0);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Notre méthode", href: "/fr/notre-methode" },
        ]}
        eyebrow="Notre méthode"
        title={
          <>
            Cinq chapitres pour des installations{" "}
            <span className="text-gradient-light">qui durent.</span>
          </>
        }
        description="Nos projets suivent une méthode éprouvée, du premier relevé à l'optimisation énergétique. Faites défiler pour voir votre installation prendre forme."
        lines="pipes"
      >
        <Btn
          href={`#${methodChapters[0]?.id ?? ""}`}
          size="lg"
          icon={<ArrowRight className="size-5" />}
        >
          Commencer
        </Btn>
      </PageHero>

      <section className="container-site grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          {methodChapters.map((chapter, i) => (
            <ChapterBlock key={chapter.id} chapter={chapter} index={i} onActive={setActive} />
          ))}
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-28 flex h-[calc(100svh-8rem)] flex-col justify-center">
            <div className="surface-night relative overflow-hidden rounded-[2rem] p-10 shadow-[var(--shadow-lift)]">
              <div className="absolute inset-0 -z-10 blueprint-grid-light" />
              <BlueprintMethod step={active} />
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="font-display text-sm font-semibold text-white">
                  <span className="text-primary-300 tabular">
                    {String(active + 1).padStart(2, "0")}
                  </span>{" "}
                  / 05 · {methodChapters[active]?.title}
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {methodChapters.map((c, i) => (
                    <span
                      key={c.id}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        i === active
                          ? "w-8 bg-brand-gradient"
                          : i < active
                            ? "w-3 bg-primary-400/60"
                            : "w-3 bg-white/15",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nos engagements"
            title={
              <>
                Une méthode, <Accent>des engagements concrets</Accent>
              </>
            }
          />
          <FeatureGrid items={methodCommitments} columns={4} className="mt-14" />
          <div className="mt-12">
            <Btn href={CONTACT_PATH} size="lg" magnetic icon={<ArrowRight className="size-5" />}>
              Démarrer votre projet
            </Btn>
          </div>
        </div>
      </section>
      <TextMarquee reverse className="border-t border-navy/5" />
      <CTABand />
    </>
  );
}
