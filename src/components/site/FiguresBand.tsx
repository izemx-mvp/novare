import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { CountUp } from "@/components/site/CountUp";
import { Stagger, StaggerItem } from "@/components/site/Reveal";

/** Key figures with count-up on a dark glowing band. */
export function FiguresBand({ className, title }: { className?: string; title?: string }) {
  return (
    <section
      className={cn("surface-night relative overflow-hidden py-20 lg:py-28", className)}
      aria-label="Chiffres clés"
    >
      <div className="absolute inset-0 -z-10 blueprint-grid-light" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-radial opacity-70" />
      <BlueprintLines
        variant="circuit"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 w-full text-primary-400/25"
      />
      <div className="container-site">
        {title && <p className="eyebrow eyebrow-light mb-12">{title}</p>}
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {site.figures.map((figure) => (
            <StaggerItem
              key={figure.label}
              className="relative min-w-0 border-l border-white/10 pl-4 sm:pl-5 lg:pl-8"
            >
              <span className="absolute -left-px top-0 h-10 w-px bg-brand-gradient" />
              <CountUp
                value={figure.value}
                suffix={figure.suffix}
                className="block whitespace-nowrap font-display text-[2.6rem] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
              />
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.14em] text-steel-300">
                {figure.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
