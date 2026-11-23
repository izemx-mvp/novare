import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Paperclip, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { mailtoHref } from "@/config/site";
import { jobs } from "@/data/jobs";
import { buildSummary, labelOf, openExternal, type Option } from "@/lib/quote";
import { isMoroccanPhone } from "@/lib/text";
import { Btn } from "@/components/site/Button";
import {
  Field,
  SelectInput,
  SuccessCheck,
  TextArea,
  TextInput,
} from "@/components/site/FormFields";

const positionOptions: Option[] = [
  ...jobs.map((j) => ({ value: j.slug, label: j.title })),
  { value: "spontanee", label: "Candidature spontanée" },
];
const experienceOptions: Option[] = [
  { value: "debutant", label: "Moins de 2 ans" },
  { value: "confirme", label: "2 à 5 ans" },
  { value: "experimente", label: "Plus de 5 ans" },
];

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom complet."),
  phone: z.string().trim().refine(isMoroccanPhone, "Numéro invalide. Exemple : 06 12 34 56 78."),
  email: z.string().trim().email("Adresse email invalide."),
  position: z.string().min(1, "Choisissez un poste."),
  experience: z.string().min(1, "Indiquez votre expérience."),
  message: z
    .string()
    .trim()
    .min(20, "Présentez-vous en quelques lignes (20 caractères minimum).")
    .max(1500),
});
type Values = z.infer<typeof schema>;

/** Spontaneous application, sent as a pre-filled email. */
export function ApplicationForm({ position }: { position?: string | undefined }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      position: position ?? "",
      experience: "",
      message: "",
    },
  });
  const errors = formState.errors;

  const onSubmit = handleSubmit((v) => {
    const text = buildSummary("Je souhaite rejoindre vos équipes :", [
      ["Nom", v.name],
      ["Téléphone", v.phone],
      ["Email", v.email],
      ["Poste visé", labelOf(positionOptions, v.position)],
      ["Expérience", labelOf(experienceOptions, v.experience)],
      ["Présentation", v.message],
    ]).replace(
      "Merci de me recontacter.",
      "Vous trouverez mon CV en pièce jointe.\n\nCordialement.",
    );
    openExternal(mailtoHref(`Candidature — ${labelOf(positionOptions, v.position)}`, text));
    setSent(true);
  });

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-center rounded-[1.5rem] border bg-white px-6 py-14 text-center shadow-[var(--shadow-lift)]"
      >
        <SuccessCheck />
        <h3 className="mt-6 text-2xl font-semibold text-ink">Votre candidature est prête</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Votre messagerie s'est ouverte avec votre candidature. N'oubliez pas de joindre votre CV
          avant l'envoi.
        </p>
        <Btn
          variant="outline"
          className="mt-8"
          iconLeft={<RotateCcw className="size-4" />}
          onClick={() => {
            reset();
            setSent(false);
          }}
        >
          Nouvelle candidature
        </Btn>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label="Candidature"
      className="rounded-[1.5rem] border bg-white p-6 shadow-[var(--shadow-lift)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="a-name" error={errors.name?.message}>
          <TextInput
            id="a-name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </Field>
        <Field label="Téléphone" htmlFor="a-phone" error={errors.phone?.message}>
          <TextInput
            id="a-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>
        <Field
          label="Email"
          htmlFor="a-email"
          error={errors.email?.message}
          className="sm:col-span-2"
        >
          <TextInput
            id="a-email"
            type="email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>
        <Field label="Poste visé" htmlFor="a-position" error={errors.position?.message}>
          <SelectInput
            id="a-position"
            options={positionOptions}
            placeholder="Choisir un poste"
            invalid={Boolean(errors.position)}
            {...register("position")}
          />
        </Field>
        <Field label="Expérience" htmlFor="a-exp" error={errors.experience?.message}>
          <SelectInput
            id="a-exp"
            options={experienceOptions}
            placeholder="Votre expérience"
            invalid={Boolean(errors.experience)}
            {...register("experience")}
          />
        </Field>
        <Field
          label="Présentez-vous"
          htmlFor="a-msg"
          error={errors.message?.message}
          className="sm:col-span-2"
        >
          <TextArea
            id="a-msg"
            rows={5}
            invalid={Boolean(errors.message)}
            placeholder="Votre parcours, vos compétences, vos motivations…"
            {...register("message")}
          />
        </Field>
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Paperclip className="size-4 text-primary" /> Votre messagerie s'ouvrira : pensez à joindre
        votre CV.
      </p>
      <Btn
        type="submit"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        iconLeft={<Mail className="size-5" />}
      >
        Envoyer ma candidature
      </Btn>
    </form>
  );
}
