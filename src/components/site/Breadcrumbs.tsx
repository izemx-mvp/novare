import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/site/AppLink";

export function Breadcrumbs({
  items,
  dark = true,
  className,
}: {
  items: Crumb[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={item.href}>
              <li>
                {last ? (
                  <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                    {item.label}
                  </span>
                ) : (
                  <AppLink
                    href={item.href}
                    className={cn(
                      "transition-colors",
                      dark
                        ? "text-steel-300 hover:text-white"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {item.label}
                  </AppLink>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className={dark ? "text-steel-500" : "text-steel-300"}>
                  <ChevronRight className="size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
