import { Link } from "@tanstack/react-router";
import { Heart, Menu, Phone, ShoppingBag, User, CalendarDays } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/lib/shop-store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV: { label: string; to: string; hash?: string }[] = [
  { label: "Engagement Rings", to: "/engagement-rings" },
  { label: "Wedding Bands", to: "/wedding-bands" },
  { label: "Fine Jewelry", to: "/fine-jewelry" },
  { label: "Men's", to: "/mens" },
  { label: "Collections", to: "/", hash: "collections" },
  { label: "Ring Builder", to: "/ring-builder" },
  { label: "Our Story", to: "/", hash: "story" },
];

export function Header() {
  const { cartCount, wishlist, setCartOpen, setBookingOpen, hydrated } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="bg-ink text-background">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-[11px] tracking-[0.18em] uppercase sm:px-6">
          <a
            href="tel:+14244214072"
            className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">(424) 421-4072</span>
          </a>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-100"
          >
            <CalendarDays className="size-3.5" aria-hidden />
            Book Virtual Consultation
          </button>
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="hidden items-center gap-2 opacity-90 transition-opacity hover:opacity-100 sm:flex"
            >
              <User className="size-3.5" aria-hidden />
              Account
            </button>
            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
            >
              <Heart className="size-3.5" aria-hidden />
              <span>{hydrated ? wishlist.length : 0}</span>
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
            >
              <ShoppingBag className="size-3.5" aria-hidden />
              <span>{hydrated ? cartCount : 0}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-background">
              <nav className="mt-10 flex flex-col gap-1 px-6">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    {...(item.hash ? { hash: item.hash } : {})}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-border/60 py-4 font-display text-2xl"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="mx-auto lg:mx-0">
            <span className="font-display text-3xl tracking-[0.32em] text-ink uppercase">
              Danhov
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                activeOptions={{ exact: item.to === "/" }}
                className={cn(
                  "wire-underline text-[11px] tracking-[0.18em] text-foreground/75 uppercase transition-colors hover:text-primary",
                )}
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
