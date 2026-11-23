import { cn } from "@/lib/utils";

/**
 * Oversized editorial marquee: words scroll endlessly, alternating solid and outlined.
 * Decorative only (aria-hidden); pauses on hover; disabled with reduced motion via CSS.
 */
export function TextMarquee({
  words = ["Climatisation", "Plomberie", "Froid", "Électricité", "Maintenance"],
  dark = false,
  reverse = false,
  className,
}: {
  words?: string[];
  dark?: boolean;
  reverse?: boolean;
  className?: string;
}) {
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {words.map((w, i) => (
        <li key={w} className="flex items-center gap-8 sm:gap-12">
          <span
            className={cn(
              "whitespace-nowrap font-display text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl",
              i % 2 === 0
                ? dark
                  ? "text-white"
                  : "text-ink"
                : "text-transparent",
            )}
            style={
              i % 2 === 1
                ? { WebkitTextStroke: dark ? "1px rgb(157 184 204 / 0.55)" : "1px rgb(19 66 134 / 0.35)" }
                : undefined
            }
          >
            {w}
          </span>
          <svg viewBox="0 0 24 20" className="size-6 shrink-0 sm:size-9" aria-hidden="true">
            <defs>
              <linearGradient id={`tm-g-${i}`} x1="0" x2="1">
                <stop offset="0" stopColor="#5A87A6" />
                <stop offset=".5" stopColor="#0078BE" />
                <stop offset="1" stopColor="#134286" />
              </linearGradient>
            </defs>
            <path
              d="M11 .7 4.4 4.4A3 3 0 0 0 3 7v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-1.4-2.6L13 .7a2 2 0 0 0-2 0Z"
              fill={`url(#tm-g-${i})`}
            />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "marquee relative select-none overflow-hidden py-10 sm:py-14",
        dark ? "bg-night" : "bg-white",
        className,
      )}
    >
      <div
        className="marquee-track flex w-max"
        style={{
          ["--marquee-duration" as string]: "45s",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row}
        {row}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r sm:w-32",
          dark ? "from-night" : "from-white",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l sm:w-32",
          dark ? "from-night" : "from-white",
        )}
      />
    </div>
  );
}
