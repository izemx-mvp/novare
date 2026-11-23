import { FileText, Phone } from "lucide-react";
import { CONTACT_PATH, defaultWhatsappMessage, site, telHref, whatsappHref } from "@/config/site";
import { AppLink } from "@/components/site/AppLink";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

/** Bottom action bar on mobile for high-intent pages. */
export function StickyMobileCTA({ trade }: { trade?: string | undefined }) {
  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.75rem] font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-navy/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_-16px_rgb(11_29_58/0.35)] backdrop-blur lg:hidden">
      <div className="flex">
        <a href={telHref(site.phones.mobile1)} className={`${item} text-navy`}>
          <Phone className="size-5 text-primary" /> Appeler
        </a>
        <a
          href={whatsappHref(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} border-x border-navy/10 text-navy`}
        >
          <WhatsAppIcon className="size-5 text-primary" /> WhatsApp
        </a>
        <AppLink
          href={CONTACT_PATH}
          search={trade ? { metier: trade } : undefined}
          className={`${item} m-1.5 rounded-xl bg-brand-gradient text-white`}
        >
          <FileText className="size-5" /> Devis
        </AppLink>
      </div>
    </div>
  );
}
