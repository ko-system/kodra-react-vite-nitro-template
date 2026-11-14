import type { ReactNode } from "react";
import { Info, CircleCheck, TriangleAlert, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  info: {
    className: "border-border bg-accent/70 text-accent-foreground",
    Icon: Info,
  },
  success: {
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
    Icon: CircleCheck,
  },
  warning: {
    className: "border-amber-200 bg-amber-50 text-amber-900",
    Icon: TriangleAlert,
  },
  danger: {
    className: "border-red-200 bg-red-50 text-red-900",
    Icon: CircleAlert,
  },
} as const;

export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const { className: toneClass, Icon } = tones[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "note"}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        toneClass,
        className,
      )}
    >
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(title && "mt-1")}>{children}</div>
      </div>
    </div>
  );
}
