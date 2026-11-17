import { createCn } from "cn/config";

// `cn` joins class names (like clsx) and resolves Tailwind conflicts (like
// tailwind-merge). It is taught the design-token utilities from
// src/globals.css; without this it reads `text-step-4` as a text color and
// drops it next to `text-foreground`.
export const cn = createCn({
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
        "control",
      ],
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
      font: ["heading", "body"],
      shadow: ["soft", "card", "pop"],
      radius: ["button"],
      container: ["container", "container-narrow", "container-wide"],
    },
  },
});
