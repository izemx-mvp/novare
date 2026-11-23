import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Siren } from "lucide-react";
import type { ReactNode } from "react";
import { allPhones, defaultWhatsappMessage, site, telHref, whatsappHref } from "@/config/site";
import { simpleHead } from "@/lib/heads";
import { Btn } from "@/components/site/Button";
import { trackGlow } from "@/lib/glow";
import { HouseBadge } from "@/components/site/HouseShape";
import { PageHero } from "@/components/site/PageHero";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

type Search = { metier?: string; type?: string };

export const Route = createFileRoute("/fr/contact-et-devis")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ...(typeof search["metier"] === "string" ? { metier: search["metier"] } : {}),
    ...(typeof search["type"] === "string" ? { type: search["type"] } : {}),
  }),
  head: () =>
    simpleHead({
      title: "Contact et demande de devis gratuit",
      description:
        "Contactez Novare Solutions Techniques à Marrakech : téléphone, WhatsApp, email ou formulaire de devis gratuit. 107, Hay Almassarii. Interventions d'urgence 7j/7.",
      path: "/fr/contact-et-devis",
      label: "Contact & Devis",
    }),
  component: ContactPage,
});

function ContactCard({
  href,
  icon,
  label,
  value,
  note,
  external = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  note?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onPointerMove={trackGlow}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="glow-card group flex w-full min-w-0 items-center gap-3 rounded-[1.25rem] border bg-white p-4 shadow-[var(--shadow-soft)] sm:gap-4 sm:p-5"
    >
      <span className="shrink-0">
        <HouseBadge tone="light">{icon}</HouseBadge>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-steel sm:text-xs">
          {label}
        </span>
        <span className="mt-1 block font-display text-base font-semibold leading-snug text-ink [overflow-wrap:anywhere] group-hover:text-primary sm:text-lg">
          {value}
        </span>
        {note && (
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{note}</span>
        )}
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-steel transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </a>
  );
}

function ContactPage() {
  const search = Route.useSearch();

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Contact & Devis", href: "/fr/contact-et-devis" },
        ]}
        eyebrow="Contact & Devis"
        title={
          <>
            Parlons de <span className="text-gradient-light">votre projet.</span>
          </>
        }
        description="Un projet d'installation, une panne, un contrat de maintenance ? Écrivez-nous ou appelez-nous : chaque demande reçoit une réponse rapide et chaque devis est gratuit."
        lines="airflow"
      />

      <section className="section-y overflow-x-clip bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* Quote form first on mobile, contact cards first on desktop */}
          <div className="order-2 min-w-0 lg:order-1">
            <Reveal>
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
                Nous joindre
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choisissez le canal qui vous convient le mieux.
              </p>
            </Reveal>
            <Stagger className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-1">
              {allPhones.map((phone) => (
                <StaggerItem key={phone.tel} className="min-w-0">
                  <ContactCard
                    href={telHref(phone)}
                    icon={<Phone className="size-5" />}
                    label={phone.label}
                    value={phone.display}
                  />
                </StaggerItem>
              ))}
              <StaggerItem className="min-w-0">
                <ContactCard
                  href={whatsappHref(defaultWhatsappMessage)}
                  external
                  icon={<WhatsAppIcon className="size-5" />}
                  label="WhatsApp"
                  value={site.whatsapp.display}
                  note="Réponse rapide, photos de l'installation bienvenues"
                />
              </StaggerItem>
              <StaggerItem className="min-w-0">
                <ContactCard
                  href={`mailto:${site.email}`}
                  icon={<Mail className="size-5" />}
                  label="Email"
                  value={site.email}
                />
              </StaggerItem>
              <StaggerItem className="min-w-0 sm:col-span-2 lg:col-span-1">
                <ContactCard
                  href={site.mapsLink}
                  external
                  icon={<MapPin className="size-5" />}
                  label="Adresse"
                  value={site.address.street}
                  note={site.address.city}
                />
              </StaggerItem>
            </Stagger>
            <Reveal className="mt-6 rounded-[1.25rem] bg-night p-5 text-white sm:p-6">
              <p className="flex items-center gap-2 font-display font-semibold">
                <Clock className="size-5 shrink-0 text-primary-300" /> Horaires
              </p>
              <p className="mt-3 text-steel-100">{site.hours.regular}</p>
              <p className="mt-1 flex items-start gap-2 font-semibold text-primary-300">
                <Siren className="mt-1 size-4 shrink-0" /> {site.hours.emergency}
              </p>
            </Reveal>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <Reveal>
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
                Demande de devis
              </h2>
              <p className="mt-3 text-muted-foreground">
                Trois étapes, moins de deux minutes. Votre demande nous parvient sur WhatsApp ou par
                email.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 min-w-0 sm:mt-8">
              <QuoteForm
                key={`${search.metier ?? ""}-${search.type ?? ""}`}
                defaultTrade={search.metier}
                defaultType={search.type}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map + urgence */}
      <section className="section-y overflow-x-clip">
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal className="min-w-0 overflow-hidden rounded-[1.5rem] border shadow-[var(--shadow-soft)]">
            <div className="relative aspect-[4/3] bg-navy-950 sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
              <iframe
                title={`Plan d'accès — ${site.address.full}`}
                src={site.mapsEmbed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.6] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </Reveal>
          <Reveal
            delay={0.1}
            className="surface-night relative isolate flex min-w-0 flex-col justify-between overflow-hidden rounded-[1.5rem] p-6 sm:p-8"
          >
            <div className="absolute inset-0 -z-10 blueprint-grid-light" />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <Siren className="size-3.5 text-primary-300" /> Urgence
              </span>
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">Une panne en cours ?</h2>
              <p className="mt-3 text-steel-200">
                N'attendez pas la réponse à un formulaire : appelez directement nos techniciens.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Btn
                href={telHref(site.phones.mobile1)}
                size="lg"
                iconLeft={<Phone className="size-5" />}
                className="w-full justify-center"
              >
                {site.phones.mobile1.display}
              </Btn>
              <Btn
                href={telHref(site.phones.mobile2)}
                variant="light"
                size="lg"
                iconLeft={<Phone className="size-5" />}
                className="w-full justify-center"
              >
                {site.phones.mobile2.display}
              </Btn>
              <Btn
                href="/fr/depannage-urgent"
                variant="ghostLight"
                size="sm"
                className="w-full justify-center sm:col-span-2 lg:col-span-1"
              >
                Les bons réflexes en attendant
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}