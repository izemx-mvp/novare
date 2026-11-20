import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Droplet,
  ExternalLink,
  Fan,
  Menu,
  Phone,
  Send,
  Settings2,
  Snowflake,
  Wind,
  X,
  Zap,
} from "lucide-react";
import logo from "@/assets/novare-logo.png.asset.json";
import { site, phoneHref, whatsappHref } from "@/config/site";
import { faqs, methodSteps, metrics, trades, type Trade } from "@/data/content";
import { Button } from "@/components/ui/button";

const iconMap = {
  wind: Wind,
  droplet: Droplet,
  snowflake: Snowflake,
  settings: Settings2,
  zap: Zap,
};

const linkButton = "rounded-none px-5 py-6 font-semibold";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/fr" className="flex shrink-0 items-center gap-2" aria-label="Novare, accueil">
      <img src={logo.url} alt="Novare Solutions Techniques" className={compact ? "h-11 w-12 object-contain" : "h-14 w-16 object-contain"} />
      {!compact && (
        <span className="hidden border-l border-border pl-3 text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-foreground sm:block">
          Solutions<br />techniques
        </span>
      )}
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="hidden bg-secondary text-secondary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="tracking-wide">Marrakech · Installation · Maintenance · Optimisation</span>
          <div className="flex items-center gap-6">
            <a href={phoneHref(site.phones[0])} className="inline-flex items-center gap-2"><Phone size={13} /> {site.phones[0]}</a>
            <a href={`mailto:${site.email}`} className="transition-opacity hover:opacity-75">{site.email}</a>
          </div>
        </div>
      </div>
      <header className="glass-header sticky top-0 z-40 border-b border-border/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6">
          <BrandMark />
          <nav aria-label="Navigation principale" className="hidden items-center gap-5 lg:flex">
            <Link to="/fr" activeOptions={{ exact: true }} className="nav-link">Accueil</Link>
            <details className="nav-group">
              <summary className="nav-link">Novare <ChevronDown size={13} /></summary>
              <div className="nav-panel">
                <Link to="/fr/qui-sommes-nous">Qui sommes-nous</Link>
                <Link to="/fr/notre-methode">Notre méthode</Link>
                <Link to="/fr/carrieres">Carrières</Link>
              </div>
            </details>
            <details className="nav-group">
              <summary className="nav-link">Expertises <ChevronDown size={13} /></summary>
              <div className="nav-panel nav-panel-wide">
                <div>
                  <p className="nav-panel-title">Nos métiers</p>
                  {trades.map((trade) => <Link key={trade.slug} to="/fr/$metier" params={{ metier: trade.slug }}>{trade.shortTitle}</Link>)}
                </div>
                <div>
                  <p className="nav-panel-title">Nos secteurs</p>
                  <Link to="/fr/secteurs">Tous les secteurs</Link>
                  <Link to="/fr/secteurs/$slug" params={{ slug: "hotellerie" }}>Hôtellerie</Link>
                  <Link to="/fr/secteurs/$slug" params={{ slug: "restauration-chr" }}>Restauration & CHR</Link>
                  <Link to="/fr/secteurs/$slug" params={{ slug: "tertiaire-bureaux" }}>Tertiaire & bureaux</Link>
                </div>
              </div>
            </details>
            <Link to="/fr/contrats-de-maintenance" className="nav-link">Contrats</Link>
            <Link to="/fr/nos-references" className="nav-link">Références</Link>
            <Link to="/fr/conseils" className="nav-link">Conseils</Link>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="outline" className="h-10 rounded-none border-primary px-4 text-primary hover:bg-accent">
              <a href={phoneHref(site.phones[0])}><Phone /> Urgence</a>
            </Button>
            <Button asChild className={`${linkButton} h-10 bg-primary px-4 text-primary-foreground hover:bg-secondary`}>
              <Link to="/fr/contact-et-devis">Demander un devis <ArrowRight /></Link>
            </Button>
          </div>
          <Button type="button" variant="outline" size="icon" className="lg:hidden" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav aria-label="Navigation mobile" className="border-t border-border bg-background px-5 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1">
              <MobileLink to="/fr" onClick={() => setMenuOpen(false)}>Accueil</MobileLink>
              <MobileLink to="/fr/qui-sommes-nous" onClick={() => setMenuOpen(false)}>Novare</MobileLink>
              <MobileLink to="/fr/nos-metiers" onClick={() => setMenuOpen(false)}>Expertises</MobileLink>
              <MobileLink to="/fr/contrats-de-maintenance" onClick={() => setMenuOpen(false)}>Contrats</MobileLink>
              <MobileLink to="/fr/nos-references" onClick={() => setMenuOpen(false)}>Références</MobileLink>
              <MobileLink to="/fr/conseils" onClick={() => setMenuOpen(false)}>Conseils</MobileLink>
              <MobileLink to="/fr/contact-et-devis" onClick={() => setMenuOpen(false)}>Contact & devis</MobileLink>
              <MobileLink to="/fr/depannage-urgent" onClick={() => setMenuOpen(false)}>Urgence</MobileLink>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function MobileLink({ to, children, onClick }: { to: "/fr" | "/fr/qui-sommes-nous" | "/fr/nos-metiers" | "/fr/contrats-de-maintenance" | "/fr/nos-references" | "/fr/conseils" | "/fr/contact-et-devis" | "/fr/depannage-urgent"; children: ReactNode; onClick: () => void }) {
  return <Link to={to} onClick={onClick} className="border-b border-border px-2 py-3 text-sm font-medium text-foreground">{children}</Link>;
}

