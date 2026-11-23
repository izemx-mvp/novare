import { ArrowRight, Phone } from "lucide-react";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { BlueprintLines } from "@/components/site/BlueprintLines";
import { Btn } from "@/components/site/Button";
import { HouseFrame } from "@/components/site/HouseShape";
import { Reveal } from "@/components/site/Reveal";

type Props = {
  title?: string;
  text?: string;
  className?: string;
  search?: Record<string, string> | undefined;
};

export function CTABand({
  title = "Un projet, une panne, un contrat de maintenance ?",
  text = "Parlez-nous de votre besoin : nos équipes vous répondent rapidement et chaque devis est gratuit.",
  className,
  search,
}: Props) {
  return (
    <section className={cn("container-site py-16 lg:py-24", className)}>
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 text-white shadow-[var(--shadow-glow)] sm:px-12 lg:px-16 lg:py-20">
          <BlueprintLines
            variant="circuit"
            className="absolute inset-0 -z-10 h-full w-full text-white/25"
          />
          <div className="absolute inset-0 -z-10 blueprint-dots-light opacity-60" />
          <HouseFrame className="absolute -right-10 -top-10 -z-10 hidden h-[130%] w-80 text-white/15 lg:block" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 lg:text-lg">
                {text}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Btn
                href={CONTACT_PATH}
                search={search}
                variant="white"
                size="lg"
                magnetic
                icon={<ArrowRight className="size-5" />}
              >
                Demander un devis
              </Btn>
              <Btn
                href={telHref(site.phones.mobile1)}
                variant="light"
                size="lg"
                iconLeft={<Phone className="size-5" />}
              >
                {site.phones.mobile1.display}
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
