import { createFileRoute, notFound } from "@tanstack/react-router";
import { getSector } from "@/data/sectors";
import { sectorHead } from "@/lib/heads";
import { SectorPage } from "@/components/site/SectorPage";

export const Route = createFileRoute("/fr/secteurs/$slug")({
  loader: ({ params }) => {
    const sector = getSector(params.slug);
    if (!sector) throw notFound();
    return { sector };
  },
  head: ({ loaderData }) => (loaderData ? sectorHead(loaderData.sector) : {}),
  component: Page,
});

function Page() {
  const { sector } = Route.useLoaderData();
  return <SectorPage key={sector.slug} sector={sector} />;
}
