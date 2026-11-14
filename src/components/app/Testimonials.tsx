import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  avatarSrc?: string;
};

/**
 * Quotes in a staggered masonry layout. Only use real quotes the owner
 * provided — never invent people or praise.
 */
export function Testimonials({
  items,
  className,
}: {
  items: Testimonial[];
  className?: string;
}) {
  return (
    <ul className={cn("gap-5 md:columns-2 lg:columns-3", className)}>
      {items.map(({ quote, name, role, avatarSrc }, index) => (
        <Reveal
          as="li"
          key={name + index}
          delay={(index % 3) * 90}
          className="mb-5 break-inside-avoid"
        >
          <figure className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
            <Quote size={22} aria-hidden className="text-primary/70" />
            <blockquote className="mt-4 leading-relaxed text-foreground">
              {quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              ) : (
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-full bg-accent font-semibold text-accent-foreground"
                >
                  {name.charAt(0)}
                </span>
              )}
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {name}
                </span>
                {role && (
                  <span className="block text-sm text-muted-foreground">
                    {role}
                  </span>
                )}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
