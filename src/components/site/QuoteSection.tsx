import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { site, telHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  defaultTrade?: string | undefined;
  defaultType?: string | undefined;
  className?: string;
};

/** Heading + reassurance on the left, multi-step QuoteForm on the right. */
export function QuoteSection({
  id = "devis",
  eyebrow = "Devis gratuit",
  title,
  body,
  defaultTrade,
  defaultType,
  className,
}: Props) {
  return (
    <section id={id} className={cn("section-y scroll-mt-24 bg-offwhite", className)}>
      <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-5">
              <li className="flex gap-4">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-[0.9375rem] text-ink/80">
                  Devis gratuit et sans engagement, établi sur mesure.
                </span>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-[0.9375rem] text-ink/80">
                  {site.hours.regular} · {site.hours.emergency}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-[0.9375rem] text-ink/80">
                  <a
                    href={telHref(site.phones.mobile1)}
                    className="font-semibold text-navy hover:text-primary"
                  >
                    {site.phones.mobile1.display}
                  </a>{" "}
                  ·{" "}
                  <a
                    href={telHref(site.phones.mobile2)}
                    className="font-semibold text-navy hover:text-primary"
                  >
                    {site.phones.mobile2.display}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.9375rem] font-semibold text-navy hover:text-primary"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <QuoteForm
            key={`${defaultTrade ?? ""}-${defaultType ?? ""}`}
            defaultTrade={defaultTrade}
            defaultType={defaultType}
          />
        </Reveal>
      </div>
    </section>
  );
}
