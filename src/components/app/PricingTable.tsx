import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type PricingPlan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  /** The plan's button, e.g. <Button asChild><Link to="/signup">…</Link></Button>. */
  cta: ReactNode;
  /** Exactly one plan should be highlighted, at most. */
  highlighted?: boolean;
  badge?: string;
};

/** Side-by-side plans. Only with real prices the owner provided. */
export function PricingTable({
  plans,
  className,
}: {
  plans: PricingPlan[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid items-stretch gap-5 md:grid-cols-2",
        plans.length >= 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {plans.map((plan, index) => (
        <Reveal as="li" key={plan.name} delay={index * 90}>
          <div
            className={cn(
              "relative flex h-full flex-col rounded-2xl border bg-card p-7 transition duration-300 hover:-translate-y-0.5",
              plan.highlighted
                ? "border-primary shadow-card ring-1 ring-primary"
                : "border-border hover:border-primary/30",
            )}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {plan.badge}
              </span>
            )}
            <h3 className="text-lg text-foreground">{plan.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              )}
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-foreground">
                  <Check
                    size={17}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 [&>*]:w-full">{plan.cta}</div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
