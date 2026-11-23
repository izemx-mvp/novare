import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { defaultWhatsappMessage, whatsappHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const Chatbot = lazy(() =>
  import("@/components/site/Chatbot").then((m) => ({ default: m.Chatbot })),
);

function Tooltip({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-night px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
      {label}
    </span>
  );
}

/** WhatsApp + chatbot launcher, stacked bottom-right. */
export function FloatingActions({ raised = false }: { raised?: boolean }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Desktop: appear after a short delay. Mobile/tablet: wait until the user has scrolled
  // past half the first screen, so the buttons never cover the hero CTAs.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    if (desktop) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    setMounted(true);
    setChatOpen((o) => !o);
  };

  return (
    <>
      <AnimatePresence>
        {(visible || chatOpen) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "fixed right-4 z-[60] flex flex-col items-end gap-3 sm:right-6",
              raised ? "bottom-24 lg:bottom-6" : "bottom-5 sm:bottom-6",
              chatOpen && "max-sm:hidden",
            )}
          >
            <a
              href={whatsappHref(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex size-12 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-[0_12px_30px_-10px_rgb(11_29_58/0.45)] transition-transform hover:-translate-y-0.5 hover:text-primary"
              aria-label="Écrire à Novare sur WhatsApp"
            >
              <WhatsAppIcon className="size-6" />
              <Tooltip label="WhatsApp" />
            </a>
            <button
              type="button"
              onClick={toggle}
              className="group relative isolate flex size-[3.75rem] items-center justify-center text-white transition-transform hover:-translate-y-0.5"
              aria-label={chatOpen ? "Fermer l'assistant Novare" : "Ouvrir l'assistant Novare"}
              aria-expanded={chatOpen}
            >
              {!chatOpen && (
                <span
                  className="pulse-ring absolute inset-1 -z-10 rounded-full bg-primary/50"
                  aria-hidden="true"
                />
              )}
              <svg
                viewBox="0 0 60 60"
                className="absolute inset-0 h-full w-full drop-shadow-[0_12px_24px_rgb(0_120_190/0.5)]"
                aria-hidden="true"
              >
                <path
                  d="M10 57 C6 57 3 54 3 50 L3 25 C3 22.6 4.2 20.4 6.2 19 L26 5.2 C28.4 3.6 31.6 3.6 34 5.2 L53.8 19 C55.8 20.4 57 22.6 57 25 L57 50 C57 54 54 57 50 57 Z"
                  fill="url(#house-badge-gradient)"
                />
              </svg>
              <span className="relative mt-2">
                {chatOpen ? (
                  <X className="size-6" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z" />
                    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.6" />
                  </svg>
                )}
              </span>
              <Tooltip label={chatOpen ? "Fermer" : "Une question ? Discutons"} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {mounted && (
        <Suspense fallback={null}>
          <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
