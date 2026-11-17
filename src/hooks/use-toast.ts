/*
 * Compatibility shim for the old shadcn/ui `useToast()` API. Toasts are
 * rendered by Sonner (`<Toaster />` from `@/components/ui/sonner`, already in
 * src/App.tsx); prefer `import { toast } from "sonner"` in new code.
 */
import type * as React from "react";
import { toast as sonner } from "sonner";

type ToastInput = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  action?: { label: React.ReactNode; onClick: () => void };
};

function toast({ title, description, variant, duration, action }: ToastInput) {
  const show = variant === "destructive" ? sonner.error : sonner;
  const id = show(title ?? description, {
    description: title ? description : undefined,
    duration,
    action,
  });
  return {
    id: String(id),
    dismiss: () => sonner.dismiss(id),
    update: (next: ToastInput) =>
      sonner(next.title ?? next.description, {
        id,
        description: next.title ? next.description : undefined,
      }),
  };
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => sonner.dismiss(toastId),
    toasts: [] as never[],
  };
}

export { useToast, toast };
