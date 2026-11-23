import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CONTACT_PATH, nav, site, telHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { Btn } from "@/components/site/Button";
import { Logo } from "@/components/site/Logo";
import { ExpertisesMenu, NovareMenu } from "@/components/site/MegaMenu";
import { MobileMenu } from "@/components/site/MobileMenu";
import { TopBar } from "@/components/site/TopBar";

type MenuId = "novare" | "expertises" | null;

const EXPERTISE_PATHS = [
  "/fr/nos-metiers",
  "/fr/climatisation",
  "/fr/plomberie-et-chauffage",
  "/fr/froid-cuisine-industrielle",
  "/fr/maintenance-multi-technique",
  "/fr/electricite",
  "/fr/depannage-urgent",
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);

  // Reading progress line inside the floating bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 320);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const open = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") setMenu(null);
  };

  // "Contact & Devis" is already the main CTA button: keep it out of the desktop nav
  const desktopLinks = nav.main.filter((item) => item.href !== CONTACT_PATH);

  const solid = scrolled || menu !== null;
  const isHidden = hidden && menu === null && !mobileOpen;
  const isExpertise = pathname.startsWith("/fr/secteurs") || EXPERTISE_PATHS.includes(pathname);
  const isNovare = nav.novare.some((n) => n.href === pathname);

  const linkClass = cn(
    "relative z-0 inline-flex h-10 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.875rem] font-medium transition-colors duration-200 2xl:px-4",
    solid ? "text-ink/80 hover:text-ink" : "text-white/80 hover:text-white",
  );
  // Active = brand color + small gradient dot under the label
  const activeClass = cn(
    "after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-brand-gradient",
    solid ? "!text-primary" : "!text-white",
  );

  // Sliding hover pill shared by every nav item
  const HoverPill = ({ id }: { id: string }) =>
    hovered === id ? (
      <motion.span
        layoutId="nav-hover-pill"
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 rounded-full",
          solid ? "bg-navy/[0.06]" : "bg-white/10 ring-1 ring-inset ring-white/10",
        )}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
    ) : null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isHidden ? "-translate-y-[calc(100%+1rem)]" : scrolled ? "lg:-translate-y-10" : "translate-y-0",
        )}
        onKeyDown={onKey}
      >
        <TopBar />

        {/* Outer wrapper: adds breathing room when the bar turns into a floating capsule */}
        <div
          className={cn(
            "transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            solid ? "px-3 pt-3 sm:px-5 lg:pt-4" : "px-0 pt-0",
          )}
        >
          <div
            className={cn(
              "relative mx-auto transition-[max-width,border-radius,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              solid
                ? "glass max-w-[1320px] rounded-[1.25rem] border border-navy/10 shadow-[0_18px_50px_-24px_rgb(11_29_58/0.45),inset_0_1px_0_rgb(255_255_255/0.6)] lg:rounded-full"
                : "max-w-full rounded-none border border-transparent",
            )}
          >
            {/* Top hairline glow when floating */}
            {solid && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              />
            )}

            <div
              className={cn(
                "flex items-center justify-between gap-4 transition-[height,padding] duration-500 2xl:gap-8",
                solid
                  ? "h-16 pl-4 pr-2 sm:pl-5 lg:h-[4.25rem] lg:pl-6 lg:pr-2.5"
                  : "container-site h-[4.5rem] lg:h-20",
              )}
            >
              <div className="shrink-0">
                <Logo onDark={!solid} />
              </div>

              <nav aria-label="Navigation principale" className="hidden flex-1 justify-center xl:flex">
                <ul className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
                  <li onMouseEnter={() => setHovered("home")}>
                    <AppLink href="/fr" exact className={linkClass} activeClassName={activeClass}>
                      <HoverPill id="home" />
                      Accueil
                    </AppLink>
                  </li>

                  {(["novare", "expertises"] as const).map((id) => (
                    <li
                      key={id}
                      className="relative"
                      onMouseEnter={() => {
                        setHovered(id);
                        open(id);
                      }}
                      onMouseLeave={scheduleClose}
                    >
                      <button
                        type="button"
                        className={cn(
                          linkClass,
                          (id === "novare" ? isNovare : isExpertise) && activeClass,
                        )}
                        aria-expanded={menu === id}
                        aria-controls={`menu-${id}`}
                        onClick={() => setMenu(menu === id ? null : id)}
                      >
                        <HoverPill id={id} />
                        {id === "novare" ? "Novare" : "Expertises"}
                        <ChevronDown
                          className={cn(
                            "size-3.5 opacity-70 transition-transform duration-300",
                            menu === id && "rotate-180 opacity-100",
                          )}
                        />
                      </button>
                      {id === "novare" && (
                        <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                          <AnimatePresence>
                            {menu === "novare" && (
                              <NovareMenu id="menu-novare" onNavigate={() => setMenu(null)} />
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </li>
                  ))}

                  {desktopLinks.map((item) => (
                    <li key={item.href} onMouseEnter={() => setHovered(item.href)}>
                      <AppLink href={item.href} className={linkClass} activeClassName={activeClass}>
                        <HoverPill id={item.href} />
                        {item.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex shrink-0 items-center gap-2">
                {/* Urgence: live pulse dot (icon-only on xl, full label from 2xl) */}
                <a
                  href={telHref(site.phones.mobile1)}
                  className={cn(
                    "group hidden h-10 shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-all duration-300 md:inline-flex xl:px-3 2xl:px-4",
                    solid
                      ? "border-navy/15 bg-white/60 text-navy hover:border-primary hover:text-primary"
                      : "border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10",
                  )}
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-primary-400 opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary-400" />
                  </span>
                  <Phone className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
                  <span className="xl:sr-only 2xl:not-sr-only">Urgence</span>
                </a>

                <Btn
                  href={CONTACT_PATH}
                  size="sm"
                  magnetic
                  className="hidden shrink-0 whitespace-nowrap sm:inline-flex"
                  icon={<ArrowRight className="size-4" />}
                >
                  Demander un devis
                </Btn>

                <button
                  type="button"
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 xl:hidden",
                    solid
                      ? "border-navy bg-navy text-white hover:bg-primary hover:border-primary"
                      : "border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15",
                  )}
                  onClick={() => setMobileOpen(true)}
                  aria-label="Ouvrir le menu"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="size-5" />
                </button>
              </div>
            </div>

            {/* Scroll progress line (only when floating) */}
            {scrolled && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] overflow-hidden rounded-full lg:inset-x-10"
              >
                <motion.span
                  style={{ scaleX: progress }}
                  className="block h-full origin-left rounded-full bg-brand-gradient"
                />
              </span>
            )}

            {/* Mega menu (full bar width) */}
            <div
              className="absolute inset-x-0 top-full hidden pt-3 xl:block"
              onMouseEnter={() => menu === "expertises" && open("expertises")}
              onMouseLeave={scheduleClose}
            >
              <div className={cn(!solid && "container-site")}>
                <AnimatePresence>
                  {menu === "expertises" && (
                    <ExpertisesMenu id="menu-expertises" onNavigate={() => setMenu(null)} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}