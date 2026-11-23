import { motion, useScroll, useSpring } from "framer-motion";

/** Gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[65] h-[3px] origin-left bg-brand-gradient"
      style={{ scaleX }}
    />
  );
}
