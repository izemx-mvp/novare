import type { ReactNode } from "react";
import { PageHero } from "@/components/site/PageHero";

export type LegalSection = { title: string; content: ReactNode };

/** Clean long-form layout for legal pages. */
export function LegalPage({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: title, href: path },
        ]}
        eyebrow="Informations légales"
        title={title}
        description={intro}
        lines="grid"
      />
      <section className="section-y">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="Sommaire" className="hidden lg:block">
            <ol className="sticky top-28 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#section-${i + 1}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="prose-novare max-w-3xl">
            <p className="text-sm text-muted-foreground">Dernière mise à jour : {updated}</p>
            {sections.map((s, i) => (
              <section key={s.title} aria-labelledby={`section-${i + 1}`}>
                <h2 id={`section-${i + 1}`}>
                  {i + 1}. {s.title}
                </h2>
                {s.content}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
