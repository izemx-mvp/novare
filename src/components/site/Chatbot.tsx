import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  Mail,
  Minus,
  Phone,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { images } from "@/config/images";
import { defaultWhatsappMessage, site, telHref, whatsappHref, mailtoHref } from "@/config/site";
import {
  detectTrade,
  fallback,
  intentReply,
  matchIntent,
  quoteSteps,
  welcome,
  type BotReply,
  type ChatAction,
  type ChatContent,
  type Chip,
  type QuoteStepId,
} from "@/data/chatbot";
import { references } from "@/data/references";
import { getService, services } from "@/data/services";
import { buildSummary } from "@/lib/quote";
import { normalize } from "@/lib/text";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { getIcon } from "@/components/site/icons";
import { SmartImage } from "@/components/site/SmartImage";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

type Message = {
  id: number;
  from: "bot" | "user";
  contents: ChatContent[];
  chips?: Chip[] | undefined;
};
type Answers = Partial<Record<QuoteStepId, { value: string; label: string }>>;
type Flow = { active: boolean; step: number; answers: Answers };

const STORAGE_KEY = "novare-chat-v1";
const idleFlow: Flow = { active: false, step: 0, answers: {} };
const cancelChip: Chip = { label: "Annuler", action: { kind: "cancel" } };

function loadState(): { messages: Message[]; flow: Flow } | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { messages: Message[]; flow: Flow }) : null;
  } catch {
    return null;
  }
}

function saveState(state: { messages: Message[]; flow: Flow }) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable (private mode): the conversation simply isn't persisted.
  }
}

function stepQuestion(index: number): BotReply {
  const step = quoteSteps[index];
  if (!step) return fallback;
  const chips: Chip[] = (step.options ?? []).map((o) => ({
    label: o.label,
    action: { kind: "quoteAnswer", value: o.value, label: o.label },
  }));
  return {
    contents: [{ type: "text", text: step.question }],
    chips: [...chips, cancelChip],
  };
}

function recapReply(answers: Answers): BotReply {
  const fields = quoteSteps.map((s) => [s.label, answers[s.id]?.label ?? ""] as [string, string]);
  const summary = buildSummary("Je souhaite recevoir un devis (via l'assistant du site) :", fields);
  return {
    contents: [
      {
        type: "text",
        text: "Merci ! Voici le récapitulatif de votre demande. Choisissez comment nous l'envoyer :",
      },
      { type: "recap", fields, summary },
    ],
    chips: [
      { label: "Recommencer", action: { kind: "startQuote" } },
      { label: "Autre question", action: { kind: "restart" } },
    ],
  };
}

