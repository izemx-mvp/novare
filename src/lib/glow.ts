import type { PointerEvent } from "react";

/** Pointer handler feeding --mx / --my to `.glow-card` elements (cursor-following glow). */
export function trackGlow(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
