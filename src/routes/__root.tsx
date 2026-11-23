import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { ArrowRight, Phone, RotateCcw } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CONTACT_PATH, site, telHref } from "@/config/site";
import { services } from "@/data/services";
import { localBusinessJsonLd } from "@/lib/seo";
import { AppLink } from "@/components/site/AppLink";
import { BlueprintMethod } from "@/components/site/BlueprintMethod";
import { Btn } from "@/components/site/Button";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { HouseMaskDefs } from "@/components/site/HouseShape";
import { PageTransition } from "@/components/site/PageTransition";
import { StickyMobileCTA } from "@/components/site/StickyMobileCTA";

export function NotFoundComponent() {
  return (
    <section className="surface-night relative overflow-hidden pb-24 pt-36 lg:pt-48">
      <div className="absolute inset-0 -z-10 blueprint-grid-light" />
      <div className="absolute -right-40 top-0 -z-10 size-[600px] rounded-full glow-radial opacity-60" />
      <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow eyebrow-light">Erreur 404</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Ce réseau ne mène <span className="text-gradient-light">nulle part.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel-200">
            La page que vous cherchez n'existe pas ou a été déplacée. Nos techniciens connaissent le
            chemin : repartons de l'un de nos métiers.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <AppLink
                  href={s.path}
                  className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary hover:bg-primary"
                >
                  {s.name}
                </AppLink>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/fr" size="lg" icon={<ArrowRight className="size-5" />}>
              Retour à l'accueil
            </Btn>
            <Btn href={CONTACT_PATH} variant="light" size="lg">
              Nous contacter
            </Btn>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <BlueprintMethod step={1} />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[7rem] font-bold leading-none text-white/10 sm:text-[9rem]">
            404
          </span>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="surface-night flex min-h-screen items-center justify-center px-5">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-white">Cette page n'a pas pu se charger</h1>
        <p className="mt-3 text-steel-200">
          Un incident technique est survenu. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn
            onClick={() => {
              void router.invalidate();
              reset();
            }}
            iconLeft={<RotateCcw className="size-4" />}
          >
            Réessayer
          </Btn>
          <a
            href="/fr"
            className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 font-semibold text-white hover:bg-white/10"
          >
            Accueil
          </a>
          <a
            href={telHref(site.phones.mobile1)}
            className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-semibold text-steel-200 hover:text-white"
          >
            <Phone className="size-4" /> {site.phones.mobile1.display}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own title, description, canonical and og:image via pageHead().
    // Never add og:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: site.seo.defaultTitle },
      { name: "description", content: site.seo.defaultDescription },
      { name: "theme-color", content: "#0b1d3a" },
      { name: "format-detection", content: "telephone=yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/images/logo.png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd()) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const stickyCtaPaths = new Set<string>([
  ...services.map((s) => s.path),
  "/fr/contrats-de-maintenance",
  "/fr/depannage-urgent",
]);

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const showSticky = stickyCtaPaths.has(normalized) || /^\/fr\/secteurs\/[^/]+$/.test(normalized);
  const trade = services.find((s) => s.path === normalized)?.slug;

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <HouseMaskDefs />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-navy focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">
          <PageTransition routeKey={normalized}>
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        {showSticky && <div className="h-16 bg-night-deep lg:hidden" aria-hidden="true" />}
        <FloatingActions raised={showSticky} />
        {showSticky && <StickyMobileCTA trade={trade} />}
      </MotionConfig>
    </QueryClientProvider>
  );
}
