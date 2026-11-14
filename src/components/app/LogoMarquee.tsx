import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MarqueeItem = { name: string; logo?: ReactNode };

/**
 * Slowly scrolling row of partner or customer names. Only for real
 * organizations the owner named. Pauses on hover; static under reduced motion.
 */
export function LogoMarquee({
  items,
  label,
  className,
}: {
  items: MarqueeItem[];
  label?: string;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        "flex shrink-0 items-center gap-12 pr-12",
        hidden && "motion-reduce:hidden",
      )}
    >
      {items.map(({ name, logo }) => (
        <li
          key={name}
          className="flex items-center gap-2.5 whitespace-nowrap text-lg font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          {logo}
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("py-10", className)}>
      {label && (
        <p className="mb-6 text-center text-sm text-muted-foreground">
          {label}
        </p>
      )}
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
