import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { coverage } from "@/data/maintenance";
import { getService } from "@/data/services";
import { cn } from "@/lib/utils";
import { getIcon } from "@/components/site/icons";

/** Interactive coverage checklist: toggle trades to build the scope of a contract. */
export function CoverageChecklist() {
  const [selected, setSelected] = useState<string[]>([
    "climatisation",
    "froid-cuisine-industrielle",
  ]);
  const toggle = (trade: string) =>
    setSelected((s) => (s.includes(trade) ? s.filter((t) => t !== trade) : [...s, trade]));
  const groups = coverage.filter((g) => selected.includes(g.trade));
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold text-ink">Sélectionnez les métiers à couvrir</p>
        <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
          {coverage.map((group) => {
            const service = getService(group.trade);
            const Icon = service ? getIcon(service.icon) : Check;
            const on = selected.includes(group.trade);
            return (
              <button
                key={group.trade}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => toggle(group.trade)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all lg:px-5 lg:py-4",
                  on
                    ? "border-primary bg-white text-ink shadow-[var(--shadow-soft)]"
                    : "border-navy/10 bg-white/50 text-muted-foreground hover:border-navy/20",
                )}
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl transition-colors",
                    on ? "bg-brand-gradient text-white" : "bg-navy/5 text-steel",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="flex-1">{group.label}</span>
                <span
                  className={cn(
                    "relative hidden h-6 w-11 rounded-full transition-colors lg:block",
                    on ? "bg-primary" : "bg-navy/15",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 size-4 rounded-full bg-white shadow transition-all",
                      on ? "left-6" : "left-1",
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div
        className="rounded-[1.5rem] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8"
        aria-live="polite"
      >
        <div className="flex items-baseline justify-between gap-4 border-b pb-5">
          <p className="font-display text-xl font-semibold text-ink">
            Votre périmètre de maintenance
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-display text-2xl font-semibold text-primary tabular">
              {total}
            </span>{" "}
            points de contrôle
          </p>
        </div>
        {groups.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">
            Sélectionnez au moins un métier pour afficher les opérations couvertes.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {groups.map((group) => (
                <motion.div
                  key={group.trade}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {group.label}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
