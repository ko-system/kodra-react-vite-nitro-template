import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        )}
        <h2 className="mt-1.5 text-2xl text-foreground md:text-3xl">{title}</h2>
      </div>
      {action && <div className="shrink-0 text-sm font-medium">{action}</div>}
    </div>
  );
}
