import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

type Props = { children: ReactNode; className?: string | undefined; delay?: number };

/** Fade-up 24px once the element enters the viewport. */
export function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

/** Parent that staggers its <StaggerItem> children by 70ms. */
export function Stagger({ children, className }: Omit<Props, "delay">) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: Omit<Props, "delay">) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Clip-path wipe + slight zoom-out for images. */
export function ImageReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(14% 10% 14% 10% round 28px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 1.1, ease, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
