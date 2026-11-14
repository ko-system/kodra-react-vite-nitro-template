import type { ReactNode } from "react";

export function AuthSplit({
  brand,
  title,
  description,
  media,
  mediaTitle,
  children,
  footer,
}: {
  brand: ReactNode;
  title: string;
  description?: string;
  media: { src: string; alt: string };
  mediaTitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img
          src={media.src}
          alt={media.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        {mediaTitle && (
          <h2 className="absolute bottom-16 left-12 right-12 text-4xl leading-tight text-primary-foreground">
            {mediaTitle}
          </h2>
        )}
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-12">{brand}</div>
          <h1 className="text-3xl text-foreground">{title}</h1>
          {description && (
            <p className="mb-6 mt-3 text-muted-foreground">{description}</p>
          )}
          {children}
          {footer && (
            <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
