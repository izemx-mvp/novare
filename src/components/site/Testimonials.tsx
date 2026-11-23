import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/references";
import { cn } from "@/lib/utils";

/** Auto-advancing testimonial carousel (pauses on hover/focus). */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const current = testimonials[index];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [paused, count]);

  if (!current) return null;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Témoignages clients"
    >
      <div className="flex items-center justify-between">
        <Quote className="size-14 text-primary-400/40" aria-hidden="true" />
        <span className="font-display text-sm font-semibold tabular text-steel-300">
          <span className="text-white">{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <div className="relative mt-6 min-h-[16rem] sm:min-h-[13rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="text-balance font-display text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-[2.125rem]">
              « {current.quote} »
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-brand-gradient" />
              <span>
                <span className="block font-semibold text-white">{current.role}</span>
                <span className="block text-sm text-steel-300">{current.establishment}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.role}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Témoignage ${i + 1}`}
              aria-current={i === index}
              className="group py-2"
            >
              <span
                className={cn(
                  "relative block h-1 overflow-hidden rounded-full transition-all duration-500",
                  i === index ? "w-12 bg-white/20" : "w-5 bg-white/20 group-hover:bg-white/40",
                )}
              >
                {/* Autoplay timer: fills over 7s, freezes on hover */}
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className="absolute inset-0 origin-left bg-brand-gradient motion-safe:animate-[fill-x_7s_linear_both]"
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-primary hover:bg-primary"
            aria-label="Témoignage précédent"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-primary hover:bg-primary"
            aria-label="Témoignage suivant"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
