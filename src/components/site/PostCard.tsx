import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/data/posts";
import { formatDateFr } from "@/lib/text";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { trackGlow } from "@/lib/glow";
import { SmartImage } from "@/components/site/SmartImage";

export function PostCard({
  post,
  featured = false,
  className,
}: {
  post: Post;
  featured?: boolean;
  className?: string;
}) {
  return (
    <AppLink
      href={`/fr/conseils/${post.slug}`}
      onPointerMove={trackGlow}
      className={cn(
        "glow-card group flex h-full flex-col overflow-hidden rounded-[1.25rem] border bg-white shadow-[var(--shadow-soft)]",
        featured && "lg:grid lg:grid-cols-[1.15fr_1fr]",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <SmartImage
          src={post.cover}
          alt={post.coverAlt}
          aspect={featured ? "16/10" : "16/10"}
          className={cn(featured && "lg:h-full lg:min-h-[22rem]")}
          imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <p className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
          <time dateTime={post.date}>{formatDateFr(post.date)}</time>
          <span className="size-1 rounded-full bg-steel-300" />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingTime} min de lecture
          </span>
        </p>
        <h3
          className={cn(
            "mt-3 text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-primary",
            featured && "lg:text-3xl",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground",
            featured && "lg:text-base",
          )}
        >
          {post.excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Lire l'article{" "}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </AppLink>
  );
}
