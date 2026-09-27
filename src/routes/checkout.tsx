import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BagLineInfo } from "@/components/site/BagLineInfo";
import { formatPrice } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — DANHOV" },
      { name: "description", content: "Review your DANHOV pieces and custom rings, then place your order." },
      { property: "og:title", content: "Checkout — DANHOV" },
      { property: "og:description", content: "Review your selection and place your order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { detailedCart, subtotal, clearCart, hydrated } = useShop();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="eyebrow text-primary">Thank you</p>
        <h1 className="mt-3 font-display text-4xl">Your order is received</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          A DANHOV advisor will contact you within one business day to confirm every detail before
          our Los Angeles atelier begins crafting.
        </p>
        <Button asChild className="mt-8 rounded-none tracking-[0.2em] uppercase">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    );
  }

  if (hydrated && detailedCart.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <Button asChild variant="outline" className="mt-8 rounded-none tracking-[0.2em] uppercase">
          <Link to="/ring-builder">Design a ring</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearCart();
          setPlaced(true);
          toast.success("Order placed");
        }}
        className="space-y-5"
      >
        <h1 className="font-display text-4xl">Checkout</h1>
        <p className="eyebrow text-muted-foreground">Contact & delivery</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input required placeholder="First name" className="rounded-none" />
          <Input required placeholder="Last name" className="rounded-none" />
          <Input required type="email" placeholder="Email" className="rounded-none sm:col-span-2" />
          <Input required placeholder="Phone" className="rounded-none sm:col-span-2" />
          <Input required placeholder="Address" className="rounded-none sm:col-span-2" />
          <Input required placeholder="City" className="rounded-none" />
          <Input required placeholder="ZIP" className="rounded-none" />
        </div>
        <p className="text-xs text-muted-foreground">
          Payment is taken after an advisor confirms your order. No card is charged today.
        </p>
        <Button type="submit" className="w-full rounded-none py-6 tracking-[0.2em] uppercase">
          Place order · {formatPrice(subtotal)}
        </Button>
      </form>

      <aside className="h-fit border border-border bg-linen p-6">
        <p className="eyebrow text-muted-foreground">Your selection</p>
        <ul className="mt-5 space-y-6">
          {detailedCart.map(({ line, product }, i) => (
            <li key={i} className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                width={1008}
                height={1008}
                className="size-20 shrink-0 bg-background object-cover"
              />
              <div className="min-w-0 flex-1">
                <BagLineInfo line={line} product={product} />
                <p className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Qty {line.quantity}</span>
                  <span>{formatPrice(product.price * line.quantity)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
          <span className="eyebrow text-muted-foreground">Total</span>
          <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Complimentary insured overnight shipping.</p>
      </aside>
    </div>
  );
}
