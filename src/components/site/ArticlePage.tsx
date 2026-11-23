import { Check, Clock, Facebook, Link2, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { posts, type Post, type PostBlock } from "@/data/posts";
import { getService } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";
import { formatDateFr } from "@/lib/text";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { Btn } from "@/components/site/Button";
import { CTABand } from "@/components/site/CTABand";
import { PageHero } from "@/components/site/PageHero";
import { PostCard } from "@/components/site/PostCard";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

function ShareButtons({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const url = absoluteUrl(`/fr/conseils/${post.slug}`);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  const btn =
    "flex size-10 items-center justify-center rounded-full border border-navy/10 bg-white text-navy transition-colors hover:border-primary hover:bg-primary hover:text-white";
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => void copy()}
        className={btn}
        aria-label={copied ? "Lien copié" : "Copier le lien"}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Partager sur WhatsApp"
      >
        <WhatsAppIcon className="size-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="size-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        aria-label="Partager sur Facebook"
      >
        <Facebook className="size-4" />
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? "Lien copié dans le presse-papiers" : ""}
      </span>
    </div>
  );
}

export function ArticlePage({ post }: { post: Post }) {
  const [active, setActive] = useState(post.sections[0]?.id ?? "");
  const service = getService(post.service);
  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    post.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post]);

  return (
    <>
      <ScrollProgress />
      <PageHero
        image={post.cover}
        imageAlt={post.coverAlt}
        crumbs={[
          { label: "Accueil", href: "/fr" },
          { label: "Conseils", href: "/fr/conseils" },
          { label: post.category, href: `/fr/conseils/${post.slug}` },
        ]}
        eyebrow={post.category}
        title={post.title}
        description={
          <span className="flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={post.date}>{formatDateFr(post.date)}</time>
            <span className="size-1 rounded-full bg-steel-400" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" /> {post.readingTime} min de lecture
            </span>
            <span className="size-1 rounded-full bg-steel-400" />
            <span>Par l'équipe technique Novare</span>
          </span>
        }
      />

      <div className="container-site grid grid-cols-1 gap-12 py-16 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-24 xl:grid-cols-[17rem_1fr_14rem]">
        <aside className="hidden lg:block">
          <nav aria-label="Sommaire" className="sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel">Sommaire</p>
            <ol className="mt-4 space-y-1 border-l border-navy/10">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={cn(
                      "-ml-px block border-l-2 py-2 pl-4 text-sm leading-snug transition-colors",
                      active === s.id
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent text-muted-foreground hover:text-ink",
                    )}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-steel">
                Partager
              </p>
              <ShareButtons post={post} />
            </div>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[46rem]">
          <p className="text-xl font-medium leading-relaxed text-ink">{post.intro}</p>
          <div className="prose-novare mt-4">
            {post.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </section>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8 lg:hidden">
            <p className="text-sm font-semibold text-ink">Partager cet article</p>
            <ShareButtons post={post} />
          </div>
        </article>

        {service && (
          <aside className="hidden xl:block">
            <div className="sticky top-28 rounded-[1.25rem] bg-night p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-300">
                Besoin d'un expert ?
              </p>
              <p className="mt-3 font-display text-xl font-semibold">{service.name}</p>
              <p className="mt-2 text-sm text-steel-200">{service.short}</p>
              <Btn
                href="/fr/contact-et-devis"
                search={{ metier: service.slug }}
                size="sm"
                className="mt-5 w-full"
              >
                Devis gratuit
              </Btn>
              <AppLink
                href={service.path}
                className="mt-3 block text-center text-sm font-semibold text-primary-300 hover:text-white"
              >
                Découvrir le service
              </AppLink>
            </div>
          </aside>
        )}
      </div>

      <section className="section-y bg-offwhite">
        <div className="container-site">
          <SectionHeading eyebrow="À lire aussi" title="Articles similaires" />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <PostCard post={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <CTABand search={{ metier: post.service }} />
    </>
  );
}
