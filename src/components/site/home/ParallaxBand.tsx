import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Award, Building2, Quote } from "lucide-react";
import { useRef } from "react";
import { images } from "@/config/images";

/**
 * Full-bleed cinematic image band with parallax, a brand statement
 * and two floating glass figure cards.
 */
export function ParallaxBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-night text-white sm:min-h-[38rem] lg:min-h-[44rem]"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[14%] -z-20">
        <img
          src={images.aboutHero}
          alt="Équipe de techniciens Novare dans un local technique"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/80 via-transparent to-transparent" />

      <div className="container-site relative grid w-full gap-10 pb-14 pt-32 sm:pb-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:pb-24">
        <div className="max-w-3xl">
          <Quote className="size-10 text-primary-300" aria-hidden="true" />
          <p className="mt-6 text-balance font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[3.25rem]">
            La continuité de service n'est pas une option.{" "}
            <span className="text-gradient-light">C'est notre métier.</span>
          </p>
          <p className="mt-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-steel-200">
            <span className="h-px w-10 bg-brand-gradient" aria-hidden="true" />
            L'équipe Novare, Marrakech
          </p>
        </div>

        <motion.div style={{ y: cardY }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { icon: Building2, value: "1286+", label: "projets réalisés pour hôtels, restaurants et industries" },
            { icon: Award, value: "10+ ans", label: "d'expérience en génie climatique et maintenance" },
          ].map((card) => (
            <div
              key={card.value}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-[var(--shadow-glow)]">
                <card.icon className="size-6" />
              </span>
              <span>
                <span className="tabular block font-display text-2xl font-semibold">{card.value}</span>
                <span className="block text-sm leading-snug text-steel-200">{card.label}</span>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
