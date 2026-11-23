import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CONTACT_PATH,
  defaultWhatsappMessage,
  nav,
  site,
  telHref,
  whatsappHref,
} from "@/config/site";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { Btn } from "@/components/site/Button";
import { getIcon } from "@/components/site/icons";
import { Logo } from "@/components/site/Logo";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

function Section({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        className="flex w-full items-center justify-between py-5 text-left font-display text-2xl font-semibold"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-5 text-primary-300 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const subLink =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9375rem] text-steel-100 transition-colors hover:bg-white/5 hover:text-white";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="surface-night fixed inset-0 z-[70] flex flex-col overflow-y-auto"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 -z-10 blueprint-grid-light" />
          <div className="container-site flex h-[4.5rem] shrink-0 items-center justify-between">
            <Logo onDark />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Fermer le menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <motion.nav
            aria-label="Navigation mobile"
            className="container-site flex-1 pb-8 pt-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
            }}
          >
            {[
              <AppLink
                key="home"
                href="/fr"
                onClick={onClose}
                className="block border-b border-white/10 py-5 font-display text-2xl font-semibold"
              >
                Accueil
              </AppLink>,
              <Section key="novare" title="Novare">
                <ul>
                  {nav.novare.map((item) => (
                    <li key={item.href}>
                      <AppLink href={item.href} onClick={onClose} className={subLink}>
                        {item.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </Section>,
              <Section key="expertises" title="Expertises">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
                  Nos métiers
                </p>
                <ul>
                  {services.map((s) => {
                    const Icon = getIcon(s.icon);
                    return (
                      <li key={s.slug}>
                        <AppLink href={s.path} onClick={onClose} className={subLink}>
                          <Icon className="size-4 text-primary-300" /> {s.name}
                        </AppLink>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-4 px-3 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
                  Secteurs
                </p>
                <ul>
                  {sectors.map((s) => (
                    <li key={s.slug}>
                      <AppLink href={s.path} onClick={onClose} className={subLink}>
                        {s.name}
                      </AppLink>
                    </li>
                  ))}
                  <li>
                    <AppLink
                      href="/fr/depannage-urgent"
                      onClick={onClose}
                      className={cn(subLink, "font-semibold text-white")}
                    >
                      Dépannage urgent <ArrowRight className="size-4" />
                    </AppLink>
                  </li>
                </ul>
              </Section>,
              ...nav.main.map((item) => (
                <AppLink
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="block border-b border-white/10 py-5 font-display text-2xl font-semibold"
                >
                  {item.label}
                </AppLink>
              )),
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              >
                {child}
              </motion.div>
            ))}
          </motion.nav>
          <div className="container-site shrink-0 space-y-3 border-t border-white/10 bg-night-deep/60 py-6">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={telHref(site.phones.mobile1)}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white/5 px-3 py-4 text-center ring-1 ring-white/10"
              >
                <Phone className="size-5 text-primary-300" />
                <span className="text-sm font-semibold">{site.phones.mobile1.display}</span>
              </a>
              <a
                href={telHref(site.phones.mobile2)}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white/5 px-3 py-4 text-center ring-1 ring-white/10"
              >
                <Phone className="size-5 text-primary-300" />
                <span className="text-sm font-semibold">{site.phones.mobile2.display}</span>
              </a>
            </div>
            <Btn
              href={whatsappHref(defaultWhatsappMessage)}
              variant="light"
              size="lg"
              className="w-full"
              iconLeft={<WhatsAppIcon className="size-5" />}
            >
              Écrire sur WhatsApp
            </Btn>
            <Btn
              href={CONTACT_PATH}
              size="lg"
              className="w-full"
              onClick={onClose}
              icon={<ArrowRight className="size-5" />}
            >
              Demander un devis
            </Btn>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
