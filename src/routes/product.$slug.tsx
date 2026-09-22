import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Ruler, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatPrice, getProduct, products, type Metal } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "10", "11", "12"];

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — DANHOV" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.product.name} — DANHOV`;
    const description = loaderData.product.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist, hydrated, setBookingOpen } = useShop();
  const [metal, setMetal] = useState<Metal>(product.metals[0]!);
  const [size, setSize] = useState(product.category === "fine-jewelry" ? "" : "6.5");
  const [active, setActive] = useState(0);
  const saved = hydrated && inWishlist(product.slug);

  const related = products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 3);

  const needsSize = product.category !== "fine-jewelry" || product.subcategory === "Rings";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          to={
            product.category === "mens"
              ? "/mens"
              : product.category === "wedding-bands"
                ? "/wedding-bands"
                : product.category === "fine-jewelry"
                  ? "/fine-jewelry"
                  : "/engagement-rings"
          }
          className="hover:text-primary"
        >
          {product.category.replace("-", " ")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div>
          <div className="bg-linen">
            <img
              src={product.gallery[active]}
              alt={`${product.name} — view ${active + 1}`}
              width={1008}
              height={1008}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-4 flex gap-4">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View ${i + 1}`}
                className={cn(
                  "w-20 border bg-linen transition-colors",
                  active === i ? "border-primary" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  width={1008}
                  height={1008}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-primary">{product.collection}</p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">{product.name}</h1>
          <p className="mt-4 font-display text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow text-muted-foreground">Metal</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.metals.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetal(m)}
                  className={cn(
                    "border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors",
                    metal === m
                      ? "border-primary text-primary"
                      : "border-border hover:border-primary",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {needsSize && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-muted-foreground">Ring size</p>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Ruler className="size-3.5" aria-hidden /> Complimentary sizing kit
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={cn(
                      "size-10 border text-xs transition-colors",
                      size === s
                        ? "border-primary text-primary"
                        : "border-border hover:border-primary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 rounded-none py-6 tracking-[0.2em] uppercase"
              onClick={() =>
addToCart({
                  slug: product.slug,
                  metal,
                  quantity: 1,
                  ...(needsSize ? { size } : {}),
                })
              }
            >
              Add to Bag
            </Button>
            <Button
              variant="outline"
              className="rounded-none py-6 tracking-[0.2em] uppercase"
              onClick={() => setBookingOpen(true)}
            >
              Book Private Viewing
            </Button>
            <Button
              variant="outline"
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              className="rounded-none py-6"
              onClick={() => toggleWishlist(product.slug)}
            >
              <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
            </Button>
          </div>

          <div className="mt-8 grid gap-3 border border-border bg-linen p-5 text-xs tracking-[0.12em] uppercase">
            <p className="flex items-center gap-2">
              <Truck className="size-4 text-primary" aria-hidden /> Complimentary insured FedEx
              overnight
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden /> Lifetime warranty · 30-day
              returns
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="craft">
              <AccordionTrigger className="font-display text-lg">Craftsmanship</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {product.craftsmanship}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specs">
              <AccordionTrigger className="font-display text-lg">Specifications</AccordionTrigger>
              <AccordionContent>
                <dl className="divide-y divide-border text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-6 py-2">
                      <dt className="text-muted-foreground">{spec.label}</dt>
                      <dd className="text-right">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sizing">
              <AccordionTrigger className="font-display text-lg">Ring sizing guide</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Measure at the end of the day when fingers are warmest, and size to slide over the
                knuckle with gentle resistance. We include a complimentary sizing kit with every
                order and offer one free resize within the first year.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="font-display text-lg">
                Shipping &amp; returns
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                Made to order in 3–4 weeks, then shipped insured FedEx overnight at no cost. Returns
                accepted within 30 days of delivery in original condition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl">More from {product.collection}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
