import { createFileRoute } from "@tanstack/react-router";
import { requireService } from "@/data/services";
import { tradeHead } from "@/lib/heads";
import { TradePage } from "@/components/site/TradePage";

const service = requireService("climatisation");

export const Route = createFileRoute("/fr/climatisation")({
  head: () => tradeHead(service),
  component: Page,
});

function Page() {
  return <TradePage service={service} />;
}
