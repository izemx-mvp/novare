import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";
import { maintenanceBenefits } from "@/data/maintenance";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { HouseBadge, HouseFrame } from "@/components/site/HouseShape";
import { getIcon } from "@/components/site/icons";
import { ImageReveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { Accent, SectionHeading } from "@/components/site/SectionHeading";
import { SmartImage } from "@/components/site/SmartImage";

export function MaintenanceTeaser({ className }: { className?: string }) {
  return (
    <section className={cn("section-y overflow-hidden bg-offwhite", className)}>
      <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg">
          <HouseFrame className="absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] text-primary/30" />
          <ImageReveal>
            <SmartImage
              src={images.maintenanceHero}
              alt="Technicien Novare réalisant une visite de maintenance préventive"
              aspect="4/5"
              mask="house"
            />
          </ImageReveal>
          <div className="absolute -bottom-6 -right-2 rounded-2xl border bg-white p-5 shadow-[var(--shadow-lift)] sm:-right-8">
            <p className="font-display text-3xl font-semibold text-ink">3 formules</p>
            <p className="text-sm text-muted-foreground">Essentiel · Confort · Premium</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Contrats de maintenance"
            title={
              <>
                Anticipez les pannes, <Accent>maîtrisez vos coûts.</Accent>
              </>
            }
            body="Un contrat Novare, c'est un plan de maintenance construit pour vos équipements, des visites préventives planifiées et une intervention prioritaire en cas de panne."
          />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {maintenanceBenefits.map((b) => {
              const Icon = getIcon(b.icon);
              return (
                <StaggerItem key={b.title} className="flex gap-4 rounded-2xl border bg-white p-5">
                  <HouseBadge tone="light" className="size-10">
                    <Icon className="size-4" />
                  </HouseBadge>
                  <div>
                    <h3 className="font-semibold text-ink">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn
              href="/fr/contrats-de-maintenance"
              magnetic
              icon={<ArrowRight className="size-4" />}
            >
              Découvrir les contrats
            </Btn>
            <Btn href="/fr/contact-et-devis" search={{ type: "contrat" }} variant="outline">
              Recevoir une proposition
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
