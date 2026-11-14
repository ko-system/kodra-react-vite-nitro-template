import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * True when motion should be skipped: the user asked for reduced motion, the
 * browser cannot observe intersections, or the page is driven by automation
 * (a screenshot of a page whose sections are still invisible is useless).
 */
export function prefersStillness(): boolean {
  return (
    typeof window === "undefined" ||
    typeof IntersectionObserver === "undefined" ||
    navigator.webdriver === true ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Becomes true once, the first time the element scrolls into view. */
export function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersStillness()) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Any visible pixel counts: a ratio threshold would never fire for a
      // group taller than the viewport divided by that ratio.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * Fades and lifts its children in once as they scroll into view. Stagger a
 * group by passing an increasing `delay` (e.g. index * 80).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal={inView ? "in" : "out"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
