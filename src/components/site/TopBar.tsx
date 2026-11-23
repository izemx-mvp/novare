import { Clock, Mail, Phone, Siren } from "lucide-react";
import { site, telHref } from "@/config/site";

export function TopBar() {
  return (
    <div className="hidden h-10 border-b border-white/10 bg-night-deep text-[0.8125rem] text-steel-200 lg:block">
      <div className="container-site flex h-full items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href={telHref(site.phones.mobile1)}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Phone className="size-3.5 text-primary-400" /> {site.phones.mobile1.display}
          </a>
          <a
            href={telHref(site.phones.mobile2)}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            {site.phones.mobile2.display}
          </a>
          <a
            href={telHref(site.phones.landline)}
            className="hidden items-center gap-2 transition-colors hover:text-white xl:inline-flex"
          >
            Fixe {site.phones.landline.display}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Mail className="size-3.5 text-primary-400" /> {site.email}
          </a>
        </div>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2">
            <Clock className="size-3.5 text-primary-400" /> {site.hours.regular}
          </span>
          <a
            href={telHref(site.phones.mobile1)}
            className="inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-primary-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary-400" />
            </span>
            <Siren className="size-3.5" /> {site.hours.emergency}
          </a>
        </div>
      </div>
    </div>
  );
}
