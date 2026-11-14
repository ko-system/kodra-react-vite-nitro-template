import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  primary: "bg-primary text-primary-foreground",
  inverted: "bg-foreground text-background",
  accent: "bg-accent2 text-accent2-foreground",
  plain: "border-y border-border text-foreground",
} as const;

/**
 * A slow, full-width band of large words (services, places, values) that
 * scrolls sideways. One per page at most. Pauses on hover; under reduced
 * motion it becomes a static, wrapped row. Not for logos — use LogoMarquee.
 */
export function Marquee({
  items,
  label,
  tone = "primary",
  reverse = false,
  separator,
  duration = 45,
  className,
}: {
  items: string[];
  /** Accessible name for the list, in the app's language. */
  label?: string;
  tone?: keyof typeof TONE_CLASSES;
  reverse?: boolean;
  /** Drawn between items. Defaults to a small diamond. */
  separator?: ReactNode;
  /** Seconds for one full loop; higher is slower. */
  duration?: number;
  className?: string;
}) {
  const mark = separator ?? (
    <span className="inline-block h-2.5 w-2.5 rotate-45 bg-current opacity-60" />
  );
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10",
        hidden && "motion-reduce:hidden",
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-heading text-step-3 font-semibold md:text-step-4">
            {item}
          </span>
          <span aria-hidden>{mark}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group overflow-hidden py-5 md:py-6",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <div
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        className={cn(
          "flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
