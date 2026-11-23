import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Layers, Phone, Siren } from "lucide-react";
import { images } from "@/config/images";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import { methodSteps, pillars } from "@/data/company";
import { sortedPosts } from "@/data/posts";
import { referencesBySlugs } from "@/data/references";
import { services } from "@/data/services";
import { pageHead } from "@/lib/seo";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { Btn } from "@/components/site/Button";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { FiguresBand } from "@/components/site/FiguresBand";
import { HomeHero } from "@/components/site/HomeHero";
import { MaintenanceTeaser } from "@/components/site/MaintenanceTeaser";
import { PostCard } from "@/components/site/PostCard";
import { QuickQuoteForm } from "@/components/site/QuickQuoteForm";
import { ReferenceGrid } from "@/components/site/ReferenceGrid";
import { ReferencesMarquee } from "@/components/site/ReferencesMarquee";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { SectorTabs } from "@/components/site/SectorTabs";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Stepper } from "@/components/site/Stepper";
import { Testimonials } from "@/components/site/Testimonials";
import { ParallaxBand } from "@/components/site/home/ParallaxBand";
import { ScrollRevealText } from "@/components/site/home/ScrollRevealText";

export const Route = createFileRoute("/fr/")({
  head: () =>
    pageHead({
      title: site.seo.defaultTitle,
      description: site.seo.defaultDescription,
      path: "/fr",
      image: images.og,
    }),
  component: HomePage,
});

const featured = referencesBySlugs(["la-mamounia", "mcdonalds", "mandarin-oriental"]);

const proofs = [
  { icon: Layers, title: "Un seul interlocuteur", text: "Étude, installation, mise en service et maintenance." },
  { icon: Building2, title: "Établissements exigeants", text: "Palaces, resorts, restauration, tertiaire, industrie." },
  { icon: Siren, title: "Réactivité", text: "Interventions d'urgence 7j/7 sur Marrakech." },
];

