import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ComponentType, Ref } from "react";

// Data-driven internal links (paths come from typed config/data modules as plain strings).
// TanStack's typed `to` cannot express those, so we route them through a loosely typed Link.
const LooseLink = Link as unknown as ComponentType<Record<string, unknown>>;

export type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  search?: Record<string, string> | undefined;
  hash?: string | undefined;
  activeClassName?: string | undefined;
  exact?: boolean | undefined;
  ref?: Ref<HTMLAnchorElement> | undefined;
};

export function AppLink({
  href,
  search,
  hash,
  activeClassName,
  exact = false,
  ...rest
}: AppLinkProps) {
  const props: Record<string, unknown> = { to: href, preload: "intent", ...rest };
  if (search) props["search"] = search;
  if (hash) props["hash"] = hash;
  if (activeClassName) {
    props["activeProps"] = { className: activeClassName, "aria-current": "page" };
    props["activeOptions"] = { exact };
  }
  return <LooseLink {...props} />;
}
