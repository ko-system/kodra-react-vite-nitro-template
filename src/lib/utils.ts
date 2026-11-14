import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the design-preset utilities. Without this it reads
// `text-step-4` as a text color and drops it next to `text-foreground`.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        "section",
        "section-tight",
        "section-airy",
        "gutter",
        "card",
        "flow",
        "gap",
      ],
    },
    classGroups: {
      "font-size": [
        {
          text: [
            "step-0",
            "step-1",
            "step-2",
            "step-3",
            "step-4",
            "step-5",
            "step-6",
            "display",
          ],
        },
      ],
      "font-family": [{ font: ["heading", "body"] }],
      shadow: [{ shadow: ["soft", "card", "pop"] }],
      rounded: [{ rounded: ["button"] }],
      h: [{ h: ["control"] }],
      "max-w": [
        { "max-w": ["container", "container-narrow", "container-wide"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
