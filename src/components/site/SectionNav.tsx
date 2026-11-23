import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

/**
 * Sticky in-page navigation for long pages (trade / sector templates).
 * Highlights the section currently in view; scrolls horizontally on mobile.
 */
export function SectionNav({ items, className }: { items: Item[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Sur cette page"
      className={cn("sticky top-[5.25rem] z-30 -mt-7 lg:top-[5.75rem]", className)}
    >
      <div className="container-site">
        <ul className="no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-navy/10 bg-white/85 p-1.5 shadow-[0_12px_32px_-18px_rgb(11_29_58/0.4)] backdrop-blur-xl">
          {items.map((item) => {
            const selected = item.id === active;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "relative z-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                    selected ? "text-white" : "text-ink/70 hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="section-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-gradient shadow-[0_6px_16px_-6px_rgb(0_120_190/0.7)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
