import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  allPhones,
  nav,
  site,
  telHref,
} from "@/config/site";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";
import { AppLink } from "@/components/site/AppLink";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { Logo } from "@/components/site/Logo";

const socials = [
  { key: "facebook", label: "Facebook", icon: Facebook, href: site.socials.facebook },
  { key: "instagram", label: "Instagram", icon: Instagram, href: site.socials.instagram },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, href: site.socials.linkedin },
].filter((s) => s.href);

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white">
        <span className="h-px w-4 bg-brand-gradient" aria-hidden="true" />
        {title}
      </p>
      <ul className="mt-5 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <AppLink
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-steel-200 transition-colors duration-200 hover:text-white"
            >
              <ArrowRight
                className="size-3.5 -ml-5 shrink-0 text-primary-300 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="bg-gradient-to-r from-primary-300 to-primary-300 bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                {link.label}
              </span>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  href,
  icon,
  children,
  external = false,
}: {
  href?: string;
  icon: ReactNode;
  children: ReactNode;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary-300 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </>
  );
  const cls = "group flex items-center gap-3 text-steel-100 transition-colors hover:text-white";
  return href ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <div className={cn_(cls, "items-start")}>{inner}</div>
  );
}

// tiny local join helper (avoids importing cn just for one case)
const cn_ = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export function Footer() {
  const scrollTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="surface-night relative isolate overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 blueprint-grid-light opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 -z-10 h-[24rem] w-[24rem] rounded-full bg-navy/60 blur-[100px]"
      />
      <BlueprintLines
        variant="pipes"
        className="absolute -left-20 top-0 -z-10 h-80 w-[60%] text-primary-400/20"
      />
      <div className="line-glow" />

      {/* Main grid */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div className="min-w-0 max-w-sm">
            <Logo onDark />
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-steel-200">{site.pitch}</p>
            <div className="mt-8 space-y-3 text-[0.9375rem]">
              {allPhones.map((phone) => (
                <ContactRow key={phone.tel} href={telHref(phone)} icon={<Phone className="size-4" />}>
                  <span className="tabular">{phone.display}</span>
                  <span className="ml-2 text-xs text-steel-400">{phone.label}</span>
                </ContactRow>
              ))}
              <ContactRow href={`mailto:${site.email}`} icon={<Mail className="size-4" />}>
                {site.email}
              </ContactRow>
              <ContactRow icon={<Clock className="size-4" />}>
                {site.hours.regular}
                <br />
                <span className="text-primary-300">{site.hours.emergency}</span>
              </ContactRow>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            <Column
              title="Nos métiers"
              links={services.map((s) => ({ label: s.name, href: s.path }))}
            />
            <Column
              title="Secteurs"
              links={sectors.map((s) => ({ label: s.name, href: s.path }))}
            />
            <Column
              title="Liens utiles"
              links={[
                ...nav.novare.map((n) => ({ label: n.label, href: n.href })),
                ...nav.quick.slice(2, 7),
              ]}
            />
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-px w-4 bg-brand-gradient" aria-hidden="true" />
                Nous trouver
              </p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 block overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[var(--shadow-glow)]"
              >
                <div className="relative h-32 overflow-hidden bg-navy-950">
                  <svg
                    viewBox="0 0 240 128"
                    className="absolute inset-0 h-full w-full text-steel-500 transition-transform duration-700 group-hover:scale-110"
                    fill="none"
                    aria-hidden="true"
                  >
                    <g stroke="currentColor" strokeWidth="1" opacity=".5">
                      <path d="M0 40h240M0 92h240M60 0v128M150 0v128M0 128L120 0M90 128L240 20" />
                      <path d="M20 70c40-20 80 20 120 0s60-20 100 0" strokeDasharray="3 5" />
                    </g>
                  </svg>
                  {/* radar rings */}
                  <span className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-400/30 motion-safe:animate-ping [animation-duration:2.4s]" />
                  <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient shadow-[var(--shadow-glow)]">
                    <MapPin className="size-5 text-white" />
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 p-4 text-sm">
                  <span className="text-steel-100">{site.address.full}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-primary-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
              {socials.length > 0 && (
                <ul className="mt-5 flex gap-2">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex size-10 items-center justify-center rounded-full border border-white/15 text-steel-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <s.icon className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Giant outlined wordmark */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p
          className="container-site -mb-[0.18em] text-center font-display text-[22vw] font-bold leading-none tracking-tighter text-transparent lg:text-[15rem]"
          style={{
            WebkitTextStroke: "1px rgb(90 135 166 / 0.28)",
            maskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
          }}
        >
          NOVARE
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-night/40 backdrop-blur-sm">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-steel-300 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {[...nav.legal, { label: "FAQ", href: "/fr/faq" }].map((link) => (
                <li key={link.href}>
                  <AppLink href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollTop}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-steel-100 transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              Haut de page
              <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}