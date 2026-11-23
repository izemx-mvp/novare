import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  buildSummary,
  isTradeValue,
  labelOf,
  openExternal,
  sendLinks,
  tradeOptions,
} from "@/lib/quote";
import { isMoroccanPhone } from "@/lib/text";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/site/Button";
import {
  Field,
  SelectInput,
  SuccessCheck,
  TextArea,
  TextInput,
} from "@/components/site/FormFields";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom."),
  phone: z.string().trim().refine(isMoroccanPhone, "Numéro invalide. Exemple : 06 12 34 56 78."),
  trade: z.string().min(1, "Choisissez un métier."),
  message: z
    .string()
    .trim()
    .min(5, "Décrivez brièvement votre besoin.")
    .max(1000, "1000 caractères maximum."),
});

type Values = z.infer<typeof schema>;

type Props = {
  defaultTrade?: string | undefined;
  className?: string;
  urgent?: boolean;
  title?: string;
};

/** Short form (nom, téléphone, métier, message) sent through WhatsApp or email. */
export function QuickQuoteForm({ defaultTrade, className, urgent = false, title }: Props) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      trade: isTradeValue(defaultTrade) ? defaultTrade : "",
      message: "",
    },
  });
  const errors = formState.errors;

  const send = (channel: "whatsapp" | "email") =>
    handleSubmit((values) => {
      const heading = urgent
        ? "URGENT — J'ai besoin d'une intervention rapide :"
        : "Je souhaite être recontacté pour un devis :";
      const text = buildSummary(heading, [
        ["Nom", values.name],
        ["Téléphone", values.phone],
        ["Métier", labelOf(tradeOptions, values.trade)],
        ["Message", values.message],
      ]);
      const links = sendLinks(urgent ? "Demande d'intervention urgente" : "Demande de devis", text);
      openExternal(channel === "whatsapp" ? links.whatsapp : links.email);
      setSent(true);
    });

  const prefix = urgent ? "u" : "qq";

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-center rounded-[1.5rem] border bg-white px-6 py-12 text-center shadow-[var(--shadow-lift)]",
          className,
        )}
      >
        <SuccessCheck />
        <h3 className="mt-5 text-xl font-semibold text-ink">Votre message est prêt à partir</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Envoyez-le depuis l'application qui vient de s'ouvrir. Nous vous rappelons rapidement.
        </p>
        <Btn
          variant="outline"
          className="mt-6"
          iconLeft={<RotateCcw className="size-4" />}
          onClick={() => {
            reset();
            setSent(false);
          }}
        >
          Nouvelle demande
        </Btn>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={send("whatsapp")}
      aria-label={title ?? (urgent ? "Demande d'intervention urgente" : "Demande de rappel rapide")}
      className={cn(
        "rounded-[1.5rem] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8",
        className,
      )}
    >
      {title && <h3 className="mb-6 text-xl font-semibold text-ink">{title}</h3>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" htmlFor={`${prefix}-name`} error={errors.name?.message}>
          <TextInput
            id={`${prefix}-name`}
            autoComplete="name"
            invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>
        <Field label="Téléphone" htmlFor={`${prefix}-phone`} error={errors.phone?.message}>
          <TextInput
            id={`${prefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Métier"
          htmlFor={`${prefix}-trade`}
          error={errors.trade?.message}
          className="sm:col-span-2"
        >
          <SelectInput
            id={`${prefix}-trade`}
            options={tradeOptions}
            placeholder="Choisir un métier"
            invalid={Boolean(errors.trade)}
            {...register("trade")}
          />
        </Field>
        <Field
          label={urgent ? "Décrivez la panne" : "Message"}
          htmlFor={`${prefix}-message`}
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <TextArea
            id={`${prefix}-message`}
            rows={3}
            invalid={Boolean(errors.message)}
            placeholder={
              urgent
                ? "Ex. Chambre froide négative à −8 °C depuis ce matin, alarme active."
                : "Ex. Entretien annuel de 6 climatiseurs dans nos bureaux."
            }
            {...register("message")}
          />
        </Field>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Btn type="submit" className="flex-1" iconLeft={<WhatsAppIcon className="size-4" />}>
          {urgent ? "Envoyer l'urgence sur WhatsApp" : "Envoyer sur WhatsApp"}
        </Btn>
        <Btn
          variant="outline"
          onClick={() => void send("email")()}
          iconLeft={<Mail className="size-4" />}
        >
          Par email
        </Btn>
      </div>
    </form>
  );
}
