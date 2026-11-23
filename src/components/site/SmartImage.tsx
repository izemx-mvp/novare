import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string | undefined;
  imgClassName?: string | undefined;
  /** CSS aspect-ratio, e.g. "4/3". Omit when the parent sizes the box. */
  aspect?: string | undefined;
  priority?: boolean;
  position?: string | undefined;
  mask?: "house" | undefined;
  sizes?: string | undefined;
  style?: CSSProperties | undefined;
};

/**
 * Lazy image with an on-brand fallback (navy → primary gradient + blueprint lines),
 * shown before load and kept if the file is missing, so every page always looks finished.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  aspect,
  priority = false,
  position,
  mask,
  sizes,
  style,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // The image may settle before hydration, when React handlers are not attached yet.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-navy-950",
        mask === "house" && "mask-house",
        className,
      )}
      style={{ ...(aspect ? { aspectRatio: aspect } : {}), ...style }}
    >
      <ImageFallback visible={status !== "loaded"} />
      {status !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as const } : {})}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            status === "loaded" ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
      {status === "error" && <span className="sr-only">{alt}</span>}
    </div>
  );
}

function ImageFallback({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ background: "linear-gradient(135deg, #0b1d3a 0%, #134286 55%, #0078be 100%)" }}
    >
      <div className="absolute inset-0 blueprint-grid-light" />
      <svg
        className="absolute inset-0 h-full w-full text-white/25"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="0.8">
          <path d="M70 250V140l90-62 90 62v110" />
          <path d="M70 250h180M100 250v-60h40v60M180 175h40v35h-40z" />
          <path d="M250 200h60v-50h40" strokeDasharray="4 5" />
          <path d="M20 260c40-12 80 12 120 0s80-12 120 0 80 12 120 0" opacity=".6" />
          <path d="M300 60h60v40h-60zM315 60v40M330 60v40M345 60v40" opacity=".7" />
          <circle cx="160" cy="125" r="12" />
          <path d="M160 113v24M148 125h24" />
        </g>
        <g fill="currentColor">
          <circle cx="310" cy="200" r="2.5" />
          <circle cx="350" cy="150" r="2.5" />
          <circle cx="250" cy="200" r="2.5" />
        </g>
      </svg>
      <div className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full glow-radial opacity-60" />
    </div>
  );
}
