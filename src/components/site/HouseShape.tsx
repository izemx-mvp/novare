import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// The logo's silhouette: a rounded rectangle with a pitched top.
export const HOUSE_PATH_BBOX =
  "M0.08,1 C0.035,1 0,0.965 0,0.92 L0,0.4 C0,0.36 0.02,0.33 0.05,0.31 L0.455,0.03 C0.482,0.012 0.518,0.012 0.545,0.03 L0.95,0.31 C0.98,0.33 1,0.36 1,0.4 L1,0.92 C1,0.965 0.965,1 0.92,1 Z";

/** Hidden SVG defs (mounted once in the root) exposing `clip-path: url(#house-mask)`. */
export function HouseMaskDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="house-mask" clipPathUnits="objectBoundingBox">
          <path d={HOUSE_PATH_BBOX} />
        </clipPath>
        <linearGradient id="house-badge-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5a87a6" />
          <stop offset="50%" stopColor="#0078be" />
          <stop offset="100%" stopColor="#134286" />
        </linearGradient>
        <linearGradient id="brand-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#5a87a6" />
          <stop offset="50%" stopColor="#0078be" />
          <stop offset="100%" stopColor="#134286" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Outline ornament in the house shape. */
export function HouseFrame({
  className,
  strokeWidth = 1,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 99 C3.5 99 1 96.5 1 92 L1 40 C1 36 3 33 6 31 L45.5 3.5 C48.2 1.6 51.8 1.6 54.5 3.5 L94 31 C97 33 99 36 99 40 L99 92 C99 96.5 96.5 99 92 99 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Small house-shaped badge holding an icon. */
export function HouseBadge({
  children,
  className,
  tone = "gradient",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gradient" | "light" | "dark";
}) {
  const fill =
    tone === "gradient"
      ? "url(#house-badge-gradient)"
      : tone === "light"
        ? "#ebf6fd"
        : "rgb(255 255 255 / 0.08)";
  return (
    <span
      className={cn("relative inline-flex size-12 shrink-0 items-center justify-center", className)}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M7 46 C4.2 46 2 43.8 2 41 L2 20 C2 18.2 2.9 16.6 4.4 15.6 L21.2 3.9 C22.9 2.7 25.1 2.7 26.8 3.9 L43.6 15.6 C45.1 16.6 46 18.2 46 20 L46 41 C46 43.8 43.8 46 41 46 Z"
          fill={fill}
          stroke={tone === "dark" ? "rgb(255 255 255 / 0.14)" : "none"}
        />
      </svg>
      <span
        className={cn(
          "relative mt-1.5 flex items-center",
          tone === "gradient"
            ? "text-white"
            : tone === "light"
              ? "text-primary"
              : "text-primary-300",
        )}
      >
        {children}
      </span>
    </span>
  );
}
