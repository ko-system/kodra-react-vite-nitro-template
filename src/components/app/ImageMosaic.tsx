import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type MosaicImage = { src: string; alt: string; caption?: string };

// Spans per image count so the four-column grid closes without holes.
const LEAD = "col-span-2 row-span-2";
const MOSAIC_SPANS: Record<number, string[]> = {
  3: [LEAD, "col-span-2", "col-span-2"],
  4: [LEAD, "col-span-2", "", ""],
  5: [LEAD, "", "", "", ""],
  6: [LEAD, "", "", "col-span-2", "col-span-2", "col-span-2"],
};

/**
 * Photos as a composed set instead of a uniform card grid.
 * - `mosaic` (default): an asymmetric grid led by one large image (3–6 images).
 * - `strip`: a horizontal, swipeable row with snap points (any number).
 * - `masonry`: natural aspect ratios in staggered columns.
 * Every image needs real alt text; captions are optional.
 */
export function ImageMosaic({
  images,
  variant = "mosaic",
  className,
}: {
  images: MosaicImage[];
  variant?: "mosaic" | "strip" | "masonry";
  className?: string;
}) {
  const figure = (image: MosaicImage, imgClass: string) => (
    <figure className="group relative h-full overflow-hidden rounded-xl bg-muted">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={cn(
          "w-full object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transform-none",
          imgClass,
        )}
      />
      {image.caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10 text-sm text-white">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );

  if (variant === "strip") {
    return (
      <ul
        className={cn(
          "-mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-4 overflow-x-auto px-gutter pb-4 [scrollbar-width:thin]",
          className,
        )}
      >
        {images.map((image) => (
          <li
            key={image.src}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            {figure(image, "aspect-[4/5] h-full")}
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "masonry") {
    return (
      <ul className={cn("gap-4 sm:columns-2 lg:columns-3", className)}>
        {images.map((image, index) => (
          <Reveal
            as="li"
            key={image.src}
            delay={(index % 3) * 80}
            className="mb-4 break-inside-avoid"
          >
            {figure(image, "h-auto")}
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4",
        className,
      )}
    >
      {images.map((image, index) => (
        <Reveal
          as="li"
          key={image.src}
          delay={index * 70}
          className={
            MOSAIC_SPANS[images.length]?.[index] ?? (index === 0 ? LEAD : "")
          }
        >
          {figure(image, "h-full")}
        </Reveal>
      ))}
    </ul>
  );
}
