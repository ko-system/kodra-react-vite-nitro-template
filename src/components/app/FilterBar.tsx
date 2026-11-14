import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FilterBar({
  children,
  summary,
  actions,
  className,
}: {
  children: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid gap-2 rounded-2xl border border-border bg-card p-3 md:grid-cols-2 lg:flex lg:items-center">
        {children}
      </div>
      {(summary || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <p aria-live="polite">{summary}</p>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}
    </div>
  );
}
