import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeroVariant =
  | "split"
  | "centered"
  | "full-bleed-media"
  | "editorial"
  | "collage"
  | "minimal-statement";

export type HeroImage = { src: string; alt: string };

/**
 * The page's opening. Pick the variant from the app's subject instead of
 * always using the default:
 * - `split` (default): copy beside `media` on a muted band.
 * - `centered`: centered copy, `media` full width underneath.
 * - `full-bleed-media`: `images[0]` (or `media`) fills the hero behind the copy.
 * - `editorial`: oversized display type in an asymmetric grid, `media` offset below.
 * - `collage`: copy beside 2–4 `images` arranged as an overlapping collage.
 * - `minimal-statement`: one large statement and lots of space, no media.
 */
export function Hero({
  title,
  description,
  badge,
  actions,
  media,
  images,
  variant = "split",
  children,
  className,
}: {
  title: ReactNode;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  /** Photos for `full-bleed-media` (first image) and `collage` (2–4 images). */
  images?: HeroImage[];
  variant?: HeroVariant;
  children?: ReactNode;
  className?: string;
}) {
  const badgeEl = badge && (
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-accent-foreground">
      {badge}
    </p>
  );
  const actionsEl = (centered = false) =>
    actions && (
      <div
        className={cn(
          "mt-7 flex flex-wrap items-center gap-3",
          centered && "justify-center",
        )}
      >
        {actions}
      </div>
    );

  if (variant === "centered") {
    return (
      <section className={cn("border-b border-border", className)}>
        <div className="mx-auto max-w-container px-gutter py-section text-center">
          <div className="mx-auto max-w-3xl">
            {badgeEl}
            <h1 className="mt-5 text-step-4 leading-[1.15] text-foreground sm:text-step-5 lg:text-step-6">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            {actionsEl(true)}
          </div>
          {children && (
            <div className="mx-auto mt-10 max-w-3xl">{children}</div>
          )}
          {media && <div className="mt-12 text-left">{media}</div>}
        </div>
      </section>
    );
  }

  if (variant === "full-bleed-media") {
    const backdrop = images?.[0];
    return (
      <section
        className={cn(
          "dark relative isolate flex min-h-[78svh] items-end overflow-hidden text-foreground",
          className,
        )}
      >
        {backdrop ? (
          <img
            src={backdrop.src}
            alt={backdrop.alt}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        ) : (
          media && (
            <div className="absolute inset-0 -z-20 [&>*]:h-full [&>*]:w-full [&>*]:object-cover">
              {media}
            </div>
          )
        )}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/10"
        />
        <div className="mx-auto w-full max-w-container px-gutter pb-section pt-40">
          <div className="max-w-3xl">
            {badgeEl}
            <h1 className="mt-5 text-step-4 leading-[1.1] text-foreground sm:text-step-5 lg:text-step-6">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/85">
                {description}
              </p>
            )}
            {actionsEl()}
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "editorial") {
    return (
      <section className={cn("overflow-hidden", className)}>
        <div className="mx-auto max-w-container-wide px-gutter pb-section-tight pt-section">
          {badgeEl && <div className="mb-8">{badgeEl}</div>}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="text-display leading-[1.02] text-foreground lg:col-span-8">
              {title}
            </h1>
            <div className="lg:col-span-4 lg:pb-3">
              {description && (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}
              {actionsEl()}
            </div>
          </div>
          {children && <div className="mt-10">{children}</div>}
          {media && (
            <div className="mt-12 border-t border-border pt-8 lg:ml-[16.666%]">
              {media}
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "collage") {
    const shots = (images ?? []).slice(0, 4);
    const placements = [
      "col-span-4 row-span-4 col-start-1 row-start-1",
      "col-span-3 row-span-3 col-start-4 row-start-3 z-10 ring-8 ring-background",
      "col-span-2 row-span-2 col-start-5 row-start-1",
      "col-span-2 row-span-2 col-start-1 row-start-5",
    ];
    return (
      <section className={cn("overflow-hidden", className)}>
        <div className="mx-auto grid max-w-container items-center gap-12 px-gutter py-section lg:grid-cols-2">
          <div>
            {badgeEl}
            <h1 className="mt-5 text-step-4 leading-[1.15] text-foreground sm:text-step-5">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            {actionsEl()}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {shots.length > 0 ? (
            <div className="grid aspect-square grid-cols-6 grid-rows-6 gap-3">
              {shots.map((image, index) => (
                <img
                  key={`${image.src}-${index}`}
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "h-full w-full rounded-xl object-cover shadow-card",
                    placements[index],
                  )}
                />
              ))}
            </div>
          ) : (
            media && <div>{media}</div>
          )}
        </div>
      </section>
    );
  }

  if (variant === "minimal-statement") {
    return (
      <section className={cn(className)}>
        <div className="mx-auto max-w-container px-gutter py-section-airy">
          {badgeEl && <div className="mb-10">{badgeEl}</div>}
          <h1 className="max-w-5xl text-step-5 font-medium leading-[1.12] text-foreground lg:text-display">
            {title}
          </h1>
          {(description || actions) && (
            <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-start md:justify-between">
              {description && (
                <p className="max-w-md leading-relaxed text-muted-foreground">
                  {description}
                </p>
              )}
              {actions && (
                <div className="flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("border-b border-border bg-secondary/60", className)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-container items-center gap-10 px-gutter pb-12 pt-12 lg:pb-16 lg:pt-16",
          media && "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14",
        )}
      >
        <div>
          {badgeEl}
          <h1 className="mt-5 text-step-4 leading-[1.2] text-foreground sm:text-step-5 lg:text-step-6">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
          {actionsEl()}
        </div>
        {media && <div>{media}</div>}
        {children && (
          <div className={cn(media && "lg:col-span-2")}>{children}</div>
        )}
      </div>
    </section>
  );
}
