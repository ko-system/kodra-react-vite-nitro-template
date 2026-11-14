import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IconTile, type IconTileStyle } from "./IconTile";
import { Reveal } from "./Reveal";

export type BentoItem = {
  title: string;
  text: string;
  icon?: LucideIcon;
  /** A screenshot, chart or illustration shown under the text. */
  media?: ReactNode;
  /** "wide" spans two columns, "tall" two rows, "large" both. */
  size?: "default" | "wide" | "tall" | "large";
  href?: string;
};

const SIZE_CLASSES: Record<NonNullable<BentoItem["size"]>, string> = {
  default: "",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  large: "md:col-span-2 md:row-span-2",
};

/**
 * Asymmetric feature grid on three columns. Give the most important item
 * `size="large"` or "wide" so the layout has a clear focal point, and pick
 * sizes that fill every row (e.g. large + 2 default, then wide + default) so
 * no empty cell is left at the end.
 */
export function BentoGrid({
  items,
  iconStyle = "soft",
  className,
}: {
  items: BentoItem[];
  iconStyle?: IconTileStyle;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4 md:auto-rows-[minmax(12rem,auto)] md:grid-cols-3",
        className,
      )}
    >
      {items.map(({ title, text, icon: Icon, media, size, href }, index) => {
        const body = (
          <>
            {Icon && (
              <IconTile
                variant={iconStyle}
                className={cn(
                  iconStyle === "soft" &&
                    "group-hover:bg-primary group-hover:text-primary-foreground",
                )}
              >
                <Icon size={21} aria-hidden />
              </IconTile>
            )}
            <h3 className="mt-5 text-lg text-foreground">{title}</h3>
            <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
            {media && (
              <div className="mt-6 flex-1 overflow-hidden rounded-xl border border-border bg-secondary/60">
                {media}
              </div>
            )}
          </>
        );
        const styles =
          "group flex h-full flex-col rounded-2xl border border-border bg-card p-card transition duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
        return (
          <Reveal
            as="li"
            key={title}
            delay={index * 70}
            className={SIZE_CLASSES[size ?? "default"]}
          >
            {href ? (
              <Link to={href} className={styles}>
                {body}
              </Link>
            ) : (
              <div className={styles}>{body}</div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
