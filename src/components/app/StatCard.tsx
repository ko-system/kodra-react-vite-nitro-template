import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "./IconTile";

export function StatCard({
  icon,
  label,
  value,
  hint,
  href,
  className,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  hint?: string;
  href?: string;
  className?: string;
}) {
  const body = (
    <>
      <div className="mb-6 flex items-start justify-between">
        {icon && (
          <IconTile className="group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </IconTile>
        )}
        {href && (
          <ArrowUpRight
            size={18}
            aria-hidden
            className="ml-auto text-muted-foreground/50 transition group-hover:text-primary"
          />
        )}
      </div>
      <p className="text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
    </>
  );
  const styles = cn(
    "block rounded-2xl border border-border bg-card p-card shadow-card",
    href &&
      "group transition hover:-translate-y-0.5 hover:shadow-pop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );
  return href ? (
    <Link to={href} className={styles}>
      {body}
    </Link>
  ) : (
    <div className={styles}>{body}</div>
  );
}
