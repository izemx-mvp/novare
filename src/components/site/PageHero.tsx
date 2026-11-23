import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { SmartImage } from "@/components/site/SmartImage";

type Props = {
  eyebrow?: string | undefined;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[] | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  icon?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  size?: "md" | "lg";
  lines?: "pipes" | "circuit" | "airflow" | "grid";
  className?: string | undefined;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark page hero: optional parallax photo, blueprint lines, breadcrumbs, title, actions. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt = "",
  icon,
  children,
  aside,
  size = "md",
  lines = "pipes",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.25]);

  // Cursor spotlight (mouse only)
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${sx}px ${sy}px, rgb(0 120 190 / 0.16), transparent 60%)`;
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
      className={cn(
        "surface-night relative overflow-hidden",
        size === "lg"
          ? "flex min-h-[88svh] items-end pb-16 pt-40 lg:pb-24 lg:pt-48"
          : "pb-16 pt-36 lg:pb-24 lg:pt-48",
        className,
      )}
    >
      {image ? (
        <>
          <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y }}>
            <SmartImage
              src={image}
              alt={imageAlt}
              priority
              className="h-full w-full"
              imgClassName="motion-safe:animate-[hero-zoom_16s_ease-out_both]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-night-deep via-night-deep/85 to-night/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-transparent to-night-deep/60" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 blueprint-grid-light [mask-image:radial-gradient(ellipse_at_70%_30%,black_25%,transparent_75%)]" />
          {/* Oversized outlined house silhouette echoing the logo */}
          <svg
            viewBox="0 0 200 170"
            aria-hidden="true"
            className="absolute -bottom-24 right-[-6%] hidden h-[130%] text-primary-300/[0.07] md:block"
            fill="none"
          >
            <path
              d="M92 4 37 35c-8 4.5-13 13-13 22v61c0 14 11 25 25 25h102c14 0 25-11 25-25V57c0-9-5-17.5-13-22L108 4c-5-3-11-3-16 0Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute -right-40 -top-40 size-[640px] rounded-full glow-radial opacity-70" />
          <BlueprintLines
            variant={lines}
            className="absolute -right-24 bottom-0 h-[70%] w-[70%] text-primary-400/40"
          />
        </>
      )}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 line-glow opacity-60" />

      <motion.div style={{ opacity: fade }} className="container-site relative z-10">
        <div className={cn("grid grid-cols-1 items-end gap-12", aside && "lg:grid-cols-[1.25fr_0.75fr]")}>
          <div className="min-w-0 max-w-3xl">
            {crumbs && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <Breadcrumbs items={crumbs} className="mb-8" />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
              className="flex items-center gap-4"
            >
              {icon}
              {eyebrow && <p className="eyebrow eyebrow-light">{eyebrow}</p>}
            </motion.div>
            <div className="mt-5 overflow-hidden pb-[0.1em]">
              <motion.h1
                initial={reduce ? false : { y: "60%", opacity: 0, filter: "blur(8px)" }}
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease, delay: 0.12 }}
                className="text-balance text-[2.25rem] font-semibold leading-[1.04] text-white sm:text-5xl lg:text-[4.25rem]"
              >
                {title}
              </motion.h1>
            </div>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.2 }}
                className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-steel-200 md:text-lg"
              >
                {description}
              </motion.p>
            )}
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.28 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                {children}
              </motion.div>
            )}
          </div>
          {aside && (
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
            >
              {aside}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
