import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { site, telHref } from "@/config/site";
import { allFaqs, faqCategories } from "@/data/faqs";
import { faqJsonLd } from "@/lib/seo";
import { simpleHead } from "@/lib/heads";
import { normalize } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/fr/faq")({
  head: () =>
    simpleHead({
      title: "FAQ : questions fréquentes",
      description:
        "Toutes les réponses sur les services de Novare Solutions Techniques : devis, urgences, contrats de maintenance, climatisation, plomberie, froid et électricité.",
      path: "/fr/faq",
      label: "FAQ",
      extra: [faqJsonLd(allFaqs)],
    }),
  component: FaqPage,
});

function FaqPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query);
    const pool =
      category === "all" ? allFaqs : (faqCategories.find((c) => c.id === category)?.faqs ?? []);
    const unique = Array.from(new Map(pool.map((f) => [f.question, f])).values());
    return q ? unique.filter((f) => normalize(`${f.question} ${f.answer}`).includes(q)) : unique;
  }, [category, query]);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "FAQ", href: "/fr/faq" },
        ]}
        eyebrow="FAQ"
        title={
          <>
            Vos questions, <span className="text-gradient-light">nos réponses.</span>
          </>
        }
        description="Devis, urgences, contrats, métiers techniques : retrouvez les réponses aux questions que nos clients nous posent le plus souvent."
        lines="circuit"
      >
        <label className="relative block w-full max-w-lg">
          <span className="sr-only">Rechercher une question</span>
          <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-steel-300" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : devis, chambre froide, disjoncteur…"
            className="h-14 w-full rounded-full border border-white/15 bg-white/10 pl-14 pr-5 text-white outline-none backdrop-blur-sm transition-colors placeholder:text-steel-300 focus:border-primary-400 focus:bg-white/15"
          />
        </label>
      </PageHero>

      <section className="section-y bg-offwhite">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
          <Reveal className="min-w-0">
            <div
              role="tablist"
              aria-label="Catégories de questions"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
            >
              {[{ id: "all", label: "Toutes les questions" }, ...faqCategories].map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-xl",
                    category === cat.id
                      ? "bg-brand-gradient text-white"
                      : "bg-white text-navy hover:text-primary",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="min-w-0">
            <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
              {results.length} question{results.length > 1 ? "s" : ""}
            </p>
            {results.length > 0 ? (
              <FAQAccordion key={`${category}-${query}`} faqs={results} defaultOpen={false} />
            ) : (
              <div className="rounded-[1.25rem] border bg-white p-10 text-center">
                <p className="font-display text-xl font-semibold text-ink">
                  Aucune réponse trouvée
                </p>
                <p className="mt-2 text-muted-foreground">
                  Posez-nous directement votre question, nous vous répondons rapidement.
                </p>
                <Btn href={telHref(site.phones.mobile1)} className="mt-6 whitespace-normal text-center">
                  Appeler le {site.phones.mobile1.display}
                </Btn>
              </div>
            )}
          </div>
        </div>
      </section>
      <CTABand title="Vous n'avez pas trouvé votre réponse ?" />
    </>
  );
}
