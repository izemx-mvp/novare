import { createFileRoute } from "@tanstack/react-router";
import { requireService } from "@/data/services";
import { tradeHead } from "@/lib/heads";
import { TradePage } from "@/components/site/TradePage";

const service = requireService("maintenance-multi-technique");

export const Route = createFileRoute("/fr/maintenance-multi-technique")({
  head: () => tradeHead(service),
  component: Page,
});

function Page() {
  return <TradePage service={service} />;
}
