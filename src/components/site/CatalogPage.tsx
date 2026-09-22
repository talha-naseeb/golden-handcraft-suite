import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORY_META,
  COLLECTIONS,
  METALS,
  formatPrice,
  productsByCategory,
  type Category,
  type Collection,
  type Metal,
} from "@/lib/products";
import { useShop } from "@/lib/shop-store";

type Sort = "featured" | "price-asc" | "price-desc" | "newest";

export function CatalogPage({ category }: { category: Category }) {
  const meta = CATEGORY_META[category];
  const all = useMemo(() => productsByCategory(category), [category]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...all.map((p) => p.price)) / 500) * 500, [all]);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [metals, setMetals] = useState<Metal[]>([]);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [sort, setSort] = useState<Sort>("featured");
  const { setBookingOpen } = useShop();

  const filtered = useMemo(() => {
    const list = all.filter(
      (p) =>
        (collections.length === 0 || collections.includes(p.collection)) &&
        (metals.length === 0 || metals.some((m) => p.metals.includes(m))) &&
        (!subcategory || p.subcategory === subcategory) &&
        p.price <= priceCap,
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "newest") sorted.sort((a, b) => b.newest - a.newest);
    if (sort === "featured")
      sorted.sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
    return sorted;
  }, [all, collections, metals, subcategory, priceCap, sort]);

  const toggle = <T,>(value: T, list: T[], set: (next: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const reset = () => {
    setCollections([]);
    setMetals([]);
    setSubcategory(null);
    setPriceCap(maxPrice);
  };

  return (
    <div>
      <section className="border-b border-border bg-linen">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="eyebrow text-primary">{meta.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl lg:text-6xl">{meta.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {meta.blurb}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSubcategory(null)}
            className={
              subcategory === null
                ? "border border-primary px-4 py-2 text-[11px] tracking-[0.18em] text-primary uppercase"
                : "border border-border px-4 py-2 text-[11px] tracking-[0.18em] uppercase hover:border-primary"
            }
          >
            All
          </button>
          {meta.subcategories.map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => setSubcategory(sub)}
              className={
                subcategory === sub
                  ? "border border-primary px-4 py-2 text-[11px] tracking-[0.18em] text-primary uppercase"
                  : "border border-border px-4 py-2 text-[11px] tracking-[0.18em] uppercase hover:border-primary"
              }
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-10">
            <div>
              <h2 className="eyebrow text-muted-foreground">Collection</h2>
              <div className="mt-4 space-y-3">
                {COLLECTIONS.map((c) => (
                  <div key={c} className="flex items-center gap-3">
                    <Checkbox
                      id={`collection-${c}`}
                      checked={collections.includes(c)}
                      onCheckedChange={() => toggle(c, collections, setCollections)}
                    />
                    <Label htmlFor={`collection-${c}`} className="text-sm font-light">
                      {c}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="eyebrow text-muted-foreground">Metal</h2>
              <div className="mt-4 space-y-3">
                {METALS.map((m) => (
                  <div key={m} className="flex items-center gap-3">
                    <Checkbox
                      id={`metal-${m}`}
                      checked={metals.includes(m)}
                      onCheckedChange={() => toggle(m, metals, setMetals)}
                    />
                    <Label htmlFor={`metal-${m}`} className="text-sm font-light">
                      {m}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="eyebrow text-muted-foreground">Price</h2>
              <Slider
                className="mt-6"
                min={1000}
                max={maxPrice}
                step={250}
                value={[priceCap]}
                onValueChange={(v) => setPriceCap(v[0])}
              />
              <p className="mt-3 text-sm text-muted-foreground">Up to {formatPrice(priceCap)}</p>
            </div>

            <Button
              variant="outline"
              onClick={reset}
              className="w-full rounded-none tracking-[0.18em] uppercase"
            >
              Clear filters
            </Button>

            <div className="border border-border bg-linen p-6">
              <h3 className="font-display text-xl">Not sure where to begin?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Meet a consultant from the atelier for a private virtual viewing.
              </p>
              <Button
                onClick={() => setBookingOpen(true)}
                className="mt-4 w-full rounded-none tracking-[0.18em] uppercase"
              >
                Book Appointment
              </Button>
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </p>
              <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
                <SelectTrigger className="w-56 rounded-none text-xs tracking-[0.14em] uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="featured">Sort: Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-3xl">No pieces match those filters</p>
                <Button
                  variant="outline"
                  onClick={reset}
                  className="mt-6 rounded-none tracking-[0.18em] uppercase"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
