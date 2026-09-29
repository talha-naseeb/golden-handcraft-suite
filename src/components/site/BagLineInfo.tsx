import { Link } from "@tanstack/react-router";
import type { CartLine } from "@/lib/shop-store";
import type { Product } from "@/lib/products";
import { encodeConfig } from "@/lib/ring-config";

/** Title + specification list for a bag line. Custom rings never link to a product page. */
export function BagLineInfo({
  line,
  product,
  onNavigate,
}: {
  line: CartLine;
  product: Product;
  onNavigate?: () => void;
}) {
  const cfg = line.custom?.config;
  if (line.custom) {
    const specs: [string, string][] = cfg
      ? [
          ["Shape", cfg.shape],
          ["Material", cfg.metal],
          ["Diamond", `${cfg.carat.toFixed(2)} ct · ${cfg.color} color · ${cfg.clarity}`],
          ["Cut", cfg.cut],
          ["Size", line.size ?? cfg.size],
        ]
      : [["Details", line.custom.summary]];
    return (
      <div>
        <p className="font-display text-lg leading-tight">{line.custom.name}</p>
        <dl className="mt-2 space-y-0.5 text-xs">
          {specs.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="w-16 shrink-0 text-muted-foreground">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        {cfg && (
          <Link
            to="/ring-builder/shape"
            search={{ d: encodeConfig(cfg) }}
            onClick={onNavigate}
            className="mt-2 inline-block text-[11px] tracking-[0.14em] text-primary uppercase underline-offset-4 hover:underline"
          >
            Edit design
          </Link>
        )}
      </div>
    );
  }
  return (
    <div>
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        onClick={onNavigate}
        className="font-display text-lg leading-tight hover:text-primary"
      >
        {product.name}
      </Link>
      <p className="mt-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {line.metal}
        {line.size ? ` · Size ${line.size}` : ""}
      </p>
    </div>
  );
}
