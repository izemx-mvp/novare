import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { z } from "zod";
import {
  buildSummary,
  callbackOptions,
  establishmentOptions,
  isRequestTypeValue,
  isTradeValue,
  labelOf,
  openExternal,
  requestTypeOptions,
  sendLinks,
  tradeOptions,
} from "@/lib/quote";
import { isMoroccanPhone } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import {
  ChoiceGroup,
  Field,
  SelectInput,
  SuccessCheck,
  TextArea,
  TextInput,
} from "@/components/site/FormFields";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const schema = z.object({
  trade: z.string().min(1, "Choisissez un métier."),
  type: z.string().min(1, "Choisissez le type de demande."),
  establishment: z.string().min(1, "Choisissez le type d'établissement."),
  city: z.string().trim().min(2, "Indiquez la ville du site."),
  description: z.string().trim().max(1500, "1500 caractères maximum."),
  name: z.string().trim().min(2, "Indiquez votre nom."),
  company: z.string().trim().max(120),
  phone: z
    .string()
    .trim()
    .refine(isMoroccanPhone, "Numéro invalide. Exemple : 06 12 34 56 78 ou +212 6 12 34 56 78."),
  email: z.string().trim().email("Adresse email invalide."),
  callback: z.string().min(1, "Choisissez un créneau de rappel."),
});

type Values = z.infer<typeof schema>;

const steps: { title: string; fields: FieldPath<Values>[] }[] = [
  { title: "Votre besoin", fields: ["trade", "type"] },
  { title: "Votre établissement", fields: ["establishment", "city", "description"] },
  { title: "Vos coordonnées", fields: ["name", "company", "phone", "email", "callback"] },
];

type Props = {
  defaultTrade?: string | undefined;
  defaultType?: string | undefined;
  className?: string;
  title?: string;
};

