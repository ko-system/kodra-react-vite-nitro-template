import { cn } from "@/lib/utils";

const tones = {
  success: "bg-emerald-50 text-emerald-800",
  warning: "bg-amber-50 text-amber-900",
  danger: "bg-red-50 text-red-800",
  info: "bg-accent text-accent-foreground",
  neutral: "bg-secondary text-secondary-foreground",
} as const;

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: keyof typeof tones;
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