export function Chatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [flow, setFlow] = useState<Flow>(idleFlow);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const idRef = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hydrated = useRef(false);

  // Restore (or start) the conversation once.
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.messages.length > 0) {
      setMessages(saved.messages);
      setFlow(saved.flow);
      idRef.current = Math.max(...saved.messages.map((m) => m.id)) + 1;
    } else {
      setMessages([{ id: idRef.current++, from: "bot", ...welcome }]);
    }
    hydrated.current = true;
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (hydrated.current) saveState({ messages, flow });
  }, [messages, flow]);

  // Autoscroll on new content.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const pushUser = (text: string) =>
    setMessages((m) => [
      ...m,
      { id: idRef.current++, from: "user", contents: [{ type: "text", text }] },
    ]);

  const pushBot = useCallback((reply: BotReply) => {
    setTyping(true);
    const delay = 600 + Math.round(Math.random() * 300);
    const timer = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: idRef.current++, from: "bot", contents: reply.contents, chips: reply.chips },
      ]);
    }, delay);
    timers.current.push(timer);
  }, []);

  const startQuote = (trade?: string) => {
    const service = trade ? getService(trade) : undefined;
    if (service) {
      setFlow({
        active: true,
        step: 1,
        answers: { trade: { value: service.slug, label: service.name } },
      });
      pushBot({
        contents: [
          {
            type: "text",
            text: `Parfait, préparons votre demande de devis en ${service.name.toLowerCase()}.`,
          },
          ...stepQuestion(1).contents,
        ],
        chips: stepQuestion(1).chips,
      });
    } else {
      setFlow({ active: true, step: 0, answers: {} });
      pushBot({
        contents: [
          {
            type: "text",
            text: "Avec plaisir ! Je vous pose quelques questions rapides pour préparer votre devis gratuit.",
          },
          ...stepQuestion(0).contents,
        ],
        chips: stepQuestion(0).chips,
      });
    }
  };

  const answerStep = (value: string, label: string) => {
    const step = quoteSteps[flow.step];
    if (!step) return;
    const answers: Answers = { ...flow.answers, [step.id]: { value, label } };
    const nextIndex = flow.step + 1;
    if (nextIndex >= quoteSteps.length) {
      setFlow({ active: false, step: 0, answers });
      pushBot(recapReply(answers));
    } else {
      setFlow({ active: true, step: nextIndex, answers });
      pushBot(stepQuestion(nextIndex));
    }
  };

  const runAction = (action: ChatAction, label: string) => {
    setInputError(null);
    switch (action.kind) {
      case "intent":
        pushUser(label);
        if (action.intent === "quote") return startQuote();
        return pushBot(intentReply(action.intent));
      case "startQuote":
        pushUser(label);
        return startQuote(action.trade);
      case "quoteAnswer":
        pushUser(label);
        return answerStep(action.value, action.label);
      case "cancel":
        pushUser(label);
        setFlow(idleFlow);
        return pushBot({
          contents: [
            {
              type: "text",
              text: "C'est noté, j'annule la demande. Que puis-je faire d'autre pour vous ?",
            },
          ],
          chips: welcome.chips,
        });
      case "restart":
        pushUser(label);
        setFlow(idleFlow);
        return pushBot({
          contents: [{ type: "text", text: "Bien sûr. Que souhaitez-vous savoir ?" }],
          chips: welcome.chips,
        });
      case "navigate":
        void navigate({ to: action.href as never });
        if (window.matchMedia("(max-width: 639px)").matches) onClose();
        return;
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || typing) return;

    if (flow.active) {
      const step = quoteSteps[flow.step];
      if (!step) return;
      const lowered = normalize(text);
      if (["annuler", "stop", "annule"].includes(lowered)) {
        setInput("");
        return runAction({ kind: "cancel" }, text);
      }
      if (step.options) {
        const option = step.options.find(
          (o) => normalize(o.label).includes(lowered) || lowered.includes(normalize(o.label)),
        );
        const tradeGuess = step.id === "trade" ? detectTrade(text) : undefined;
        const match =
          option ?? (tradeGuess ? step.options.find((o) => o.value === tradeGuess) : undefined);
        setInput("");
        pushUser(text);
        if (match) return answerStep(match.value, match.label);
        return pushBot({
          contents: [
            {
              type: "text",
              text: "Je n'ai pas reconnu votre choix. Sélectionnez l'une des options ci-dessous :",
            },
          ],
          chips: stepQuestion(flow.step).chips,
        });
      }
      const error = step.validate?.(text) ?? null;
      if (error) {
        setInputError(error);
        return;
      }
      setInput("");
      pushUser(text);
      return answerStep(text, text);
    }

    setInput("");
    pushUser(text);
    const intent = matchIntent(text);
    if (!intent) return pushBot(fallback);
    if (intent === "quote") return startQuote(detectTrade(text));
    pushBot(intentReply(intent, { trade: detectTrade(text) }));
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setTyping(false);
    setFlow(idleFlow);
    setInputError(null);
    setMessages([{ id: idRef.current++, from: "bot", ...welcome }]);
  };

  // Escape closes, Tab is trapped inside the panel.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const currentStep = flow.active ? quoteSteps[flow.step] : undefined;
  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
          onKeyDown={onKeyDown}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-offwhite sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(600px,calc(100svh-8rem))] sm:w-[380px] sm:rounded-[1.5rem] sm:border sm:border-navy/10 sm:shadow-[0_30px_80px_-20px_rgb(11_29_58/0.45)]"
          style={{ transformOrigin: "bottom right" }}
        >
          {/* Glass header */}
          <div className="glass-dark relative z-10 flex bg-night/90 items-center gap-3 border-b border-white/10 px-4 py-3.5 text-white">
            <span className="flex size-10 items-center justify-center rounded-full bg-white p-1.5">
              <img
                src={images.logo}
                alt=""
                className="h-full w-full object-contain"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </span>
            <div className="min-w-0 flex-1">
              <p id="chatbot-title" className="font-display font-semibold leading-tight">
                Assistant Novare
              </p>
              <p className="flex items-center gap-1.5 text-xs text-steel-200">
                <span className="size-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgb(34_197_94/0.25)]" />{" "}
                En ligne
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="flex size-9 items-center justify-center rounded-full text-steel-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Recommencer la conversation"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="hidden size-9 items-center justify-center rounded-full text-steel-200 transition-colors hover:bg-white/10 hover:text-white sm:flex"
              aria-label="Réduire l'assistant"
            >
              <Minus className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full text-steel-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fermer l'assistant"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="relative flex-1 space-y-4 overflow-y-auto px-4 py-5"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <MessageView
                key={message.id}
                message={message}
                active={message.id === lastBotId && !typing}
                onChip={(chip) => runAction(chip.action, chip.label)}
                onNavigate={(href) => runAction({ kind: "navigate", href }, "")}
              />
            ))}
            {typing && (
              <div className="flex items-end gap-2" aria-label="L'assistant écrit">
                <BotAvatar />
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="typing-dot size-1.5 rounded-full bg-steel"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="border-t border-navy/10 bg-white p-3">
            {inputError && (
              <p role="alert" className="mb-2 px-1 text-xs text-red-600">
                {inputError}
              </p>
            )}
            <div className="flex items-center gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Votre message
              </label>
              <input
                ref={inputRef}
                id="chatbot-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setInputError(null);
                }}
                type={currentStep?.id === "phone" ? "tel" : "text"}
                inputMode={currentStep?.id === "phone" ? "tel" : "text"}
                autoComplete="off"
                placeholder={
                  currentStep?.placeholder ??
                  (currentStep ? "Choisissez une option ou écrivez…" : "Écrivez votre question…")
                }
                className="h-11 min-w-0 flex-1 rounded-full border bg-offwhite px-4 text-sm text-ink outline-none transition-colors placeholder:text-steel-400 focus:border-primary focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white transition-opacity disabled:opacity-40"
                aria-label="Envoyer"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="mt-2 px-1 text-center text-[0.6875rem] text-steel-400">
              Assistant automatique · Pour une urgence, appelez le {site.phones.mobile1.display}
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BotAvatar() {
  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-[0.625rem] font-bold text-white"
      aria-hidden="true"
    >
      N
    </span>
  );
}

