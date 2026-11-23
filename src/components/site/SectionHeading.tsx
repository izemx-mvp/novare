import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";

type Props = {
  eyebrow?: string | undefined;
  title: ReactNode;
  body?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string | undefined;
  action?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false,
  align = "left",
  className,
  action,
  as = "h2",
}: Props) {
  const Heading = as;
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "mx-auto items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow", dark && "eyebrow-light")}>{eyebrow}</p>}
        <Heading
          className={cn(
            "mt-4 text-balance text-[2rem] font-semibold leading-[1.08] sm:text-[2.5rem] lg:text-[3.25rem]",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </Heading>
        {body && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-pretty text-base leading-relaxed md:text-lg",
              align === "center" && "mx-auto",
              dark ? "text-steel-200" : "text-muted-foreground",
            )}
          >
            {body}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

/** Gradient emphasis for key words inside headings. */
export function Accent({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-gradient-light" : "text-gradient"}>{children}</span>;
}
