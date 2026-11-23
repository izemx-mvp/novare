import { ArrowRight, ArrowUpRight, Siren } from "lucide-react";
import { motion } from "framer-motion";
import { images } from "@/config/images";
import { nav, site, telHref } from "@/config/site";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";
import { AppLink } from "@/components/site/AppLink";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { SmartImage } from "@/components/site/SmartImage";

const panel = {
  initial: { opacity: 0, y: 10, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.99 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

export function ExpertisesMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return (
    <motion.div
      id={id}
      {...panel}
      className="overflow-hidden rounded-[1.5rem] border border-navy/10 bg-white text-ink shadow-[0_30px_80px_-24px_rgb(11_29_58/0.35)]"
    >
      <div className="grid grid-cols-[1.15fr_0.85fr_0.9fr]">
        <div className="p-7">
          <p className="eyebrow">Nos métiers</p>
          <ul className="mt-4 space-y-1">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <li key={service.slug}>
                  <AppLink
                    href={service.path}
                    onClick={onNavigate}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-primary-50"
                  >
                    <HouseBadge tone="light" className="size-10">
                      <Icon className="size-4" />
                    </HouseBadge>
                    <span>
                      <span className="flex items-center gap-1 font-display font-semibold text-ink group-hover:text-primary">
                        {service.name}
                        <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">
                        {service.short}
                      </span>
                    </span>
                  </AppLink>
                </li>
              );
            })}
          </ul>
          <AppLink
            href="/fr/nos-metiers"
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-primary hover:underline"
          >
            Tous nos métiers <ArrowRight className="size-4" />
          </AppLink>
        </div>
        <div className="border-l border-navy/10 bg-offwhite/70 p-7">
          <p className="eyebrow">Secteurs</p>
          <ul className="mt-4 space-y-1">
            {sectors.map((sector) => {
              const Icon = getIcon(sector.icon);
              return (
                <li key={sector.slug}>
                  <AppLink
                    href={sector.path}
                    onClick={onNavigate}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white"
                  >
                    <Icon className="size-4 text-steel group-hover:text-primary" />
                    <span className="font-display font-semibold text-ink group-hover:text-primary">
                      {sector.name}
                    </span>
                  </AppLink>
                </li>
              );
            })}
          </ul>
          <AppLink
            href="/fr/secteurs"
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-primary hover:underline"
          >
            Tous les secteurs <ArrowRight className="size-4" />
          </AppLink>
        </div>
        <div className="p-4">
          <AppLink
            href="/fr/depannage-urgent"
            onClick={onNavigate}
            className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.15rem] bg-night p-6 text-white"
          >
            <SmartImage
              src={images.depannageHero}
              alt="Technicien Novare en intervention de dépannage"
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/70 to-night-deep/10" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                <Siren className="size-3.5 text-primary-300" /> 7j/7
              </span>
              <p className="mt-4 font-display text-2xl font-semibold">Dépannage urgent</p>
              <p className="mt-2 text-sm text-steel-200">
                Une panne de froid, une fuite, une coupure ? Nos techniciens interviennent
                rapidement.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 group-hover:text-white">
                En savoir plus <ArrowUpRight className="size-4" />
              </span>
            </div>
          </AppLink>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-navy/10 bg-offwhite px-7 py-4 text-sm">
        <span className="text-muted-foreground">Besoin d'un conseil technique ?</span>
        <a
          href={telHref(site.phones.mobile1)}
          className="font-semibold text-navy hover:text-primary"
        >
          Appelez-nous au {site.phones.mobile1.display}
        </a>
      </div>
    </motion.div>
  );
}

export function NovareMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  return (
    <motion.div
      id={id}
      {...panel}
      className="w-[22rem] overflow-hidden rounded-[1.25rem] border border-navy/10 bg-white p-3 text-ink shadow-[0_30px_80px_-24px_rgb(11_29_58/0.35)]"
    >
      <ul>
        {nav.novare.map((item) => (
          <li key={item.href}>
            <AppLink
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors hover:bg-primary-50"
            >
              <span>
                <span className="block font-display font-semibold group-hover:text-primary">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ArrowRight className="size-4 text-steel transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </AppLink>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
