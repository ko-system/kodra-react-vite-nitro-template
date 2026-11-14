import { cn } from "@/lib/utils";
import type { Feature } from "./FeatureGrid";
import { IconTile, type IconTileStyle } from "./IconTile";

/**
 * A real sequence of steps. `variant="timeline"` stacks them on a vertical
 * line, which reads better for long or detailed steps than the card row.
 */
export function StepList({
  items,
  variant = "cards",
  iconStyle = "filled",
  className,
}: {
  items: Feature[];
  variant?: "cards" | "timeline";
  iconStyle?: IconTileStyle;
  className?: string;
}) {
  if (variant === "timeline") {
    return (
      <ol
        className={cn(
          "relative space-y-10 border-l border-border pl-8",
          className,
        )}
      >
        {items.map(({ title, text }, index) => (
          <li key={title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[calc(2rem+0.875rem+0.5px)] top-0 grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-xs font-semibold text-foreground tabular-nums"
            >
              {index + 1}
            </span>
            <h3 className="text-lg text-foreground">{title}</h3>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {text}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("grid gap-flow md:grid-cols-3", className)}>
      {items.map(({ icon: Icon, title, text }, index) => (
        <li
          key={title}
          className="rounded-2xl border border-border bg-card p-card"
        >
          <div className="flex items-center justify-between">
            {Icon && (
              <IconTile variant={iconStyle}>
                <Icon size={21} aria-hidden />
              </IconTile>
            )}
            <span
              className="ml-auto text-4xl font-semibold text-border"
              aria-hidden
            >
              {index + 1}
            </span>
          </div>
          <h3 className="mt-5 text-lg text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {text}
          </p>
        </li>
      ))}
    </ol>
  );
}
