import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Check } from "lucide-react";
import { images } from "@/config/images";
import { jobs, joinReasons } from "@/data/jobs";
import { simpleHead } from "@/lib/heads";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { Btn } from "@/components/site/Button";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { GlowCard } from "@/components/site/GlowCard";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { TextMarquee } from "@/components/site/TextMarquee";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/fr/carrieres")({
  head: () =>
    simpleHead({
      title: "Carrières : rejoignez nos équipes techniques à Marrakech",
      description:
        "Technicien frigoriste, technicien CVC, électricien, plombier-chauffagiste, technicien de maintenance multi-technique : rejoignez Novare Solutions Techniques à Marrakech.",
      path: "/fr/carrieres",
      label: "Carrières",
      image: images.carrieresHero,
    }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <PageHero
        size="lg"
        image={images.carrieresHero}
        imageAlt="Techniciens Novare travaillant en équipe sur une installation"
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Carrières", href: "/fr/carrieres" },
        ]}
        eyebrow="Carrières"
        title={
          <>
            Construisons ensemble des installations{" "}
            <span className="text-gradient-light">exemplaires.</span>
          </>
        }
        description="Vous êtes technicien, passionné par votre métier et exigeant sur la qualité ? Rejoignez une équipe qui intervient sur certains des plus beaux établissements de Marrakech."
      >
        <Btn href="#postes" size="lg" magnetic icon={<ArrowRight className="size-5" />}>
          Voir les postes
        </Btn>
        <Btn href="#candidature" variant="light" size="lg">
          Candidature spontanée
        </Btn>
      </PageHero>

      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Pourquoi nous rejoindre"
            title={
              <>
                Bien plus qu'un poste : <Accent>un métier qui compte</Accent>
              </>
            }
          />
          <FeatureGrid items={joinReasons} columns={4} className="mt-14" />
        </div>
      </section>

      <section id="postes" className="section-y scroll-mt-24 bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Profils recherchés"
            title="Nous recrutons régulièrement"
            body="Nos équipes se renforcent au fil des projets. Si l'un de ces profils vous correspond, envoyez-nous votre candidature."
          />
          <Stagger className="mt-14 grid gap-5 lg:grid-cols-2">
            {jobs.map((job) => {
              const Icon = getIcon(job.icon);
              return (
                <StaggerItem key={job.slug} className="h-full">
                  <GlowCard className="flex h-full flex-col bg-white p-7 shadow-[var(--shadow-soft)] sm:p-8">
                    <div className="flex items-start gap-4">
                      <HouseBadge>
                        <Icon className="size-5" />
                      </HouseBadge>
                      <div>
                        <h3 className="text-xl font-semibold text-ink">{job.title}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Briefcase className="size-3.5" /> {job.type}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink/80">
                      {job.summary}
                    </p>
                    <div className="mt-6 grid flex-1 gap-6 sm:grid-cols-2">
                      {[
                        { title: "Missions", items: job.missions },
                        { title: "Profil", items: job.profile },
                      ].map((col) => (
                        <div key={col.title}>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                            {col.title}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {col.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#candidature"
                      className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Postuler <ArrowRight className="size-4" />
                    </a>
                  </GlowCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <TextMarquee
        dark
        words={["Frigoriste", "Technicien CVC", "Électricien", "Plombier-chauffagiste", "Maintenance"]}
      />

      <section id="candidature" className="section-y scroll-mt-24">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Candidature"
            title="Envoyez-nous votre candidature"
            body="Spontanée ou pour l'un de nos profils : nous lisons chaque candidature avec attention et revenons vers vous si votre profil correspond à nos besoins."
          />
          <Reveal>
            <ApplicationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
