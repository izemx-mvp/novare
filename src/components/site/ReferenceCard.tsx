import { MapPin, Plus } from "lucide-react";
import type { Reference } from "@/data/references";
import { getService } from "@/data/services";
import { cn } from "@/lib/utils";
import { trackGlow } from "@/lib/glow";
import { SmartImage } from "@/components/site/SmartImage";

export function ReferenceCard({
  reference,
  onOpen,
  className,
}: {
  reference: Reference;
  onOpen?: (r: Reference) => void;
  className?: string;
}) {
  const content = (
    <>
      <div className="relative overflow-hidden rounded-t-[1.25rem]">
        <SmartImage
          src={reference.image}
          alt={reference.imageAlt}
          aspect="4/3"
          imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/80 via-night-deep/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
          {reference.sectorLabel}
        </span>
        <p className="absolute bottom-4 left-5 right-5 font-display text-2xl font-semibold text-white">
          {reference.name}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" /> {reference.city}
        </p>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink/80">
          {reference.short}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {reference.trades.map((slug) => (
            <li
              key={slug}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
            >
              {getService(slug)?.shortName}
            </li>
          ))}
        </ul>
        {onOpen && (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" /> Voir
            le détail
          </span>
        )}
      </div>
    </>
  );

  const classes = cn(
    "glow-card group flex h-full flex-col rounded-[1.25rem] border bg-white text-left shadow-[var(--shadow-soft)]",
    className,
  );

  return onOpen ? (
    <button
      type="button"
      onClick={() => onOpen(reference)}
      onPointerMove={trackGlow}
      className={classes}
      aria-haspopup="dialog"
    >
      {content}
    </button>
  ) : (
    <div onPointerMove={trackGlow} className={classes}>
      {content}
    </div>
  );
}
