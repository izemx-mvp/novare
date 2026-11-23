import type { Item } from "@/data/services";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/site/GlowCard";
import { HouseBadge } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { Stagger, StaggerItem } from "@/components/site/Reveal";

/** Icon + title + text cards in a responsive grid. */
export function FeatureGrid({
  items,
  columns = 3,
  dark = false,
  numbered = false,
  className,
}: {
  items: Item[];
  columns?: 2 | 3 | 4;
  dark?: boolean;
  numbered?: boolean;
  className?: string;
}) {
  const cols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <Stagger className={cn("grid grid-cols-1 gap-5", cols, className)}>
      {items.map((item, i) => {
        const Icon = getIcon(item.icon);
        return (
          <StaggerItem key={item.title} className="h-full min-w-0">
            <GlowCard
              className={cn(
                "group relative flex h-full flex-col overflow-hidden p-6 sm:p-7",
                dark
                  ? "border-white/10 bg-white/[0.03] hover:border-primary-400/60"
                  : "bg-white shadow-[var(--shadow-soft)]",
              )}
            >
              {/* top accent line, grows on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              {/* oversized faded number watermark */}
              {numbered && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -bottom-6 -right-2 font-display text-[7rem] font-bold leading-none tabular transition-all duration-500 group-hover:-translate-y-1",
                    dark ? "text-white/[0.04] group-hover:text-white/[0.07]" : "text-navy/[0.04] group-hover:text-primary/[0.08]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <div className="relative flex items-start justify-between">
                <HouseBadge
                  tone={dark ? "dark" : "gradient"}
                  className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                >
                  <Icon className="size-5" />
                </HouseBadge>
                {numbered && (
                  <span
                    className={cn(
                      "font-display text-sm font-semibold tabular",
                      dark ? "text-steel-500" : "text-steel-300",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
              <h3 className={cn("relative mt-6 text-lg font-semibold", dark ? "text-white" : "text-ink")}>
                {item.title}
              </h3>
              <p
                className={cn(
                  "relative mt-2 text-[0.9375rem] leading-relaxed",
                  dark ? "text-steel-200" : "text-muted-foreground",
                )}
              >
                {item.text}
              </p>
            </GlowCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