export function QuoteForm({
  defaultTrade,
  defaultType,
  className,
  title = "Demande de devis",
}: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);
  const [summary, setSummary] = useState("");

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      trade: isTradeValue(defaultTrade) ? defaultTrade : "",
      type: isRequestTypeValue(defaultType) ? defaultType : "",
      establishment: "",
      city: "Marrakech",
      description: "",
      name: "",
      company: "",
      phone: "",
      email: "",
      callback: "",
    },
  });
  const { register, control, formState, trigger, handleSubmit, reset } = form;
  const errors = formState.errors;

  const next = async () => {
    const ok = await trigger(steps[step]?.fields ?? []);
    if (ok) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const send = (channel: "whatsapp" | "email") =>
    handleSubmit((values) => {
      const text = buildSummary("Je souhaite recevoir un devis :", [
        ["Métier", labelOf(tradeOptions, values.trade)],
        ["Type de demande", labelOf(requestTypeOptions, values.type)],
        ["Établissement", labelOf(establishmentOptions, values.establishment)],
        ["Ville", values.city],
        ["Description", values.description],
        ["Nom", values.name],
        ["Société", values.company],
        ["Téléphone", values.phone],
        ["Email", values.email],
        ["Créneau de rappel", labelOf(callbackOptions, values.callback)],
      ]);
      const links = sendLinks(`Demande de devis — ${labelOf(tradeOptions, values.trade)}`, text);
      openExternal(channel === "whatsapp" ? links.whatsapp : links.email);
      setSummary(text);
      setSent(channel);
    });

  const restart = () => {
    reset();
    setStep(0);
    setSent(null);
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] border bg-white shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {sent ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center px-6 py-14 text-center sm:px-10"
          role="status"
          aria-live="polite"
        >
          <SuccessCheck />
          <h3 className="mt-6 text-2xl font-semibold text-ink">Merci, votre demande est prête !</h3>
          <p className="mt-3 max-w-md text-muted-foreground">
            {sent === "whatsapp"
              ? "WhatsApp s'est ouvert avec le récapitulatif de votre demande : il ne vous reste plus qu'à l'envoyer. Nous revenons vers vous rapidement."
              : "Votre messagerie s'est ouverte avec le récapitulatif de votre demande : il ne vous reste plus qu'à l'envoyer. Nous revenons vers vous rapidement."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn
              href={sendLinks("Demande de devis", summary).whatsapp}
              variant="primary"
              iconLeft={<WhatsAppIcon className="size-4" />}
            >
              Rouvrir WhatsApp
            </Btn>
            <Btn variant="outline" onClick={restart} iconLeft={<RotateCcw className="size-4" />}>
              Nouvelle demande
            </Btn>
          </div>
        </motion.div>
      ) : (
        <form
          noValidate
          aria-label={title}
          onSubmit={(event) => {
            if (step < steps.length - 1) {
              event.preventDefault();
              void next();
            } else {
              void send("whatsapp")(event);
            }
          }}
        >
          <div className="border-b px-6 pb-5 pt-6 sm:px-9 sm:pt-8">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-sm font-semibold text-ink">
                Étape {step + 1}/{steps.length} ·{" "}
                <span className="text-primary">{steps[step]?.title}</span>
              </p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Devis gratuit · Réponse rapide
              </p>
            </div>
            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-navy/5"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-valuenow={step + 1}
              aria-label="Progression du formulaire"
            >
              <motion.div
                className="h-full rounded-full bg-brand-gradient"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <ol className="mt-4 hidden gap-2 sm:flex">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={cn(
                    "flex items-center gap-2 text-xs font-medium",
                    i <= step ? "text-navy" : "text-steel-400",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[0.65rem] font-semibold",
                      i <= step ? "bg-primary text-white" : "bg-navy/5",
                    )}
                  >
                    {i + 1}
                  </span>
                  {s.title}
                  {i < steps.length - 1 && <span className="mx-1 h-px w-6 bg-navy/10" />}
                </li>
              ))}
            </ol>
          </div>

          <div className="relative min-h-[26rem] px-6 py-7 sm:px-9">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-7"
              >
                {step === 0 && (
                  <>
                    <Controller
                      control={control}
                      name="trade"
                      render={({ field }) => (
                        <ChoiceGroup
                          legend="Métier concerné"
                          name="trade"
                          options={tradeOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.trade?.message}
                          columns="2"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <ChoiceGroup
                          legend="Type de demande"
                          name="type"
                          options={requestTypeOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.type?.message}
                        />
                      )}
                    />
                  </>
                )}
                {step === 1 && (
                  <>
                    <Controller
                      control={control}
                      name="establishment"
                      render={({ field }) => (
                        <ChoiceGroup
                          legend="Type d'établissement"
                          name="establishment"
                          options={establishmentOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.establishment?.message}
                          columns="3"
                        />
                      )}
                    />
                    <Field label="Ville" htmlFor="q-city" error={errors.city?.message}>
                      <TextInput
                        id="q-city"
                        autoComplete="address-level2"
                        invalid={Boolean(errors.city)}
                        {...register("city")}
                      />
                    </Field>
                    <Field
                      label="Décrivez votre besoin"
                      htmlFor="q-desc"
                      optional
                      error={errors.description?.message}
                      hint="Équipements concernés, surface, symptômes d'une panne, délais souhaités…"
                    >
                      <TextArea
                        id="q-desc"
                        rows={4}
                        invalid={Boolean(errors.description)}
                        placeholder="Ex. Remplacement de 12 unités murales par un système gainable dans un riad de 8 chambres."
                        {...register("description")}
                      />
                    </Field>
                  </>
                )}
                {step === 2 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Nom" htmlFor="q-name" error={errors.name?.message}>
                      <TextInput
                        id="q-name"
                        autoComplete="name"
                        invalid={Boolean(errors.name)}
                        {...register("name")}
                      />
                    </Field>
                    <Field label="Société" htmlFor="q-company" optional>
                      <TextInput
                        id="q-company"
                        autoComplete="organization"
                        {...register("company")}
                      />
                    </Field>
                    <Field label="Téléphone" htmlFor="q-phone" error={errors.phone?.message}>
                      <TextInput
                        id="q-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="06 12 34 56 78"
                        invalid={Boolean(errors.phone)}
                        {...register("phone")}
                      />
                    </Field>
                    <Field label="Email" htmlFor="q-email" error={errors.email?.message}>
                      <TextInput
                        id="q-email"
                        type="email"
                        autoComplete="email"
                        placeholder="vous@exemple.ma"
                        invalid={Boolean(errors.email)}
                        {...register("email")}
                      />
                    </Field>
                    <Field
                      label="Créneau de rappel"
                      htmlFor="q-callback"
                      error={errors.callback?.message}
                      className="sm:col-span-2"
                    >
                      <SelectInput
                        id="q-callback"
                        options={callbackOptions}
                        placeholder="Choisir un créneau"
                        invalid={Boolean(errors.callback)}
                        {...register("callback")}
                      />
                    </Field>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t bg-offwhite/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
            {step > 0 ? (
              <Btn
                variant="ghost"
                onClick={back}
                iconLeft={<ArrowLeft className="size-4" />}
                className="px-2"
              >
                Retour
              </Btn>
            ) : (
              <p className="text-xs text-muted-foreground">
                Vos données ne servent qu'à traiter votre demande.
              </p>
            )}
            {step < steps.length - 1 ? (
              <Btn onClick={next} icon={<ArrowRight className="size-4" />}>
                Continuer
              </Btn>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Btn
                  variant="outline"
                  onClick={() => void send("email")()}
                  iconLeft={<Mail className="size-4" />}
                >
                  Envoyer par email
                </Btn>
                <Btn type="submit" iconLeft={<WhatsAppIcon className="size-4" />}>
                  Envoyer sur WhatsApp
                </Btn>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
