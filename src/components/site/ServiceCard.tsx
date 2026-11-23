import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { trackGlow } from "@/lib/glow";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { SmartImage } from "@/components/site/SmartImage";

const schematic: Record<Service["slug"], "airflow" | "pipes" | "circuit"> = {
  climatisation: "airflow",
  "plomberie-et-chauffage": "pipes",
  "froid-cuisine-industrielle": "pipes",
  "maintenance-multi-technique": "circuit",
  electricite: "circuit",
};

/** Image card used in the homepage bento grid and carousels. */
export function ServiceCard({
  service,
  large = false,
  index,
  className,
}: {
  service: Service;
  large?: boolean;
  /** Optional position, shown as a "01" style counter. */
  index?: number;
  className?: string;
}) {
  const Icon = getIcon(service.icon);
  return (
    <AppLink
      href={service.path}
      onPointerMove={trackGlow}
      className={cn(
        "glow-card group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-night text-white",
        large && "lg:min-h-[36rem]",
        className,
      )}
    >
      <SmartImage
        src={service.image}
        alt={service.imageAlt}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/70 to-night-deep/5" />
      <BlueprintLines
        variant={schematic[service.slug]}
        className="absolute inset-x-0 top-0 h-1/2 w-full text-primary-300/0 transition-colors duration-700 group-hover:text-primary-300/60"
      />
      {index !== undefined && (
        <span className="absolute left-6 top-6 z-[2] font-display text-sm font-semibold tabular text-white/60 sm:left-7 sm:top-7">
          {String(index + 1).padStart(2, "0")}
          <span className="ml-2 inline-block h-px w-6 align-middle bg-white/30 transition-all duration-500 group-hover:w-10 group-hover:bg-primary-300" />
        </span>
      )}
      <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary">
        <ArrowUpRight className="size-5" />
      </div>
      <div className={cn("relative z-[2] p-6 sm:p-7", large && "lg:p-10")}>
        <HouseBadge>
          <Icon className="size-5" />
        </HouseBadge>
        <h3 className={cn("mt-5 text-2xl font-semibold", large && "lg:text-4xl")}>
          {service.name}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-md text-sm leading-relaxed text-steel-200",
            large && "lg:text-base",
          )}
        >
          {service.short}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
            >
              {h}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 opacity-100 transition-all duration-500 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          Découvrir le métier
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      {/* Bottom gradient bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[3] h-[3px] origin-left scale-x-0 bg-brand-gradient transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </AppLink>
  );
}

/** Light icon card (solutions grids, other trades). */
export function ServiceTile({ service, className }: { service: Service; className?: string }) {
  const Icon = getIcon(service.icon);
  return (
    <AppLink
      href={service.path}
      onPointerMove={trackGlow}
      className={cn(
        "glow-card group flex h-full flex-col rounded-[1.25rem] border bg-white p-6 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <HouseBadge tone="light">
          <Icon className="size-5" />
        </HouseBadge>
        <ArrowUpRight className="size-5 text-steel transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <span className="mt-5 text-sm font-semibold text-primary">Découvrir</span>
    </AppLink>
  );
}
