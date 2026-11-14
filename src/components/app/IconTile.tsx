import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconTileStyle = "soft" | "filled" | "outline" | "none";

const STYLE_CLASSES: Record<IconTileStyle, string> = {
  soft: "bg-accent text-accent-foreground",
  filled: "bg-primary text-primary-foreground",
  outline: "border border-border bg-transparent text-foreground",
  none: "text-primary",
};

const SIZE_CLASSES = {
  sm: "h-9 w-9 [&_svg]:h-[18px] [&_svg]:w-[18px]",
  md: "h-11 w-11 [&_svg]:h-[21px] [&_svg]:w-[21px]",
  lg: "h-14 w-14 [&_svg]:h-6 [&_svg]:w-6",
} as const;

/**
 * The square behind a feature icon. Its corners follow the radius tokens and
 * its fill follows `variant`, so one app can use outline tiles and another
 * bare icons. Purely decorative: the icon inside should be `aria-hidden`.
 */
export function IconTile({
  children,
  variant = "soft",
  size = "md",
  className,
}: {
  children: ReactNode;
  variant?: IconTileStyle;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg transition-colors",
        SIZE_CLASSES[size],
        STYLE_CLASSES[variant],
        variant === "none" && "h-auto w-auto place-items-start",
        className,
      )}
    >
      {children}
    </span>
  );
}
