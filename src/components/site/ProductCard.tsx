import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { inWishlist, toggleWishlist, hydrated } = useShop();
  const saved = hydrated && inWishlist(product.slug);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-linen">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1008}
            height={1008}
            className="aspect-square w-full object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            width={1008}
            height={1008}
            className="absolute inset-0 aspect-square w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:opacity-100"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-background/90 px-3 py-1 text-[10px] tracking-[0.2em] text-primary uppercase">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background/90 text-foreground transition-colors hover:text-primary"
        >
          <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
        </button>
      </div>
      <div className="mt-4 space-y-1">
        <p className="eyebrow text-muted-foreground">{product.collection}</p>
        <h3 className="font-display text-xl leading-snug">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
