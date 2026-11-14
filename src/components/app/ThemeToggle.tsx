import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch for the header. Only add it when the `.dark` tokens in
 * globals.css have been derived from the app's palette.
 */
export function ThemeToggle({
  label = "Toggle dark mode",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Sun
        size={18}
        aria-hidden
        className="rotate-0 scale-100 transition duration-300 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        size={18}
        aria-hidden
        className="absolute rotate-90 scale-0 transition duration-300 dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}
