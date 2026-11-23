import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { sectors } from "@/data/sectors";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { getIcon } from "@/components/site/icons";
import { SmartImage } from "@/components/site/SmartImage";

/** Interactive sector tabs: list on the left, crossfading image + challenges on the right. */
export function SectorTabs() {
  const [active, setActive] = useState(0);
  const sector = sectors[active] ?? sectors[0];
  if (!sector) return null;

  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
    )
      return;
    event.preventDefault();
    const dir = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + dir + sectors.length) % sectors.length;
    setActive(next);
    document.getElementById(`sector-tab-${next}`)?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
      <div
        role="tablist"
        aria-label="Secteurs d'activité"
        aria-orientation="vertical"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {sectors.map((s, i) => {
          const Icon = getIcon(s.icon);
          const selected = i === active;
          return (
            <button
              key={s.slug}
              id={`sector-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="sector-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:py-5",
                selected
                  ? "border-primary bg-white shadow-[var(--shadow-lift)]"
                  : "border-transparent bg-white/60 hover:border-navy/10 hover:bg-white",
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                  selected ? "bg-brand-gradient text-white" : "bg-primary-50 text-primary",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg font-semibold text-ink">{s.name}</span>
                <span className="hidden text-sm text-muted-foreground lg:block">{s.short}</span>
              </span>
              {selected && (
                <motion.span
                  layoutId="sector-indicator"
                  className="absolute inset-y-4 left-0 hidden w-1 rounded-full bg-brand-gradient lg:block"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="sector-panel"
        role="tabpanel"
        aria-labelledby={`sector-tab-${active}`}
        className="relative overflow-hidden rounded-[1.75rem] bg-night text-white shadow-[var(--shadow-lift)]"
      >
        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={sector.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SmartImage src={sector.image} alt={sector.imageAlt} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/75 to-night-deep/10" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={sector.slug}
              className="absolute inset-x-0 bottom-0 p-6 sm:p-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-3xl font-semibold sm:text-4xl">{sector.name}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {sector.challenges.map((c, ci) => (
                  <li
                    key={c.title}
                    className={cn(
                      "flex items-start gap-2.5 text-sm text-steel-100",
                      ci > 1 && "hidden sm:flex",
                    )}
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary-300" /> {c.title}
                  </li>
                ))}
              </ul>
              <Btn
                href={sector.path}
                variant="white"
                size="sm"
                className="mt-6"
                icon={<ArrowRight className="size-4" />}
              >
                Découvrir le secteur
              </Btn>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
