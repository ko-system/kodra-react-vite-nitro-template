/*
 * Compatibility shim for the old shadcn/ui toaster. `useToast()` and `toast()`
 * now render through Sonner, so this component draws nothing: keep the Sonner
 * `<Toaster />` from `@/components/ui/sonner` mounted (src/App.tsx already has
 * it). It exists so App files written for the old scaffold still build.
 */
export function Toaster() {
  return null;
}
