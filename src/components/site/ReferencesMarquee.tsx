import { references } from "@/data/references";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/site/Marquee";

/** Client wordmarks (typographic, no logos) scrolling in a loop. */
export function ReferencesMarquee({
  dark = false,
  className,
  label = "Ils nous font confiance",
}: {
  dark?: boolean;
  className?: string;
  label?: string;
}) {
  const names = [...references, ...references];
  return (
    <section
      aria-label={label}
      className={cn("py-10 lg:py-14", dark ? "bg-night-deep" : "border-y bg-white", className)}
    >
      <div className="container-site mb-6 flex items-center gap-4">
        <p
          className={cn(
            "shrink-0 text-xs font-semibold uppercase tracking-[0.18em]",
            dark ? "text-steel-300" : "text-steel",
          )}
        >
          {label}
        </p>
        <span className={cn("h-px flex-1", dark ? "bg-white/10" : "bg-navy/10")} />
      </div>
      <Marquee duration={45}>
        {names.map((ref, i) => (
          <span key={`${ref.slug}-${i}`} className="flex items-center">
            <span
              className={cn(
                "cursor-default whitespace-nowrap px-8 font-display text-2xl font-semibold tracking-tight transition-colors duration-300 sm:px-12 sm:text-[1.75rem]",
                dark
                  ? "text-steel-400 hover:text-primary-300"
                  : "text-steel-400 hover:text-primary",
              )}
            >
              {ref.name}
            </span>
            <svg
              viewBox="0 0 12 12"
              className={cn("size-2.5", dark ? "text-white/15" : "text-navy/15")}
              aria-hidden="true"
            >
              <path d="M1 11V5l5-4 5 4v6z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
