import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BuilderSteps } from "@/components/site/BuilderSteps";
import { Chip } from "@/components/site/Chip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { D_CLARITIES, D_COLORS, D_CUTS, D_SHAPES, diamonds, type Diamond } from "@/lib/diamonds";
import { diamondImage } from "@/lib/diamond-images";
import { formatPrice } from "@/lib/catalog";
import { useBuilder } from "@/lib/builder-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ring-builder/diamond")({
  head: () => ({
    meta: [
      { title: "Step 2: Choose a Diamond — DANHOV Ring Builder" },
      { name: "description", content: "Search natural and lab-grown certified diamonds by shape, carat, color, clarity and cut." },
      { property: "og:title", content: "Diamond Search — DANHOV" },
      { property: "og:description", content: "GIA and IGI certified natural and lab-grown diamonds in ten shapes." },
    ],
  }),
  component: DiamondStep,
});

type Sort = "price-asc" | "price-desc" | "carat-asc" | "carat-desc";

function DiamondStep() {
  const { state, update } = useBuilder();
  const navigate = useNavigate();
  const [origin, setOrigin] = useState<"Natural" | "Lab-Grown">("Natural");
  const [shapes, setShapes] = useState<string[]>([]);
  const [carat, setCarat] = useState<number[]>([0.3, 5]);
  const [colors, setColors] = useState<string[]>([]);
  const [clarities, setClarities] = useState<string[]>([]);
  const [cuts, setCuts] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("price-asc");
  const [limit, setLimit] = useState(24);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const results = useMemo(() => {
    const lo = carat[0] ?? 0.3;
    const hi = carat[1] ?? 5;
    const out = diamonds.filter(
      (d) =>
        d.origin === origin &&
        (!shapes.length || shapes.includes(d.shape)) &&
        d.carat >= lo &&
        d.carat <= hi &&
        (!colors.length || colors.includes(d.color)) &&
        (!clarities.length || clarities.includes(d.clarity)) &&
        (!cuts.length || cuts.includes(d.cut)),
    );
    const [key, dir] = sort.split("-") as ["price" | "carat", "asc" | "desc"];
    return out.sort((a, b) => (dir === "asc" ? a[key] - b[key] : b[key] - a[key]));
  }, [origin, shapes, carat, colors, clarities, cuts, sort]);

  function choose(d: Diamond) {
    update({ diamondId: d.id });
    if (state.mode === "diamond" || state.settingSlug) navigate({ to: "/ring-builder/complete" });
    else navigate({ to: "/ring-builder/setting" });
  }

  return (
    <div>
      <BuilderSteps current={2} done={[...(state.settingSlug ? [1] : []), ...(state.diamondId ? [2] : [])]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-light sm:text-5xl">Choose Your Diamond</h1>

        <div className="mt-8 inline-flex border border-border" role="radiogroup" aria-label="Origin">
          {(["Natural", "Lab-Grown"] as const).map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={origin === o}
              onClick={() => setOrigin(o)}
              className={cn("px-6 py-3 text-[11px] tracking-[0.18em] uppercase", origin === o ? "bg-primary text-primary-foreground" : "hover:bg-linen")}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-5 gap-3 sm:grid-cols-10">
          {D_SHAPES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={shapes.includes(s)}
              onClick={() => toggle(shapes, setShapes, s)}
              className={cn("flex flex-col items-center gap-2 border p-2 transition-colors", shapes.includes(s) ? "border-primary" : "border-transparent hover:border-border")}
            >
              <img src={diamondImage(s)} alt="" className="size-12 object-cover" />
              <span className="text-[10px] tracking-[0.12em] uppercase">{s}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-muted-foreground">
              Carat: {(carat[0] ?? 0.3).toFixed(2)} – {(carat[1] ?? 5).toFixed(2)}
            </p>
            <Slider className="mt-5" min={0.3} max={5} step={0.05} value={carat} onValueChange={setCarat} aria-label="Carat range" />
          </div>
          <Group label="Cut" values={D_CUTS} selected={cuts} onToggle={(v) => toggle(cuts, setCuts, v)} />
          <Group label="Color" values={D_COLORS} selected={colors} onToggle={(v) => toggle(colors, setColors, v)} />
          <Group label="Clarity" values={D_CLARITIES} selected={clarities} onToggle={(v) => toggle(clarities, setClarities, v)} />
        </div>

        <div className="mt-10 flex items-center justify-between border-b border-border pb-4">
          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">{results.length} diamonds</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-border bg-background px-3 py-2 text-xs tracking-[0.1em] uppercase"
            aria-label="Sort diamonds"
          >
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="carat-asc">Carat: low to high</option>
            <option value="carat-desc">Carat: high to low</option>
          </select>
        </div>

        <ul className="divide-y divide-border">
          {results.slice(0, limit).map((d) => (
            <li key={d.id} className="grid grid-cols-[56px_1fr_auto] items-center gap-4 py-4 sm:grid-cols-[56px_1fr_repeat(4,80px)_110px_auto]">
              <img src={diamondImage(d.shape)} alt="" className="size-14 object-cover" />
              <div>
                <p className="font-display text-lg">{d.carat.toFixed(2)}ct {d.shape}</p>
                <p className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:hidden">
                  {d.color} · {d.clarity} · {d.cut} · {d.cert}
                </p>
                <p className="hidden text-[11px] tracking-[0.1em] text-muted-foreground uppercase sm:block">{d.origin} · #{d.id}</p>
              </div>
              {[d.color, d.clarity, d.cut, d.cert].map((v, i) => (
                <span key={i} className="hidden text-sm sm:block">{v}</span>
              ))}
              <span className="hidden text-sm font-medium sm:block">{formatPrice(d.price)}</span>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-medium sm:hidden">{formatPrice(d.price)}</span>
                <Button size="sm" variant={state.diamondId === d.id ? "default" : "outline"} onClick={() => choose(d)} className="rounded-none text-[10px] tracking-[0.16em] uppercase">
                  {state.diamondId === d.id ? "Selected" : "Select"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {results.length === 0 && <p className="py-16 text-center text-muted-foreground">No diamonds match — try widening your filters.</p>}
        {results.length > limit && (
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => setLimit((l) => l + 24)} className="rounded-none tracking-[0.18em] uppercase">
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ label, values, selected, onToggle }: { label: string; values: readonly string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {values.map((v) => (
          <Chip key={v} active={selected.includes(v)} onClick={() => onToggle(v)}>{v}</Chip>
        ))}
      </div>
    </div>
  );
}
