import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CtaBandVariant = "card" | "band" | "inline" | "split";

/**
 * The closing call to action.
 * - `card` (default): a rounded primary panel inside the page width.
 * - `band`: an edge-to-edge primary strip.
 * - `inline`: no fill; a quiet heading-and-buttons row above a rule.
 * - `split`: large title on one side, description, actions and optional `media` on the other.
 */
export function CtaBand({
  title,
  description,
  actions,
  media,
  variant = "card",
  className,
}: {
  title: string;
  description?: string;
  actions: ReactNode;
  /** Image or illustration for the `split` variant. */
  media?: ReactNode;
  variant?: CtaBandVariant;
  className?: string;
}) {
  if (variant === "band") {
    return (
      <section className={cn("bg-primary text-primary-foreground", className)}>
        <div className="mx-auto flex max-w-container flex-col gap-6 px-gutter py-section-tight md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-step-2 md:text-step-3">{title}</h2>
            {description && (
              <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/80">
                {description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
        </div>
      </section>
    );
  }

  if (variant === "inline") {
    return (
      <section
        className={cn(
          "mx-auto max-w-container px-gutter pb-section",
          className,
        )}
      >
        <div className="flex flex-col gap-5 border-t border-border pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-step-2 text-foreground md:text-step-3">
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section
        className={cn(
          "mx-auto max-w-container px-gutter pb-section",
          className,
        )}
      >
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2">
          <div className="p-card md:p-12">
            <h2 className="text-step-4 leading-tight text-foreground md:text-step-5">
              {title}
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 border-t border-border bg-secondary/60 p-card md:border-l md:border-t-0 md:p-12">
            {media}
            {description && (
              <p className="leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("mx-auto max-w-container px-gutter pb-section", className)}
    >
      <div className="grid items-center gap-6 rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:grid-cols-[1fr_auto] md:px-14">
        <div>
          <h2 className="text-step-2 md:text-step-3">{title}</h2>
          {description && (
            <p className="mt-3 max-w-2xl leading-relaxed text-primary-foreground/80">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
    </section>
  );
}
