import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, MapPin, X } from "lucide-react";
import { CONTACT_PATH } from "@/config/site";
import type { Reference } from "@/data/references";
import { getService } from "@/data/services";
import { AppLink } from "@/components/site/AppLink";
import { Btn } from "@/components/site/Button";
import { SmartImage } from "@/components/site/SmartImage";

export function ReferenceModal({
  reference,
  onClose,
}: {
  reference: Reference | null;
  onClose: () => void;
}) {
  return (
    <DialogPrimitive.Root open={reference !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-night-deep/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[81] max-h-[92svh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.5rem] bg-white shadow-[var(--shadow-lift)] outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
          {reference && (
            <>
              <div className="relative">
                <SmartImage src={reference.image} alt={reference.imageAlt} aspect="16/9" />
                <div className="absolute inset-0 bg-gradient-to-t from-night-deep/90 via-night-deep/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
                    {reference.sectorLabel}
                  </p>
                  <DialogPrimitive.Title className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                    {reference.name}
                  </DialogPrimitive.Title>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-primary" /> {reference.city}, Maroc
                </p>
                <DialogPrimitive.Description className="mt-4 text-lg font-medium leading-relaxed text-ink">
                  {reference.short}
                </DialogPrimitive.Description>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {reference.long.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                  Métiers mobilisés
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {reference.trades.map((slug) => {
                    const service = getService(slug);
                    return service ? (
                      <li key={slug}>
                        <AppLink
                          href={service.path}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-50 px-3.5 py-1.5 text-sm font-semibold text-primary-700 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        >
                          {service.name} <ArrowRight className="size-3.5" />
                        </AppLink>
                      </li>
                    ) : null;
                  })}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3 border-t pt-6">
                  <Btn
                    href={CONTACT_PATH}
                    onClick={onClose}
                    icon={<ArrowRight className="size-4" />}
                  >
                    Un projet similaire ?
                  </Btn>
                </div>
              </div>
              <DialogPrimitive.Close
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-md transition-colors hover:bg-primary hover:text-white"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </DialogPrimitive.Close>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