function MessageView({
  message,
  active,
  onChip,
  onNavigate,
}: {
  message: Message;
  active: boolean;
  onChip: (chip: Chip) => void;
  onNavigate: (href: string) => void;
}) {
  if (message.from === "user") {
    const content = message.contents[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand-gradient px-4 py-2.5 text-sm text-white shadow-sm">
          {content?.type === "text" ? content.text : ""}
        </p>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      {message.contents.map((content, i) => (
        <div key={i} className="flex items-end gap-2">
          {i === message.contents.length - 1 ? <BotAvatar /> : <span className="w-7 shrink-0" />}
          <div className="min-w-0 max-w-[85%] flex-1">
            <RichContent content={content} onNavigate={onNavigate} />
          </div>
        </div>
      ))}
      {active && message.chips && message.chips.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-9 pt-1">
          {message.chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onChip(chip)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                chip.action.kind === "cancel"
                  ? "border-navy/10 text-muted-foreground hover:border-red-300 hover:text-red-600"
                  : "border-primary/30 bg-white text-primary-700 hover:border-primary hover:bg-primary hover:text-white",
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function RichContent({
  content,
  onNavigate,
}: {
  content: ChatContent;
  onNavigate: (href: string) => void;
}) {
  switch (content.type) {
    case "text":
      return (
        <p className="inline-block rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm">
          {content.text}
        </p>
      );
    case "service": {
      const service = getService(content.slug);
      if (!service) return null;
      const Icon = getIcon(service.icon);
      return (
        <AppLink
          href={service.path}
          className="group block overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors hover:border-primary"
        >
          <div className="relative">
            <SmartImage src={service.image} alt={service.imageAlt} aspect="16/8" />
            <span className="absolute bottom-3 left-3 flex size-9 items-center justify-center rounded-full bg-white text-primary">
              <Icon className="size-4" />
            </span>
          </div>
          <div className="p-3.5">
            <p className="font-display font-semibold text-ink group-hover:text-primary">
              {service.name}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{service.short}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              Voir le service <ArrowUpRight className="size-3.5" />
            </span>
          </div>
        </AppLink>
      );
    }
    case "services":
      return (
        <ul className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <li key={service.slug} className="border-b last:border-b-0">
                <AppLink
                  href={service.path}
                  className="flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors hover:bg-primary-50"
                >
                  <Icon className="size-4 text-primary" />
                  <span className="flex-1 font-medium text-ink">{service.name}</span>
                  <ArrowRight className="size-3.5 text-steel" />
                </AppLink>
              </li>
            );
          })}
        </ul>
      );
    case "references":
      return (
        <div className="flex flex-wrap gap-1.5 rounded-2xl bg-white p-3 shadow-sm">
          {references.map((r) => (
            <span
              key={r.slug}
              className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-navy"
            >
              {r.name}
            </span>
          ))}
        </div>
      );
    case "contact":
      return (
        <div
          className={cn(
            "grid gap-2 rounded-2xl bg-white p-3 shadow-sm",
            content.urgent && "ring-2 ring-primary/30",
          )}
        >
          <a
            href={telHref(site.phones.mobile1)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-3 font-semibold text-white",
              content.urgent ? "h-12 text-base" : "h-10 text-sm",
            )}
          >
            <Phone className="size-4" /> {site.phones.mobile1.display}
          </a>
          <a
            href={telHref(site.phones.mobile2)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-3 font-semibold text-navy hover:border-primary",
              content.urgent ? "h-12 text-base" : "h-10 text-sm",
            )}
          >
            <Phone className="size-4" /> {site.phones.mobile2.display}
          </a>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappHref(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-navy text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex h-10 items-center justify-center gap-1.5 rounded-xl border text-sm font-semibold text-navy hover:border-primary"
            >
              <Mail className="size-4" /> Email
            </a>
          </div>
        </div>
      );
    case "tip":
      return (
        <div className="rounded-2xl border border-primary/20 bg-primary-50 p-3.5 text-sm">
          <p className="flex items-center gap-1.5 font-semibold text-navy">
            <Lightbulb className="size-4 text-primary" /> {content.title}
          </p>
          <p className="mt-1 leading-relaxed text-ink/80">{content.text}</p>
        </div>
      );
    case "recap":
      return (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <p className="bg-night px-3.5 py-2.5 font-display text-sm font-semibold text-white">
            Récapitulatif de votre demande
          </p>
          <dl className="divide-y px-3.5 text-sm">
            {content.fields.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3 py-2">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-2 p-3">
            <a
              href={whatsappHref(content.summary)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-gradient text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" /> Envoyer sur WhatsApp
            </a>
            <a
              href={mailtoHref("Demande de devis — Assistant Novare", content.summary)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-semibold text-navy hover:border-primary"
            >
              <Mail className="size-4" /> Envoyer par email
            </a>
          </div>
        </div>
      );
    case "link":
      return (
        <button
          type="button"
          onClick={() => onNavigate(content.href)}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
        >
          {content.label} <ArrowRight className="size-4" />
        </button>
      );
  }
}
