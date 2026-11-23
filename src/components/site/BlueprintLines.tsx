import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "airflow" | "pipes" | "circuit" | "grid";

const paths: Record<Variant, { viewBox: string; d: string[]; nodes?: [number, number][] }> = {
  airflow: {
    viewBox: "0 0 600 300",
    d: [
      "M0 80c60-30 120 30 180 0s120-30 180 0 120 30 180 0 60-15 60-15",
      "M0 140c60-30 120 30 180 0s120-30 180 0 120 30 180 0 60-15 60-15",
      "M0 200c60-30 120 30 180 0s120-30 180 0 120 30 180 0 60-15 60-15",
    ],
  },
  pipes: {
    viewBox: "0 0 600 300",
    d: [
      "M0 60h160c11 0 20 9 20 20v90c0 11 9 20 20 20h400",
      "M0 120h90c11 0 20 9 20 20v110M110 190h170c11 0 20-9 20-20V40c0-11 9-20 20-20h280",
      "M420 20v80c0 11 9 20 20 20h160",
    ],
    nodes: [
      [180, 80],
      [110, 190],
      [300, 170],
      [420, 100],
    ],
  },
  circuit: {
    viewBox: "0 0 600 300",
    d: [
      "M0 150h120l30-30h120l20 20h140l30-30h140",
      "M60 150v80h100l20 20h160M270 120V40h120l20-20h190",
      "M410 140v90h120l20 20h50",
    ],
    nodes: [
      [120, 150],
      [270, 120],
      [410, 140],
      [160, 230],
      [530, 230],
    ],
  },
  grid: {
    viewBox: "0 0 600 300",
    d: ["M0 100h600M0 200h600M150 0v300M300 0v300M450 0v300"],
  },
};

/** Thin schematic lines that draw themselves when scrolled into view. */
export function BlueprintLines({
  variant = "pipes",
  className,
  delay = 0,
}: {
  variant?: Variant;
  className?: string;
  delay?: number;
}) {
  const shape = paths[variant];
  return (
    <svg
      viewBox={shape.viewBox}
      className={cn("pointer-events-none", className)}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {shape.d.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              pathLength: { duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: delay + i * 0.25 },
              opacity: { duration: 0.4, delay: delay + i * 0.25 },
            }}
          />
        ))}
      </g>
      {shape.nodes?.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="currentColor"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 1.2 + i * 0.15 }}
        />
      ))}
    </svg>
  );
}
