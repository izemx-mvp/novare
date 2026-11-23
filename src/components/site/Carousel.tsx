import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Native scroll-snap carousel with previous / next controls. */
export function Carousel({
  children,
  label,
  className,
  dark = false,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const btn = cn(
    "flex size-11 items-center justify-center rounded-full border transition-colors",
    dark
      ? "border-white/20 text-white hover:border-primary hover:bg-primary"
      : "border-navy/15 text-navy hover:border-primary hover:bg-primary hover:text-white",
  );
  return (
    <div className={className} role="region" aria-roledescription="carrousel" aria-label={label}>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" className={btn} onClick={() => scroll(-1)} aria-label="Précédent">
          <ArrowLeft className="size-4" />
        </button>
        <button type="button" className={btn} onClick={() => scroll(1)} aria-label="Suivant">
          <ArrowRight className="size-4" />
        </button>
      </div>
      <div
        ref={ref}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8"
      >
        {children}
      </div>
    </div>
  );
}
