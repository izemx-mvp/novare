import { useState } from "react";
import type { Reference } from "@/data/references";
import { cn } from "@/lib/utils";
import { ReferenceCard } from "@/components/site/ReferenceCard";
import { ReferenceModal } from "@/components/site/ReferenceModal";
import { Stagger, StaggerItem } from "@/components/site/Reveal";

/** Grid of reference cards opening a detail modal. */
export function ReferenceGrid({ items, className }: { items: Reference[]; className?: string }) {
  const [selected, setSelected] = useState<Reference | null>(null);
  return (
    <>
      <Stagger className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((r) => (
          <StaggerItem key={r.slug}>
            <ReferenceCard reference={r} onOpen={setSelected} />
          </StaggerItem>
        ))}
      </Stagger>
      <ReferenceModal reference={selected} onClose={() => setSelected(null)} />
    </>
  );
}
