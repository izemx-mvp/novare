import type { ElementType, ReactNode } from "react";
import { trackGlow } from "@/lib/glow";
import { cn } from "@/lib/utils";

/** Card surface whose inner glow follows the cursor. */
export function GlowCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string | undefined;
  as?: ElementType;
}) {
  return (
    <Tag onPointerMove={trackGlow} className={cn("glow-card rounded-[1.25rem] border", className)}>
      {children}
    </Tag>
  );
}
