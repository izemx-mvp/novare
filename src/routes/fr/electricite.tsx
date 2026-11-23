import { createFileRoute } from "@tanstack/react-router";
import { requireService } from "@/data/services";
import { tradeHead } from "@/lib/heads";
import { TradePage } from "@/components/site/TradePage";

const service = requireService("electricite");

export const Route = createFileRoute("/fr/electricite")({
  head: () => tradeHead(service),
  component: Page,
});

function Page() {
  return <TradePage service={service} />;
}
