import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Process stepper: horizontal with an animated progress line on desktop,
 * vertical timeline on mobile.
 */
export function Stepper({
  steps,
  dark = false,
  className,
}: {
  steps: Step[];
  dark?: boolean;
  className?: string;
}) {
  const cols =
    steps.length === 4
      ? "lg:grid-cols-4"
      : steps.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-5";
  return (
    <div className={cn("relative", className)}>
      {/* Desktop line */}
      <div
        className={cn(
          "absolute left-0 right-0 top-6 hidden h-px lg:block",
          dark ? "bg-white/10" : "bg-navy/10",
        )}
        aria-hidden="true"
      >
        <motion.div
          className="h-full origin-left bg-brand-gradient"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.8, ease }}
        />
      </div>
      {/* Mobile line */}
      <div
        className={cn(
          "absolute bottom-6 left-6 top-6 w-px lg:hidden",
          dark ? "bg-white/10" : "bg-navy/10",
        )}
        aria-hidden="true"
      >
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-steel via-primary to-navy"
          style={{ height: "100%" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.8, ease }}
        />
      </div>
      <ol className={cn("relative grid gap-8 lg:gap-6", cols)}>
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            className="relative flex gap-5 lg:flex-col lg:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, ease, delay: 0.25 + index * 0.18 }}
          >
            <span
              className={cn(
                "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold tabular ring-8",
                dark ? "bg-night text-white ring-night-deep" : "bg-white text-navy ring-white",
              )}
            >
              <span className="absolute inset-0 rounded-full bg-brand-gradient p-px">
                <span
                  className={cn(
                    "flex h-full w-full items-center justify-center rounded-full",
                    dark ? "bg-night" : "bg-white",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
            </span>
            <div className="pt-1 lg:pt-6">
              <h3 className={cn("text-lg font-semibold", dark ? "text-white" : "text-ink")}>
                {step.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm leading-relaxed",
                  dark ? "text-steel-200" : "text-muted-foreground",
                )}
              >
                {step.text}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
