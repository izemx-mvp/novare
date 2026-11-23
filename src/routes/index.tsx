import { createFileRoute, redirect } from "@tanstack/react-router";

// The French site lives under /fr (legacy URLs are preserved for SEO).
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/fr", statusCode: 301 });
  },
});
