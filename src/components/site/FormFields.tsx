import { Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import type { Option } from "@/lib/quote";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink placeholder:text-steel-400 shadow-[0_1px_2px_rgb(11_29_58/0.04)] transition-[border-color,box-shadow] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10";

export function Field({
  label,
  error,
  hint,
  htmlFor,
  optional,
  children,
  className,
}: {
  label: string;
  error?: string | undefined;
  hint?: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted-foreground">(optionnel)</span>}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(function TextInput({ className, invalid, ...props }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(control, "h-12", className)}
      {...props}
    />
  );
});

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(function TextArea({ className, invalid, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(control, "min-h-28 resize-y py-3", className)}
      {...props}
    />
  );
});

export const SelectInput = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    invalid?: boolean;
    options: Option[];
    placeholder?: string;
  }
>(function SelectInput({ className, invalid, options, placeholder, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(control, "h-12 appearance-none pr-10", className)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-steel" />
    </div>
  );
});

/** Accessible pill radio group (native radios, arrow-key navigation). */
export function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = "auto",
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  columns?: "auto" | "2" | "3";
}) {
  const id = useId();
  return (
    <fieldset className="flex flex-col gap-3" aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="mb-3 text-sm font-semibold text-ink">{legend}</legend>
      <div
        className={cn(
          "grid gap-2.5",
          columns === "2"
            ? "sm:grid-cols-2"
            : columns === "3"
              ? "grid-cols-2 sm:grid-cols-3"
              : "grid-cols-2 sm:flex sm:flex-wrap",
        )}
      >
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/25",
                checked
                  ? "border-primary bg-primary-50 text-primary-700 shadow-[0_0_0_1px_var(--primary-500)]"
                  : "bg-white text-ink hover:border-primary/40",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                  checked ? "border-primary bg-primary text-white" : "border-navy/20",
                )}
              >
                {checked && <Check className="size-3" strokeWidth={3} />}
              </span>
              {option.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/** Animated success check. */
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 88 88" className="size-24" aria-hidden="true">
      <motion.circle
        cx="44"
        cy="44"
        r="40"
        fill="none"
        stroke="#16a34a"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      <motion.circle
        cx="44"
        cy="44"
        r="40"
        fill="#16a34a"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 0.4 }}
      />
      <motion.path
        d="M27 45l11 11 23-24"
        fill="none"
        stroke="#16a34a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
      />
    </svg>
  );
}
