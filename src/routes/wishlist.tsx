import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

const title = "Wishlist — DANHOV";
const description = "The Danhov pieces you've saved, kept on this device for your next visit.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, hydrated } = useShop();
  const saved = wishlist.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow text-primary">Saved Pieces</p>
      <h1 className="mt-4 font-display text-5xl">Your Wishlist</h1>

      {!hydrated ? null : saved.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl">Nothing saved yet</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Tap the heart on any piece to keep it here.
          </p>
          <Button asChild className="mt-8 rounded-none px-8 py-6 tracking-[0.2em] uppercase">
            <Link to="/engagement-rings">Explore Engagement Rings</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
