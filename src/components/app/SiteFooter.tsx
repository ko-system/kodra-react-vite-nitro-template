import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavItem } from "./SiteHeader";

export function SiteFooter({
  brand,
  description,
  columns,
  note,
  className,
}: {
  brand: ReactNode;
  description?: string;
  columns?: { heading: string; items: NavItem[] }[];
  note?: string;
  className?: string;
}) {
  return (
    <footer className={cn("border-t border-border bg-secondary/50", className)}>
      <div className="mx-auto max-w-container px-gutter py-12">
        <div
          className={cn(
            "grid gap-10",
            columns?.length &&
              "md:grid-cols-[1.2fr_repeat(auto-fit,minmax(140px,1fr))]",
          )}
        >
          <div>
            <p className="font-semibold tracking-tight text-foreground">
              {brand}
            </p>
            {description && (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {columns?.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-sm text-foreground">{col.heading}</h3>
              <ul className="mt-3 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        {note && (
          <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
            {note}
          </p>
        )}
      </div>
    </footer>
  );
}
