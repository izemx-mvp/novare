import { useEffect, useRef, useState } from "react";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";

/** Fallback brand mark: house silhouette + wordmark (used if logo.png is missing). */
function LogoFallback() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
        <path
          d="M7 46 C4.2 46 2 43.8 2 41 L2 20 C2 18.2 2.9 16.6 4.4 15.6 L21.2 3.9 C22.9 2.7 25.1 2.7 26.8 3.9 L43.6 15.6 C45.1 16.6 46 18.2 46 20 L46 41 C46 43.8 43.8 46 41 46 Z"
          fill="url(#house-badge-gradient)"
        />
        <path
          d="M15 36V22l18 14V22"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-bold tracking-tight text-navy">
          NOVARE
        </span>
        <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-steel">
          Solutions techniques
        </span>
      </span>
    </span>
  );
}

export function Logo({
  onDark = false,
  className,
  height = 44,
}: {
  onDark?: boolean;
  className?: string;
  height?: number;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <AppLink
      href="/fr"
      aria-label={`${site.name}, retour à l'accueil`}
      className={cn(
        "inline-flex shrink-0 items-center transition-[background-color,box-shadow,padding] duration-300",
        onDark && "rounded-full bg-white px-3.5 py-1.5 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.5)]",
        className,
      )}
    >
      {failed ? (
        <LogoFallback />
      ) : (
        <img
          ref={ref}
          src={images.logo}
          alt={site.name}
          style={{ height }}
          className="w-auto"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </AppLink>
  );
}
