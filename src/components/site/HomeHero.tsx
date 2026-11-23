import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, CalendarCheck, ClipboardCheck, Wrench } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { CONTACT_PATH, site } from "@/config/site";
import { images } from "@/config/images";
import { heroIndicators } from "@/data/company";
import { BlueprintBuilding } from "@/components/site/BlueprintBuilding";
import { Btn } from "@/components/site/Button";
import { SmartImage } from "@/components/site/SmartImage";

const ease = [0.22, 1, 0.36, 1] as const;

/** Headline split in words; `accent` words get the light brand gradient. */
const headline: { w: string; accent?: boolean }[] = [
  { w: "Solutions" },
  { w: "techniques" },
  { w: "fiables", accent: true },
  { w: "pour" },
  { w: "vos" },
  { w: "bâtiments." },
];

/** Floating cards around the blueprint: illustrate the Novare process (not live data). */
const processCards = [
  { icon: ClipboardCheck, title: "Étude technique", status: "Diagnostic sur site", pos: "left-0 top-[12%]" },
  { icon: Wrench, title: "Intervention", status: "Techniciens qualifiés", pos: "right-0 top-[44%]" },
  { icon: CalendarCheck, title: "Maintenance", status: "Visites préventives planifiées", pos: "left-[8%] bottom-[6%]" },
];

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const blueprintY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.2]);

  // Cursor spotlight (desktop pointer only)
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(0 120 190 / 0.18), transparent 60%)`;
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="surface-night relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <motion.div className="absolute inset-x-0 -top-[6%] h-[115%]" style={{ y: imageY }}>
        <SmartImage
          src={images.homeHero}
          alt="Local technique d'un hôtel entretenu par Novare Solutions Techniques"
          priority
          className="h-full w-full"
          imgClassName="motion-safe:animate-[hero-zoom_18s_ease-out_both]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-night-deep via-night-deep/90 to-night/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/20 to-night-deep/70" />
      <div className="absolute inset-0 blueprint-grid-light opacity-60 [mask-image:radial-gradient(ellipse_at_30%_40%,black_30%,transparent_75%)]" />
      <div className="absolute -right-48 top-1/4 size-[720px] rounded-full glow-radial opacity-60" />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-site relative z-10 grid flex-1 items-center gap-10 pb-10 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-16 lg:pt-40"
      >
        <div className="min-w-0">
          {/* Live status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-2 pr-4 text-xs font-medium text-steel-100 backdrop-blur-md sm:text-sm"
          >
            <span className="flex h-6 items-center gap-1.5 rounded-full bg-primary/20 px-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary-200">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-primary-300 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary-300" />
              </span>
              7j/7
            </span>
            {site.hours.emergency}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="eyebrow eyebrow-light mt-8 block"
          >
            Marrakech · Depuis plus de 10 ans
          </motion.p>

          {/* Word-by-word mask reveal */}
          <h1
            className="mt-6 text-balance font-semibold leading-[1.02] text-white"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            {headline.map(({ w, accent }, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={accent ? "inline-block text-gradient-light" : "inline-block"}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-steel-200"
          >
            Installation, maintenance et optimisation de vos équipements — climatisation, plomberie,
            froid, électricité — pour hôtels, restaurants, résidences et industries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.72 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Btn href={CONTACT_PATH} size="lg" magnetic icon={<ArrowRight className="size-5" />}>
              Demander un devis
            </Btn>
            <Btn href="/fr/nos-metiers" variant="light" size="lg">
              Nos métiers
            </Btn>
          </motion.div>
        </div>

        {/* Blueprint + floating process cards */}
        <motion.div style={{ y: blueprintY }} className="relative hidden lg:block">
          <BlueprintBuilding className="drop-shadow-[0_0_40px_rgb(0_120_190/0.25)]" />
          {processCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1 + i * 0.25 }}
              className={`absolute ${card.pos}`}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                className="glass-dark flex items-center gap-3 rounded-2xl border border-white/15 py-3 pl-3 pr-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-gradient">
                  <card.icon className="size-5 text-white" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-white">{card.title}</span>
                  <span className="block text-xs text-steel-300">{card.status}</span>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glass indicators strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.9 }}
        className="container-site relative z-10 pb-8 lg:pb-10"
      >
        <div className="glass-dark relative grid grid-cols-3 items-center overflow-hidden rounded-[1.25rem] border border-white/10">
          <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/60 to-transparent" />
          {heroIndicators.map((indicator, i) => (
            <div
              key={indicator.label}
              className={i > 0 ? "border-l border-white/10 px-3 py-4 sm:px-8 sm:py-5" : "px-3 py-4 sm:px-8 sm:py-5"}
            >
              <p className="font-display text-xl font-semibold text-white tabular sm:text-3xl">
                {indicator.value}
              </p>
              <p className="mt-1 text-[0.7rem] leading-snug text-steel-300 sm:text-sm">{indicator.label}</p>
            </div>
          ))}
        </div>
        <a
          href="#metiers"
          className="mx-auto mt-6 hidden w-fit flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-steel-300 transition-colors hover:text-white sm:flex"
        >
          Découvrir
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
            <span className="scroll-cue h-2 w-0.5 rounded-full bg-white" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
