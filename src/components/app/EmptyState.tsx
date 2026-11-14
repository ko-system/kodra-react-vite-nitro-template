import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border bg-card/70 px-6 py-14 text-center",
        className,
      )}
    >
      {icon && (
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-primary">
          {icon}
        </span>
      )}
      <h3 className="mt-4 text-base text-foreground">{title}</h3>
      {description && (
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
