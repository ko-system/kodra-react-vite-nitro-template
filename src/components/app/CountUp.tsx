import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { prefersStillness, useInViewOnce } from "./Reveal";

/**
 * Counts from 0 to `value` once it scrolls into view. Only for real numbers
 * the app actually has — never for invented statistics.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale,
  duration = 1400,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersStillness()) {
      setCurrent(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCurrent(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  const format = (n: number) =>
    `${prefix}${new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n)}${suffix}`;

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span aria-hidden>{format(current)}</span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
