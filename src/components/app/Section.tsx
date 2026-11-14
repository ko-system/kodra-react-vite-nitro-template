import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone =
  | "default"
  | "plain"
  | "muted"
  | "inverted"
  | "accent"
  | "image";
export type SectionWidth = "narrow" | "default" | "wide" | "full";
export type SectionSpacing = "none" | "tight" | "default" | "airy";

const TONE_CLASSES: Record<SectionTone, string> = {
  default: "",
  plain: "",
  muted: "border-y border-border bg-secondary/60",
  // A dark-palette band: the `dark` class re-scopes every token inside, so
  // nested blocks keep readable contrast without per-block overrides.
  inverted: "dark bg-background text-foreground [.dark_&]:bg-secondary",
  accent: "bg-accent text-accent-foreground",
  image: "dark relative isolate overflow-hidden text-foreground",
};

const WIDTH_CLASSES: Record<SectionWidth, string> = {
  narrow: "max-w-container-narrow",
  default: "max-w-container",
  wide: "max-w-container-wide",
  full: "max-w-none",
};

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  none: "",
  tight: "py-section-tight",
  default: "py-section",
  airy: "py-section-airy",
};

/**
 * A page band. Vary `tone`, `width` and `spacing` from section to section so
 * the page has rhythm — a stack of identical bands is what makes generated
 * sites look alike. `tone="image"` needs `image`; text sits on a dark scrim.
 * `inverted` re-scopes the tokens to the `.dark` palette; in a dark-default
 * app (tokens with a `.light` block) use `className="light bg-background
 * text-foreground"` on a plain section for the light band instead.
 */
export function Section({
  children,
  tone = "default",
  width = "default",
  spacing = "default",
  image,
  className,
  containerClassName,
  id,
  "aria-labelledby": labelledBy,
}: {
  children: ReactNode;
  tone?: SectionTone;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  /** Background photo for `tone="image"`. Decorative unless `alt` is set. */
  image?: { src: string; alt?: string };
  className?: string;
  containerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(TONE_CLASSES[tone], SPACING_CLASSES[spacing], className)}
    >
      {tone === "image" && image && (
        <>
          <img
            src={image.src}
            alt={image.alt ?? ""}
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-background/75"
          />
        </>
      )}
      <div
        className={cn(
          "mx-auto px-gutter",
          WIDTH_CLASSES[width],
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
