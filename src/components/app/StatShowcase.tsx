import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export type Stat = {
  /** A number animates into place with CountUp; text (e.g. "24/7") is shown as is. */
  value: number | string;
  label: string;
  detail?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

/**
 * Big numbers as a typographic moment, not a row of cards. Only for real
 * figures the owner gave you — never invent statistics.
 * - `row` (default): numbers side by side, separated by thin rules.
 * - `grid`: a ruled 2×2 (or 2×3) grid for four to six figures.
 * - `spotlight`: the first figure oversized, the rest listed beside it.
 */
export function StatShowcase({
  items,
  variant = "row",
  locale,
  className,
}: {
  items: Stat[];
  variant?: "row" | "grid" | "spotlight";
  locale?: string;
  className?: string;
}) {
  const value = (stat: Stat, size: string): ReactNode => (
    <span
      className={cn(
        "block font-heading font-semibold leading-none tracking-tight text-foreground",
        size,
      )}
    >
      {typeof stat.value === "number" ? (
        <CountUp
          value={stat.value}
          prefix={stat.prefix}
          suffix={stat.suffix}
          decimals={stat.decimals}
          locale={locale}
        />
      ) : (
        `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`
      )}
    </span>
  );
  const caption = (stat: Stat) => (
    <>
      <span className="mt-3 block font-medium text-foreground">
        {stat.label}
      </span>
      {stat.detail && (
        <span className="mt-1 block text-sm text-muted-foreground">
          {stat.detail}
        </span>
      )}
    </>
  );

  if (variant === "spotlight") {
    const [lead, ...rest] = items;
    if (!lead) return null;
    return (
      <Reveal
        className={cn(
          "grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end",
          className,
        )}
      >
        <p>
          {value(lead, "text-display")}
          {caption(lead)}
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {rest.map((stat) => (
            <li key={stat.label} className="py-5">
              {value(stat, "text-step-3")}
              {caption(stat)}
            </li>
          ))}
        </ul>
      </Reveal>
    );
  }

  return (
    <ul
      className={cn(
        variant === "grid"
          ? "grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3"
          : "grid gap-y-10 sm:grid-cols-2 md:flex md:divide-x md:divide-border",
        className,
      )}
    >
      {items.map((stat, index) => (
        <Reveal
          as="li"
          key={stat.label}
          delay={index * 80}
          className={cn(
            variant === "grid"
              ? "border-b border-r border-border p-card"
              : "md:flex-1 md:px-8 md:first:pl-0 md:last:pr-0",
          )}
        >
          {value(stat, variant === "grid" ? "text-step-4" : "text-step-5")}
          {caption(stat)}
        </Reveal>
      ))}
    </ul>
  );
}
