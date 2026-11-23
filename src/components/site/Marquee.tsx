import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal marquee; pauses on hover / focus; static under reduced motion. */
export function Marquee({
  children,
  duration = 40,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("marquee relative overflow-hidden mask-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
