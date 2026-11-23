import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/posts";
import { articleJsonLd, breadcrumbJsonLd, pageHead } from "@/lib/seo";
import { ArticlePage } from "@/components/site/ArticlePage";

export const Route = createFileRoute("/fr/conseils/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const path = `/fr/conseils/${post.slug}`;
    return pageHead({
      title: post.title,
      description: post.excerpt,
      path,
      image: post.cover,
      type: "article",
      jsonLd: [
        articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path,
          image: post.cover,
          date: post.date,
        }),
        breadcrumbJsonLd([
          { label: "Accueil", href: "/fr" },
          { label: "Conseils", href: "/fr/conseils" },
          { label: post.title, href: path },
        ]),
      ],
    });
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();
  return <ArticlePage key={post.slug} post={post} />;
}
