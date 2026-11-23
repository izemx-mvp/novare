import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { postCategories, sortedPosts } from "@/data/posts";
import { simpleHead } from "@/lib/heads";
import { normalize } from "@/lib/text";
import { cn } from "@/lib/utils";
import { CTABand } from "@/components/site/CTABand";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/fr/conseils/")({
  head: () =>
    simpleHead({
      title: "Conseils d'experts : climatisation, froid, maintenance, électricité",
      description:
        "Conseils techniques des experts Novare : entretien de la climatisation, chambres froides, contrats de maintenance, mise en conformité électrique, eau chaude sanitaire.",
      path: "/fr/conseils",
      label: "Conseils",
    }),
  component: BlogPage,
});

function BlogPage() {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return sortedPosts.filter(
      (p) =>
        (category === "Tous" || p.category === category) &&
        (!q || normalize(`${p.title} ${p.excerpt} ${p.category}`).includes(q)),
    );
  }, [category, query]);

  const showFeatured = category === "Tous" && !query;
  const [featured, ...others] = sortedPosts;
  const list = showFeatured ? others : filtered;

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Conseils", href: "/fr/conseils" },
        ]}
        eyebrow="Conseils"
        title={
          <>
            Les conseils de <span className="text-gradient-light">nos experts.</span>
          </>
        }
        description="Entretien, choix d'équipements, réglementation, économies d'énergie : des articles concrets rédigés par nos techniciens pour mieux gérer vos installations."
        lines="airflow"
      />

      <section className="section-y">
        <div className="container-site">
          <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filtrer par catégorie"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0"
            >
              {postCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  aria-pressed={category === cat}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    category === cat
                      ? "border-transparent bg-brand-gradient text-white"
                      : "border-navy/10 text-navy hover:border-primary hover:text-primary",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:w-80">
              <span className="sr-only">Rechercher un article</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-steel" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article…"
                className="h-12 w-full rounded-full border bg-white pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-steel-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
            </label>
          </Reveal>

          {showFeatured && featured && (
            <Reveal className="mt-12">
              <PostCard post={featured} featured />
            </Reveal>
          )}

          <motion.div layout className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((post) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <p className="mt-10 rounded-2xl border bg-offwhite p-10 text-center text-muted-foreground">
              Aucun article ne correspond à votre recherche. Essayez un autre mot-clé ou une autre
              catégorie.
            </p>
          )}
        </div>
      </section>
      <CTABand />
    </>
  );
}
