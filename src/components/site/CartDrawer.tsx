import { Link } from "@tanstack/react-router";
import { Minus, Plus, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatPrice } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, detailedCart, subtotal, updateQuantity, removeLine, cartCount } =
    useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="font-display text-2xl font-light">
            Your Selection{cartCount > 0 ? ` (${cartCount})` : ""}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {detailedCart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-2xl">Nothing chosen yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Every Danhov piece is made to order in Los Angeles.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-6 rounded-none tracking-[0.18em] uppercase"
                onClick={() => setCartOpen(false)}
              >
                <Link to="/engagement-rings">Explore Rings</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {detailedCart.map(({ line, product }, index) => (
                <li key={`${line.slug}-${line.metal}-${line.size ?? "os"}`} className="flex gap-4">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    onClick={() => setCartOpen(false)}
                    className="shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={1008}
                      height={1008}
                      className="size-24 bg-linen object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/product/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setCartOpen(false)}
                        className="font-display text-lg leading-tight hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeLine(index)}
                        aria-label={`Remove ${product.name}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      {line.metal}
                      {line.size ? ` · Size ${line.size}` : ""}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          className="px-2 py-1 text-muted-foreground hover:text-primary"
                          onClick={() => updateQuantity(index, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          className="px-2 py-1 text-muted-foreground hover:text-primary"
                          onClick={() => updateQuantity(index, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm">{formatPrice(product.price * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
            <Truck className="size-4 text-primary" aria-hidden />
            Complimentary insured FedEx overnight shipping
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="eyebrow text-muted-foreground">Subtotal</span>
            <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Duties and taxes calculated at checkout. 30-day returns.
          </p>
          <Button
            className="mt-5 w-full rounded-none py-6 tracking-[0.2em] uppercase"
            disabled={detailedCart.length === 0}
            onClick={() => toast.success("Secure checkout opens in Phase 2.")}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
