import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";
import { cn } from "@/lib/utils";

export function FAQAccordion({
  faqs,
  className,
  defaultOpen = true,
}: {
  faqs: Faq[];
  className?: string;
  defaultOpen?: boolean;
}) {
  const first = faqs[0];
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      {...(defaultOpen && first ? { defaultValue: first.question } : {})}
      className={cn(
        "divide-y divide-navy/10 rounded-[1.25rem] border bg-white px-5 shadow-[var(--shadow-soft)] sm:px-8",
        className,
      )}
    >
      {faqs.map((faq) => (
        <AccordionPrimitive.Item key={faq.question} value={faq.question}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-base font-semibold text-ink transition-colors hover:text-primary sm:text-lg">
              {faq.question}
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-navy/10 text-primary transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white">
                <Plus className="size-4" />
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-3xl pb-6 pr-12 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
