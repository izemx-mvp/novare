import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Part = { text: string; accent?: boolean };

/**
 * Large statement whose words light up one by one as the user scrolls.
 * Pass parts to highlight some words with the brand gradient.
 */
export function ScrollRevealText({ parts, className }: { parts: Part[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });

  const words = parts.flatMap((part) =>
    part.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, accent: part.accent })),
  );

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {words.map(({ w, accent }, i) => (
          <span key={i} className={cn("mr-[0.25em] inline-block", accent && "bg-brand-gradient bg-clip-text text-transparent")}>
            {w}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map(({ w, accent }, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} accent={accent}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className={cn("inline-block", accent && "bg-brand-gradient bg-clip-text text-transparent")}>
        {children}
      </motion.span>
    </span>
  );
}
