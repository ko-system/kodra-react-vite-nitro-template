import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile, type IconTileStyle } from "./IconTile";

export type Feature = {
  icon?: LucideIcon;
  title: string;
  text: string;
  /** Image or illustration, shown by the `alternating` variant. */
  media?: ReactNode;
};

export type FeatureGridVariant =
  | "icon-row"
  | "cards"
  | "list"
  | "numbered"
  | "alternating";

const COLUMN_CLASSES = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * A set of features or benefits.
 * - `icon-row` (default): icon beside the text, in columns.
 * - `cards`: bordered cards with the icon on top.
 * - `list`: a single divided list, title left and text right — dense and quiet.
 * - `numbered`: large numerals instead of icons, for an actual sequence.
 * - `alternating`: zig-zag rows of text and `media`, for 2–4 key features.
 */
export function FeatureGrid({
  items,
  variant = "icon-row",
  iconStyle = "soft",
  columns = 3,
  className,
}: {
  items: Feature[];
  variant?: FeatureGridVariant;
  iconStyle?: IconTileStyle;
  columns?: keyof typeof COLUMN_CLASSES;
  className?: string;
}) {
  const icon = (Icon?: LucideIcon) =>
    Icon && (
      <IconTile variant={iconStyle}>
        <Icon size={21} aria-hidden />
      </IconTile>
    );

  if (variant === "list") {
    return (
      <ul
        className={cn(
          "divide-y divide-border border-y border-border",
          className,
        )}
      >
        {items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-flow"
          >
            <h3 className="flex items-center gap-3 text-foreground">
              {Icon && (
                <Icon size={18} aria-hidden className="shrink-0 text-primary" />
              )}
              {title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "numbered") {
    return (
      <ol className={cn("grid gap-flow", COLUMN_CLASSES[columns], className)}>
        {items.map(({ title, text }, index) => (
          <li key={title} className="border-t-2 border-foreground pt-5">
            <span
              aria-hidden
              className="font-heading text-step-5 font-semibold leading-none text-primary tabular-nums"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </li>
        ))}
      </ol>
    );
  }

  if (variant === "alternating") {
    return (
      <ul className={cn("space-y-section-tight", className)}>
        {items.map(({ icon: Icon, title, text, media }, index) => (
          <li
            key={title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <div className={cn(index % 2 === 1 && "md:order-2")}>
              {icon(Icon)}
              <h3 className="mt-5 text-step-2 text-foreground">{title}</h3>
              <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
            {media && (
              <div className="overflow-hidden rounded-xl border border-border bg-secondary/60">
                {media}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "cards") {
    return (
      <ul className={cn("grid gap-flow", COLUMN_CLASSES[columns], className)}>
        {items.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="rounded-2xl border border-border bg-card p-card"
          >
            {icon(Icon)}
            <h3 className={cn("text-lg text-foreground", Icon && "mt-5")}>
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn("grid gap-8 md:gap-10", COLUMN_CLASSES[columns], className)}
    >
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex gap-4">
          {icon(Icon)}
          <div>
            <h3 className="text-foreground">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
