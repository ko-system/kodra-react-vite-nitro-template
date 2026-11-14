import { cn } from "@/lib/utils";

export type SectionDividerVariant =
  | "wave"
  | "slant"
  | "curve"
  | "zigzag"
  | "line"
  | "none";

const PATHS: Record<Exclude<SectionDividerVariant, "line" | "none">, string> = {
  wave: "M0 48 C 240 96 480 0 720 40 C 960 80 1200 16 1440 48 L1440 96 L0 96 Z",
  slant: "M0 96 L1440 0 L1440 96 Z",
  curve: "M0 96 Q 720 -32 1440 96 Z",
  zigzag:
    "M0 96 L0 48 L120 80 L240 48 L360 80 L480 48 L600 80 L720 48 L840 80 L960 48 L1080 80 L1200 48 L1320 80 L1440 48 L1440 96 Z",
};

/**
 * A decorative edge between two sections. The shape is filled with the
 * current text color, so set it to the background of the section that comes
 * next (e.g. `className="text-secondary"` before a muted section), or use
 * `flip` to hang it from the bottom of the section above.
 */
export function SectionDivider({
  variant = "wave",
  flip = false,
  className,
}: {
  variant?: SectionDividerVariant;
  /** Turns the shape upside down to cap the section above instead. */
  flip?: boolean;
  className?: string;
}) {
  if (variant === "none") return null;

  if (variant === "line") {
    return (
      <div
        aria-hidden
        className={cn("mx-auto max-w-container px-gutter", className)}
      >
        <hr className="border-t border-current opacity-20" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none -mb-px leading-[0] text-background",
        flip && "-mt-px mb-0 rotate-180",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-16"
        focusable="false"
      >
        <path d={PATHS[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
