import { createFileRoute } from "@tanstack/react-router";
import { requireService } from "@/data/services";
import { tradeHead } from "@/lib/heads";
import { TradePage } from "@/components/site/TradePage";

const service = requireService("froid-cuisine-industrielle");

export const Route = createFileRoute("/fr/froid-cuisine-industrielle")({
  head: () => tradeHead(service),
  component: Page,
});

function Page() {
  return <TradePage service={service} />;
}
