import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";
import { Magnetic } from "@/components/site/Magnetic";

type Variant = "primary" | "light" | "outline" | "white" | "ghost" | "ghostLight";
type Size = "sm" | "md" | "lg" | "xl";

const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-tight whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-500";

const variants: Record<Variant, string> = {
  primary:
    "btn-sheen bg-brand-gradient text-white shadow-[0_10px_30px_-10px_rgb(0_120_190/0.7)] hover:shadow-[0_16px_40px_-12px_rgb(0_120_190/0.85)]",
  light:
    "border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10",
  outline: "border border-navy/15 bg-white text-navy hover:border-primary hover:text-primary",
  white:
    "btn-sheen bg-white text-navy shadow-[0_10px_30px_-12px_rgb(0_0_0/0.4)] hover:text-primary",
  ghost: "text-navy hover:text-primary",
  ghostLight: "text-white/80 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
  xl: "h-16 px-8 text-lg",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string | undefined;
  children: ReactNode;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  magnetic?: boolean;
  "aria-label"?: string;
};

type LinkButton = Common & {
  href: string;
  search?: Record<string, string> | undefined;
  external?: boolean;
  onClick?: () => void;
};

type ActionButton = Common & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export type BtnProps = LinkButton | ActionButton;

export function Btn(props: BtnProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    icon,
    iconLeft,
    magnetic = false,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      <span>{children}</span>
      {icon && (
        <span className="flex items-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  let element: ReactNode;
  if (props.href !== undefined) {
    const isInternal = props.href.startsWith("/") && !props.external;
    element = isInternal ? (
      <AppLink
        href={props.href}
        search={props.search}
        className={classes}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
      >
        {inner}
      </AppLink>
    ) : (
      <a
        href={props.href}
        className={classes}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        {...(props.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  } else {
    element = (
      <button
        type={props.type ?? "button"}
        className={classes}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props["aria-label"]}
      >
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
