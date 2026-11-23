import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * 250ms fade + 8px slide on client-side navigations.
 * The first (server-rendered) page is shown immediately, without animation.
 */
export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);
  return (
    <motion.div
      key={routeKey}
      initial={firstRender.current ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