function HomePage() {
  const [first, ...rest] = services;
  return (
    <>
      <HomeHero />
      <ReferencesMarquee />

      {/* 1. Manifesto — words light up on scroll */}
      <section className="section-y relative overflow-hidden bg-white">
        <BlueprintLines
          variant="pipes"
          className="absolute -right-24 top-10 h-72 w-[45%] text-primary/[0.07]"
        />
        <div className="container-site relative">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-10 bg-brand-gradient" aria-hidden="true" />
              Novare Solutions Techniques
            </p>
          </Reveal>
          <ScrollRevealText
            className="mt-8 max-w-5xl text-balance font-display text-[1.875rem] font-semibold leading-[1.18] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]"
            parts={[
              { text: "Climatisation, froid, plomberie, électricité :" },
              { text: "nous gardons vos bâtiments", accent: true },
              {
                text: "confortables, sûrs et opérationnels, pour que vous puissiez vous concentrer sur l'essentiel : vos clients.",
              },
            ]}
          />
          <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {proofs.map((p) => (
              <StaggerItem key={p.title} className="min-w-0">
                <div className="group h-full rounded-[1.25rem] border border-navy/10 bg-offwhite p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-[var(--shadow-soft)]">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-primary">
                    <p.icon className="size-5" />
                  </span>
                  <p className="mt-5 font-display text-lg font-semibold text-ink">{p.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 2. Trades bento */}
      <section id="metiers" className="section-y scroll-mt-20 bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Nos 5 métiers"
            title={
              <>
                Une expertise <Accent>multi-technique</Accent>, un interlocuteur unique.
              </>
            }
            body="De la climatisation à l'électricité, nos équipes qualifiées prennent en charge l'ensemble des équipements techniques de votre bâtiment."
            action={
              <Btn href="/fr/nos-metiers" variant="outline" icon={<ArrowRight className="size-4" />}>
                Tous nos métiers
              </Btn>
            }
          />
          <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {first && (
              <StaggerItem className="h-full min-w-0 sm:col-span-2 lg:row-span-2">
                <ServiceCard service={first} large index={0} />
              </StaggerItem>
            )}
            {rest.map((service, i) => (
              <StaggerItem key={service.slug} className="h-full min-w-0">
                <ServiceCard service={service} index={i + 1} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 3. Figures */}
      <FiguresBand title="Novare en chiffres" />

      {/* 4. Method */}
      <section className="section-y relative overflow-hidden bg-white">
        <BlueprintLines
          variant="airflow"
          className="absolute inset-x-0 top-8 h-48 w-full text-primary/10"
        />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Notre méthode"
            title={
              <>
                De l'étude à la maintenance, <Accent>sans rupture.</Accent>
              </>
            }
            body="Cinq étapes maîtrisées pour des installations fiables, livrées dans les délais et suivies dans la durée."
            action={
              <Btn href="/fr/notre-methode" variant="outline" icon={<ArrowRight className="size-4" />}>
                Découvrir notre méthode
              </Btn>
            }
          />
          <Stepper steps={methodSteps} className="mt-16" />
        </div>
      </section>

      {/* 5. Cinematic parallax band */}
      <ParallaxBand />

      {/* 6. Sectors */}
      <section className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Secteurs"
            title={
              <>
                Des solutions pensées <Accent>pour votre activité</Accent>
              </>
            }
            body="Hôtellerie, restauration, résidentiel, tertiaire, industrie : chaque secteur a ses contraintes, nous les connaissons."
          />
          <div className="mt-14">
            <SectorTabs />
          </div>
        </div>
      </section>

      {/* 7. Maintenance contracts */}
      <MaintenanceTeaser className="bg-white" />

      {/* 8. Why Novare (light, to keep a clean light/dark rhythm) */}
      <section className="section-y relative overflow-hidden bg-offwhite">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(19_66_134/0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Pourquoi Novare"
            title={
              <>
                Quatre raisons de <Accent>nous faire confiance</Accent>
              </>
            }
          />
          <FeatureGrid items={pillars} columns={4} numbered className="mt-14" />
        </div>
      </section>

      {/* 9. Featured references */}
      <section className="section-y bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Références"
            title={
              <>
                Ils nous confient <Accent>leurs installations</Accent>
              </>
            }
            body="Palaces, resorts et enseignes de restauration : des établissements exigeants qui comptent sur nos équipes au quotidien."
            action={
              <Btn href="/fr/nos-references" variant="outline" icon={<ArrowRight className="size-4" />}>
                Toutes nos références
              </Btn>
            }
          />
          <ReferenceGrid items={featured} className="mt-14" />
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="surface-night section-y relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-dots-light opacity-50" />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/4 -z-10 size-[520px] rounded-full bg-primary/20 blur-[120px]"
        />
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              dark
              eyebrow="Témoignages"
              title={
                <>
                  Ce que disent <Accent dark>nos clients</Accent>
                </>
              }
              body="Responsables techniques, chefs, gestionnaires : ils racontent leur expérience avec Novare."
            />
            <div className="mt-8 hidden lg:block">
              <Btn href={CONTACT_PATH} icon={<ArrowRight className="size-4" />}>
                Rejoindre nos clients
              </Btn>
            </div>
          </div>
          <Reveal className="min-w-0">
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* 11. Latest posts */}
      <section className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading
            eyebrow="Conseils"
            title={
              <>
                Nos conseils <Accent>d'experts</Accent>
              </>
            }
            action={
              <Btn href="/fr/conseils" variant="outline" icon={<ArrowRight className="size-4" />}>
                Tous les articles
              </Btn>
            }
          />
          <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {sortedPosts.slice(0, 3).map((post) => (
              <StaggerItem key={post.slug} className="min-w-0">
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 12. Emergency + quick form (the footer carries the final CTA band) */}
      <section className="surface-night section-y relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-grid-light" />
        <BlueprintLines
          variant="circuit"
          className="absolute -right-10 top-0 -z-10 h-full w-1/2 text-primary-400/20"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/4 -z-10 size-[480px] rounded-full bg-primary/25 blur-[120px]"
        />
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="min-w-0">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary-300 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-300" />
              </span>
              {site.hours.emergency}
            </span>
            <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Une panne ? <span className="text-gradient-light">On intervient.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel-200">
              Chambre froide qui remonte en température, fuite, coupure électrique, climatisation à
              l'arrêt : appelez-nous, nos techniciens se mobilisent rapidement.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Btn href={telHref(site.phones.mobile1)} size="lg" iconLeft={<Phone className="size-5" />}>
                {site.phones.mobile1.display}
              </Btn>
              <Btn
                href={telHref(site.phones.mobile2)}
                variant="light"
                size="lg"
                iconLeft={<Phone className="size-5" />}
              >
                {site.phones.mobile2.display}
              </Btn>
            </div>
            <Btn
              href="/fr/depannage-urgent"
              variant="ghostLight"
              className="mt-4 px-0"
              icon={<ArrowRight className="size-4" />}
            >
              Que faire en attendant notre technicien ?
            </Btn>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <QuickQuoteForm title="Être rappelé rapidement" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
