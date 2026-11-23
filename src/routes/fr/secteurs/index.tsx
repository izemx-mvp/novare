import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { sectors } from "@/data/sectors";
import { simpleHead } from "@/lib/heads";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { PageHero } from "@/components/site/PageHero";
import { ReferencesMarquee } from "@/components/site/ReferencesMarquee";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { SectorCard } from "@/components/site/SectorCard";

export const Route = createFileRoute("/fr/secteurs/")({
  head: () =>
    simpleHead({
      title: "Secteurs d'activité : hôtellerie, CHR, résidentiel, tertiaire, industrie",
      description:
        "Novare accompagne les hôtels, restaurants, résidences, bureaux et sites industriels de Marrakech avec des solutions techniques adaptées à chaque secteur.",
      path: "/fr/secteurs",
      label: "Secteurs",
    }),
  component: SectorsHub,
});

function SectorsHub() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Secteurs", href: "/fr/secteurs" },
        ]}
        eyebrow="Secteurs"
        title={
          <>
            Chaque activité a ses <span className="text-gradient-light">exigences.</span>
          </>
        }
        description="Un palace, une cuisine de restaurant, une villa ou un site de production n'attendent pas la même chose de leurs équipements. Nos solutions s'adaptent à votre réalité."
        lines="circuit"
      >
        <Btn
          href="/fr/contact-et-devis"
          size="lg"
          magnetic
          icon={<ArrowRight className="size-5" />}
        >
          Demander un devis
        </Btn>
      </PageHero>
      <section className="section-y">
        <div className="container-site">
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {sectors.map((sector, i) => (
              <StaggerItem
                key={sector.slug}
                className={cn("h-full min-w-0", i < 2 ? "lg:col-span-3" : "lg:col-span-2", i === 4 && "sm:col-span-2 lg:col-span-2")}
              >
                <SectorCard sector={sector} tall={i < 2} className="h-full" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <ReferencesMarquee />
      <CTABand />
    </>
  );
}
