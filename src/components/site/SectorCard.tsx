import { ArrowRight } from "lucide-react";
import type { Sector } from "@/data/sectors";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { trackGlow } from "@/lib/glow";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { SmartImage } from "@/components/site/SmartImage";

export function SectorCard({
  sector,
  className,
  tall = false,
}: {
  sector: Sector;
  className?: string;
  tall?: boolean;
}) {
  const Icon = getIcon(sector.icon);
  return (
    <AppLink
      href={sector.path}
      onPointerMove={trackGlow}
      className={cn(
        "glow-card group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-night text-white",
        tall && "lg:min-h-[30rem]",
        className,
      )}
    >
      <SmartImage
        src={sector.image}
        alt={sector.imageAlt}
        className="absolute inset-0 h-full w-full"
        imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/60 to-transparent" />
      <div className="relative z-[2] p-6 sm:p-8">
        <HouseBadge tone="dark">
          <Icon className="size-5" />
        </HouseBadge>
        <h3 className="mt-5 text-2xl font-semibold lg:text-3xl">{sector.name}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel-200">{sector.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-300 transition-colors group-hover:text-white">
          Voir le secteur{" "}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </AppLink>
  );
}
