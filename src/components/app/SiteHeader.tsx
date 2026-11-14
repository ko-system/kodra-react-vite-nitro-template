import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

/** Screen-reader labels; pass them in the app's language. */
export type SiteHeaderLabels = {
  skip: string;
  openMenu: string;
  closeMenu: string;
};

const DEFAULT_LABELS: SiteHeaderLabels = {
  skip: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

export function SiteHeader({
  brand,
  items,
  actions,
  labels = DEFAULT_LABELS,
  className,
}: {
  brand: ReactNode;
  items: NavItem[];
  actions?: ReactNode;
  labels?: SiteHeaderLabels;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur",
        className,
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {labels.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-4 px-gutter">
        <Link
          to="/"
          className="shrink-0 font-semibold tracking-tight text-foreground"
        >
          {brand}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {actions}
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background px-gutter pb-5 pt-3 md:hidden"
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          {actions && (
            <div className="mt-3 flex flex-wrap gap-2">{actions}</div>
          )}
        </nav>
      )}
    </header>
  );
}