function Footer() {
  return (
    <footer className="novare-dark relative overflow-hidden">
      <div className="section-rule" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="mb-6 inline-flex bg-background p-2"><BrandMark compact /></div>
          <p className="max-w-xs text-sm leading-6 text-primary-foreground/70">Installation, maintenance et optimisation de vos équipements techniques à Marrakech.</p>
          <a href={whatsappHref("Bonjour, je souhaite contacter Novare.")} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground">WhatsApp <ExternalLink size={14} /></a>
        </div>
        <div>
          <h3 className="footer-heading">Explorer</h3>
          <div className="footer-links">
            <Link to="/fr/qui-sommes-nous">Qui sommes-nous</Link><Link to="/fr/nos-metiers">Nos expertises</Link><Link to="/fr/secteurs">Nos secteurs</Link><Link to="/fr/nos-references">Références</Link><Link to="/fr/conseils">Conseils</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Nos solutions</h3>
          <div className="footer-links">
            {trades.map((trade) => <Link key={trade.slug} to="/fr/$metier" params={{ metier: trade.slug }}>{trade.shortTitle}</Link>)}
            <Link to="/fr/contrats-de-maintenance">Contrats de maintenance</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Nous contacter</h3>
          <address className="not-italic text-sm leading-6 text-primary-foreground/70">{site.address}<br />Marrakech, Maroc</address>
          <div className="footer-links mt-4">
            {site.phones.map((phone) => <a key={phone} href={phoneHref(phone)}>{phone}</a>)}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-primary-foreground/55 sm:px-8 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Novare Solutions Techniques · Marrakech</span>
          <div className="flex flex-wrap gap-5"><Link to="/fr/mentions-legales">Mentions légales</Link><Link to="/fr/politique-de-confidentialite">Confidentialité</Link><Link to="/fr/contact-et-devis">Contact</Link></div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
      <a className="whatsapp-float" href={whatsappHref("Bonjour, je souhaite contacter Novare.")} target="_blank" rel="noreferrer" aria-label="Contacter Novare sur WhatsApp">WA</a>
      <div className="mobile-contact-bar">
        <Button asChild variant="outline" className="h-12 flex-1 rounded-none border-primary bg-background text-primary"><a href={phoneHref(site.phones[0])}><Phone /> Appeler</a></Button>
        <Button asChild className="h-12 flex-1 rounded-none bg-primary text-primary-foreground"><Link to="/fr/contact-et-devis">Devis <ArrowRight /></Link></Button>
      </div>
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

export function Blueprint({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 620 480" fill="none" aria-hidden="true">
      <defs><pattern id="blueprintDots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="currentColor" opacity=".28" /></pattern></defs>
      <rect x="8" y="8" width="604" height="464" fill="url(#blueprintDots)" />
      <g stroke="currentColor" strokeWidth="1.2" pathLength="1" opacity=".8">
        <path className="blueprint-line" d="M104 401V102h180v299M104 199h180M104 296h180M194 102v299M284 148h154v253H284M284 212h154M284 296h154M360 148v253M438 191h93v210h-93M438 254h93M483 191v210" />
        <path className="blueprint-line" d="M62 401h494M72 78h238M72 78v12m238-12v12M120 432h121M120 432v-10m121 10v-10M463 112h73v54h-73zM454 102h91v74h-91z" />
        <path className="blueprint-line" d="M104 102l-16-16m196 16 16-16M284 148l-16-16m170 16 16-16M284 401l-15 15m269-15 15 15" />
        <circle className="blueprint-line" cx="194" cy="247" r="26" />
        <path className="blueprint-line" d="M194 221v52m-26-26h52M383 148v-26h42v26m-42 253v24h42v-24M62 401h494" />
      </g>
      <g fill="currentColor" opacity=".55"><circle cx="194" cy="247" r="3" /><circle cx="383" cy="122" r="3" /><circle cx="425" cy="425" r="3" /></g>
    </svg>
  );
}

export function PageHero({ eyebrow, title, description, accent, dark = false, children }: { eyebrow: string; title: string; description: string; accent?: string; dark?: boolean; children?: ReactNode }) {
  return (
    <section className={dark ? "hero-dark relative overflow-hidden" : "page-hero relative overflow-hidden"}>
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-40" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1.1fr_.9fr] md:py-20">
        <div className="relative z-10">
          <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-[56px]">{title}{accent && <> <span className="text-gradient-brand">{accent}</span></>}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
          {children}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[560px] text-primary">
          <Blueprint className="w-full drop-shadow-sm" />
          <div className="absolute bottom-[15%] left-[13%] flex items-center gap-2 bg-background/90 px-3 py-2 text-xs font-medium text-foreground shadow-sm"><span className="size-2 rounded-full bg-primary" /> Étude technique · Marrakech</div>
        </div>
      </div>
      <div className="section-rule relative" />
    </section>
  );
}

export function CompactHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="page-hero relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20">
        <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-[60px]">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>}
        {children}
      </div>
      <div className="section-rule relative" />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, body, light = false, className = "" }: { eyebrow: string; title: string; body?: string; light?: boolean; className?: string }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className={`eyebrow ${light ? "text-primary-foreground/70" : ""}`}><span className="eyebrow-mark" />{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-[46px] ${light ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
      {body && <p className={`mt-5 max-w-2xl text-base leading-7 ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{body}</p>}
    </div>
  );
}

export function TradeCard({ trade, index = 0 }: { trade: Trade; index?: number }) {
  const Icon = iconMap[trade.icon];
  return (
    <Reveal delay={index * 0.06}>
      <Link to="/fr/$metier" params={{ metier: trade.slug }} className="trade-card group block h-full">
        <div className="flex items-start justify-between gap-4">
          <span className="trade-icon"><Icon size={22} strokeWidth={1.6} /></span>
          <ArrowRight className="mt-2 size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
        <h3 className="mt-8 text-xl font-semibold leading-snug">{trade.shortTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{trade.summary}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">Découvrir <ArrowRight size={14} /></span>
      </Link>
    </Reveal>
  );
}

export function Stats({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-2 border-y border-border/70 ${compact ? "md:grid-cols-4" : "md:grid-cols-4"}`}>
      {metrics.map((metric, index) => (
        <Reveal key={metric.label} delay={index * 0.08} className="metric-item">
          <strong>{metric.value}</strong><span>{metric.label}</span>
        </Reveal>
      ))}
    </div>
  );
}

export function WordmarkRail() {
  const names = ["McDonald’s", "La Mamounia", "Hôtel Es Saadi", "Mandarin Oriental", "Fairmont", "Anosta l’Orangeraie"];
  return (
    <section className="border-y border-border bg-background py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ils nous font confiance</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center sm:gap-x-12">
          {names.map((name, index) => <span key={name} className={`wordmark wordmark-${index}`}>{name}</span>)}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ title = "Parlons de votre projet technique.", body = "Partagez votre besoin avec nos équipes à Marrakech. Nous vous orienterons vers la solution adaptée.", label = "Demander un devis", href = "/fr/contact-et-devis" }: { title?: string; body?: string; label?: string; href?: "/fr/contact-et-devis" | "/fr/depannage-urgent" }) {
  return (
    <section className="cta-band relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-20" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 py-12 sm:px-8 md:flex-row md:items-center md:py-16">
        <div className="max-w-2xl"><p className="eyebrow text-primary-foreground/70"><span className="eyebrow-mark" />NOVARE · MARRAKECH</p><h2 className="mt-4 text-3xl font-semibold leading-tight text-primary-foreground sm:text-4xl">{title}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-primary-foreground/75">{body}</p></div>
        <Button asChild className="relative z-10 h-12 rounded-none bg-background px-6 text-foreground hover:bg-accent"><Link to={href}>{label}<ArrowRight /></Link></Button>
      </div>
    </section>
  );
}

type QuoteFields = { need: string; detail: string; establishment: string; name: string; phone: string; email: string };

export function QuoteForm({ initialNeed = "", compact = false, urgent = false }: { initialNeed?: string; compact?: boolean; urgent?: boolean }) {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState<QuoteFields>({ need: initialNeed, detail: "", establishment: "", name: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const update = (key: keyof QuoteFields, value: string) => setFields((previous) => ({ ...previous, [key]: value }));
  const summary = [
    `Bonjour Novare, je souhaite ${urgent ? "signaler un dépannage urgent" : "demander un devis"}.`,
    `Besoin : ${fields.need || "À préciser"}`,
    `Détails : ${fields.detail || "Non précisés"}`,
    `Établissement : ${fields.establishment || "Non précisé"}`,
    `Nom : ${fields.name || "Non précisé"}`,
    `Téléphone : ${fields.phone || "Non précisé"}`,
    `E-mail : ${fields.email || "Non précisé"}`,
  ].join("\n");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1 && !fields.need) { setError("Choisissez le sujet de votre demande."); return; }
    if (step === 2 && !fields.establishment) { setError("Indiquez le type de votre établissement."); return; }
    if (step < 3) { setError(""); setStep(step + 1); return; }
    if (!fields.name.trim() || !fields.phone.trim()) { setError("Renseignez votre nom et votre téléphone."); return; }
    window.open(whatsappHref(summary), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) return <div className="quote-success"><span className="quote-success-icon"><Check /></span><h3>Votre demande est prête.</h3><p>WhatsApp s’est ouvert avec votre message. Il ne vous reste qu’à l’envoyer à notre équipe.</p><Button asChild variant="outline" className="mt-4 rounded-none"><a href={`mailto:${site.email}?subject=${encodeURIComponent("Demande de devis Novare")}&body=${encodeURIComponent(summary)}`}>Envoyer par e-mail <Send /></a></Button></div>;

  return (
    <form className={`quote-form ${compact ? "quote-form-compact" : ""}`} onSubmit={submit}>
      <div className="quote-progress" aria-label={`Étape ${step} sur 3`}>
        {["Besoin", "Établissement", "Coordonnées"].map((label, index) => <div key={label} className={`quote-step ${step >= index + 1 ? "is-active" : ""}`}><span>{index + 1}</span><small>{label}</small></div>)}
      </div>
      {step === 1 && <div className="form-fields"><label className="field-label">Quel est votre besoin ?<select value={fields.need} onChange={(event) => update("need", event.target.value)}><option value="">Sélectionner une expertise</option>{trades.map((trade) => <option key={trade.slug} value={trade.title}>{trade.title}</option>)}<option value="Contrat de maintenance">Contrat de maintenance</option><option value="Autre demande">Autre demande</option></select></label><label className="field-label">Quelques précisions<textarea rows={compact ? 3 : 4} value={fields.detail} onChange={(event) => update("detail", event.target.value)} placeholder="Décrivez votre projet ou votre installation" /></label></div>}
      {step === 2 && <div className="form-fields"><label className="field-label">Type d’établissement<select value={fields.establishment} onChange={(event) => update("establishment", event.target.value)}><option value="">Sélectionner</option>{["Hôtellerie", "Restauration · CHR", "Résidentiel", "Tertiaire · Bureaux", "Industrie", "Autre"].map((name) => <option key={name} value={name}>{name}</option>)}</select></label><div className="form-note"><ClipboardCheck size={18} /><p>Ces informations nous aident à orienter votre demande vers l’équipe concernée.</p></div></div>}
      {step === 3 && <div className="form-fields form-grid"><label className="field-label">Nom et prénom<input autoComplete="name" value={fields.name} onChange={(event) => update("name", event.target.value)} placeholder="Votre nom" required /></label><label className="field-label">Téléphone<input autoComplete="tel" inputMode="tel" value={fields.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Votre numéro" required /></label><label className="field-label field-span">E-mail<input type="email" autoComplete="email" value={fields.email} onChange={(event) => update("email", event.target.value)} placeholder="vous@entreprise.ma" /></label></div>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        {step > 1 ? <Button type="button" variant="ghost" onClick={() => { setError(""); setStep(step - 1); }}>Retour</Button> : <span className="text-xs text-muted-foreground">Aucun engagement</span>}
        <Button type="submit" className="h-11 rounded-none bg-primary px-5 text-primary-foreground hover:bg-secondary">{step === 3 ? "Continuer sur WhatsApp" : "Continuer"}<ArrowRight /></Button>
      </div>
      {step === 3 && <button type="button" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary underline underline-offset-4" onClick={() => window.location.assign(`mailto:${site.email}?subject=${encodeURIComponent("Demande de devis Novare")}&body=${encodeURIComponent(summary)}`)}>Envoyer par e-mail <Send size={13} /></button>}
    </form>
  );
}

export function QuoteBlock({ initialNeed = "", title = "Parlons de votre projet.", compact = false }: { initialNeed?: string; title?: string; compact?: boolean }) {
  return (
    <section className="quote-section" id="devis">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:py-24">
        <div className="md:sticky md:top-28 md:self-start"><p className="eyebrow"><span className="eyebrow-mark" />CONTACT & DEVIS</p><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2><p className="mt-5 text-sm leading-6 text-muted-foreground">Décrivez votre besoin en quelques étapes. Notre équipe à Marrakech vous recontactera.</p><a href={phoneHref(site.phones[0])} className="mt-7 inline-flex items-center gap-3 border-t border-border pt-5 text-sm font-semibold text-primary"><Phone size={18} />{site.phones[0]}</a></div>
        <div className="quote-panel"><QuoteForm initialNeed={initialNeed} compact={compact} /></div>
      </div>
    </section>
  );
}

export function ProcessStrip({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`process-strip ${dark ? "process-strip-dark" : ""}`}>
      {methodSteps.map((step, index) => <Reveal key={step.title} delay={index * 0.07} className="process-step"><span className="process-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}
    </div>
  );
}

export function FAQList({ items = faqs }: { items?: { question: string; answer: string; category?: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details key={item.question} className="faq-item"><summary><span>{item.question}</span><ChevronDown size={18} /></summary><p>{item.answer}</p></details>)}</div>;
}

export function SearchableFAQ() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const categories = ["Toutes", ...Array.from(new Set(faqs.map((item) => item.category)))];
  const filtered = useMemo(() => faqs.filter((item) => (category === "Toutes" || item.category === category) && `${item.question} ${item.answer}`.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr"))), [search, category]);
  return <div>
    <label className="faq-search"><CircleHelp size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher une question" aria-label="Rechercher une question" /></label>
    <div className="faq-tabs" role="group" aria-label="Catégories de questions">{categories.map((item) => <Button key={item} type="button" variant={category === item ? "default" : "outline"} size="sm" className="rounded-none" onClick={() => setCategory(item)}>{item}</Button>)}</div>
    {filtered.length ? <FAQList items={filtered} /> : <p className="py-10 text-center text-sm text-muted-foreground">Aucune question ne correspond à votre recherche.</p>}
  </div>;
}

export function MapEmbed() {
  return <div className="map-frame"><iframe title="Carte : adresse de Novare à Marrakech" src={site.mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>;
}

export function ScrollCue() {
  return <a href="#expertises" className="scroll-cue" aria-label="Découvrir nos expertises"><span>Défiler</span><ArrowDown size={14} /></a>;
}

export function ServiceIcon({ trade, size = 20 }: { trade: Trade; size?: number }) {
  const Icon = iconMap[trade.icon] ?? Fan;
  return <Icon size={size} strokeWidth={1.7} />;
}

export function UrgentContact() {
  return <div className="urgent-contact"><Button asChild className="h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-secondary"><a href={phoneHref(site.phones[0])}><Phone />Appeler {site.phones[0]}</a></Button><Button asChild variant="outline" className="h-12 rounded-none border-primary px-6 text-primary"><a href={whatsappHref("Bonjour Novare, j’ai besoin d’une intervention de dépannage.")} target="_blank" rel="noreferrer">WhatsApp <ExternalLink /></a></Button></div>;
}

export function ContactDetails() {
  return <div className="contact-details"><div><span className="contact-icon"><Phone /></span><div><small>Téléphone</small>{site.phones.map((phone) => <a key={phone} href={phoneHref(phone)}>{phone}</a>)}</div></div><div><span className="contact-icon"><Clock3 /></span><div><small>E-mail</small><a href={`mailto:${site.email}`}>{site.email}</a></div></div><div><span className="contact-icon"><Droplet /></span><div><small>Adresse</small><p>{site.address}, Marrakech</p></div></div></div>;
}

export function ArrowButton({ to = "/fr/contact-et-devis", children = "Échanger avec Novare" }: { to?: "/fr/contact-et-devis" | "/fr/nos-metiers" | "/fr/contrats-de-maintenance"; children?: ReactNode }) {
  return <Button asChild className="mt-7 h-12 rounded-none bg-primary px-6 text-primary-foreground hover:bg-secondary"><Link to={to}>{children}<ArrowRight /></Link></Button>;
}