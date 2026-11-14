import type { Config } from "tailwindcss";

/*
 * Maps the Tailwind theme onto the design tokens in src/globals.css (the
 * block between the kodra:design-tokens markers). Nothing here is
 * app-specific: to change how the app looks, change the tokens, not this file.
 * Every var() carries a neutral fallback so the utilities still resolve in an
 * app whose token block predates a variable.
 */

const FONT_FALLBACK =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans Thai", sans-serif';

/** Modular type scale: step n is 1rem × --type-scale^n. */
const step = (n: number) =>
  n === 0 ? "1rem" : `calc(1rem${" * var(--type-scale, 1.25)".repeat(n)})`;

/** Spacing that grows or shrinks with the --density multiplier. */
const dense = (rem: number) => `calc(${rem}rem * var(--density, 1))`;

const SECTION_Y = "var(--section-y, 4.5rem)";

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(--font-body, ${FONT_FALLBACK})`],
        body: [`var(--font-body, ${FONT_FALLBACK})`],
        heading: [`var(--font-heading, ${FONT_FALLBACK})`],
        mono: [
          "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)",
        ],
      },
      fontSize: {
        "step-0": step(0),
        "step-1": step(1),
        "step-2": step(2),
        "step-3": step(3),
        "step-4": step(4),
        "step-5": step(5),
        "step-6": step(6),
        // Oversized display type for editorial heroes and statements.
        display: [
          `var(--text-display, clamp(2.75rem, 7.5vw, ${step(7)}))`,
          { lineHeight: "1.05" },
        ],
      },
      colors: {
        accent2: {
          DEFAULT: "hsl(var(--accent2))",
          foreground: "hsl(var(--accent2-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.375rem)",
        lg: "var(--radius-lg, var(--radius, 0.5rem))",
        xl: "var(--radius-xl, 0.75rem)",
        "2xl": "var(--radius-2xl, calc(var(--radius-xl, 0.75rem) * 1.5))",
        "3xl":
          "calc(var(--radius-2xl, calc(var(--radius-xl, 0.75rem) * 1.5)) * 1.333)",
        // Buttons and pills: 9999px in pill-shaped directions.
        button: "var(--radius-button, var(--radius-md, 0.375rem))",
      },
      boxShadow: {
        soft: "var(--shadow-soft, 0 1px 2px hsl(0 0% 0% / 0.05))",
        card: "var(--shadow-card, 0 4px 16px -8px hsl(0 0% 0% / 0.1))",
        pop: "var(--shadow-pop, 0 12px 32px -8px hsl(0 0% 0% / 0.2))",
      },
      spacing: {
        // Vertical section rhythm: py-section, pt-section-tight, …
        section: SECTION_Y,
        "section-tight": `calc(${SECTION_Y} * 0.6)`,
        "section-airy": `calc(${SECTION_Y} * 1.5)`,
        // Horizontal page gutter, card padding and grid gaps follow --density.
        gutter: dense(1.25),
        card: dense(1.5),
        flow: `var(--space-gap, ${dense(1.5)})`,
        gap: `var(--space-gap, ${dense(1.5)})`,
      },
      maxWidth: {
        container: "var(--container-max, 80rem)",
        "container-narrow": "min(48rem, var(--container-max, 80rem))",
        "container-wide": "calc(var(--container-max, 80rem) + 12rem)",
      },
      height: { control: "var(--control-height, 2.5rem)" },
      borderWidth: { DEFAULT: "var(--border-width, 1px)" },
      transitionDuration: { DEFAULT: "var(--motion-duration, 150ms)" },
      transitionTimingFunction: {
        DEFAULT: "var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1))",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
      },
    },
  },
} satisfies Partial<Config>;
