import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const format = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));

/** Animated figure; the final value is always exposed to assistive tech and crawlers. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const final = `${prefix}${format(value)}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" className="tabular">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </span>
  );
}
