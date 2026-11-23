import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Phone, Siren } from "lucide-react";
import { images } from "@/config/images";
import { site, telHref, whatsappHref } from "@/config/site";
import { emergencyTips } from "@/data/company";
import { emergencyFaqs } from "@/data/faqs";
import { faqJsonLd } from "@/lib/seo";
import { simpleHead } from "@/lib/heads";
import { Btn } from "@/components/site/Button";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { GlowCard } from "@/components/site/GlowCard";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { QuickQuoteForm } from "@/components/site/QuickQuoteForm";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Stepper } from "@/components/site/Stepper";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const Route = createFileRoute("/fr/depannage-urgent")({
  head: () =>
    simpleHead({
      title: "Dépannage urgent 7j/7 à Marrakech : froid, climatisation, plomberie, électricité",
      description:
        "Panne de chambre froide, fuite d'eau, climatisation à l'arrêt, coupure électrique : appelez Novare, interventions d'urgence 7j/7 à Marrakech.",
      path: "/fr/depannage-urgent",
      label: "Dépannage urgent",
      image: images.depannageHero,
      extra: [faqJsonLd(emergencyFaqs)],
    }),
  component: EmergencyPage,
});

const interventionSteps = [
  {
    title: "Appel",
    text: "Vous nous appelez ou nous écrivez sur WhatsApp : nous qualifions la panne et vous donnons les premiers gestes.",
  },
  {
    title: "Diagnostic",
    text: "Le technicien se rend sur place et identifie précisément l'origine du dysfonctionnement.",
  },
  {
    title: "Intervention",
    text: "Réparation ou mise en sécurité immédiate, avec les pièces disponibles dans nos véhicules.",
  },
  {
    title: "Rapport",
    text: "Compte rendu de l'intervention et recommandations pour éviter que la panne ne se reproduise.",
  },
];

function EmergencyPage() {
  return (
    <>
      <PageHero
        size="lg"
        image={images.depannageHero}
        imageAlt="Technicien Novare en intervention de dépannage d'urgence"
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Dépannage urgent", href: "/fr/depannage-urgent" },
        ]}
        icon={
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-primary-400" />
          </span>
        }
        eyebrow={site.hours.emergency}
        title={
          <>
            Une panne ? <span className="text-gradient-light">Appelez-nous maintenant.</span>
          </>
        }
        description="Froid, climatisation, plomberie, électricité : nos techniciens se mobilisent rapidement pour limiter l'impact sur votre activité."
        aside={
          <div className="glass-dark rounded-[1.5rem] border border-white/10 p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary-300">
              <Siren className="size-4" /> Ligne d'urgence
            </p>
            <div className="mt-4 grid gap-3">
              <a
                href={telHref(site.phones.mobile1)}
                className="btn-sheen flex items-center justify-center gap-3 rounded-2xl bg-brand-gradient whitespace-nowrap px-4 py-5 font-display text-[1.35rem] font-semibold text-white shadow-[var(--shadow-glow)] sm:px-5 sm:text-3xl"
              >
                <Phone className="size-5 shrink-0 sm:size-6" />{" "}
                <span className="tabular">{site.phones.mobile1.display}</span>
              </a>
              <a
                href={telHref(site.phones.mobile2)}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/5 whitespace-nowrap px-4 py-5 font-display text-[1.35rem] font-semibold text-white transition-colors hover:bg-white/10 sm:px-5 sm:text-3xl"
              >
                <Phone className="size-5 shrink-0 sm:size-6" />{" "}
                <span className="tabular">{site.phones.mobile2.display}</span>
              </a>
              <a
                href={whatsappHref("URGENT — Bonjour Novare, j'ai une panne : ")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-navy transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="size-5" /> Envoyer un WhatsApp
              </a>
            </div>
          </div>
        }
      />

      <section className="section-y">
        <div className="container-site">
          <SectionHeading
            eyebrow="Pannes fréquentes"
            title="Nous intervenons sur"
            body="Les pannes les plus courantes que nos techniciens traitent en urgence, et les bons réflexes en attendant leur arrivée."
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {emergencyTips.map((tip) => {
              const Icon = getIcon(tip.icon);
              return (
                <StaggerItem key={tip.trade} className="h-full">
                  <GlowCard className="flex h-full flex-col bg-white p-7 shadow-[var(--shadow-soft)]">
                    <div className="flex items-center gap-4">
                      <HouseBadge>
                        <Icon className="size-5" />
                      </HouseBadge>
                      <h3 className="text-xl font-semibold text-ink">{tip.trade}</h3>
                    </div>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {tip.breakdowns.map((b) => (
                        <li
                          key={b}
                          className="rounded-full bg-offwhite px-3 py-1.5 text-sm font-medium text-navy"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex-1 rounded-2xl border border-primary/15 bg-primary-50/60 p-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                        <AlertTriangle className="size-4 text-primary" /> Que faire en attendant ?
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/80">{tip.tip}</p>
                    </div>
                  </GlowCard>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mt-8 rounded-2xl border border-navy/10 bg-offwhite p-5 text-sm text-muted-foreground">
            <strong className="text-ink">Sécurité avant tout :</strong> ne vous exposez jamais à un
            risque électrique ou à une fuite de gaz. En cas de danger immédiat pour les personnes,
            contactez d'abord les services de secours.
          </Reveal>
        </div>
      </section>

      <section className="surface-night section-y overflow-hidden">
        <div className="absolute inset-0 -z-10 blueprint-grid-light" />
        <div className="container-site">
          <SectionHeading
            dark
            eyebrow="Notre intervention"
            title="Quatre étapes pour rétablir la situation"
          />
          <Stepper steps={interventionSteps} dark className="mt-16" />
        </div>
      </section>

      <section className="section-y bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Demande express"
              title="Décrivez la panne, on vous rappelle"
              body="Le formulaire ouvre WhatsApp avec votre message prêt à envoyer. Pour aller plus vite encore, appelez-nous."
            />
            <Reveal className="mt-10 flex flex-wrap gap-3">
              <Btn
                href={telHref(site.phones.mobile1)}
                size="lg"
                iconLeft={<Phone className="size-5" />}
              >
                {site.phones.mobile1.display}
              </Btn>
              <Btn
                href={telHref(site.phones.mobile2)}
                variant="outline"
                size="lg"
                iconLeft={<Phone className="size-5" />}
              >
                {site.phones.mobile2.display}
              </Btn>
            </Reveal>
            <Reveal className="mt-12">
              <FAQAccordion faqs={emergencyFaqs} defaultOpen={false} />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <QuickQuoteForm urgent title="Signaler une panne" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
