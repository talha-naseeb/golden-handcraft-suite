import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { BuilderSteps } from "@/components/site/BuilderSteps";
import { Chip } from "@/components/site/Chip";
import { Button } from "@/components/ui/button";
import { ringSettings, formatPrice, designerName } from "@/lib/catalog";
import { METAL_SURCHARGE, useBuilder } from "@/lib/builder-store";

export const Route = createFileRoute("/ring-builder/setting")({
  head: () => ({
    meta: [
      { title: "Step 1: Choose a Setting — DANHOV Ring Builder" },
      { name: "description", content: "Browse handcrafted engagement ring settings by collection and metal." },
      { property: "og:title", content: "Choose Your Setting — DANHOV" },
      { property: "og:description", content: "Solitaire, halo, three stone, vintage and bezel settings made in Los Angeles." },
    ],
  }),
  component: SettingStep,
});

const METALS = ["Platinum", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"];
const STYLES = ["All", "Solitaire", "Side Stone", "Halo", "Three Stone", "Vintage", "Bezel"];

function SettingStep() {
  const { state, update } = useBuilder();
  const navigate = useNavigate();
  const [style, setStyle] = useState("All");
  const [metal, setMetal] = useState<string>("All");

  const list = useMemo(
    () =>
      ringSettings.filter(
        (s) => (style === "All" || s.style === style) && (metal === "All" || (s.metals as string[]).includes(metal)),
      ),
    [style, metal],
  );

  function choose(slug: string, m: string) {
    update({ settingSlug: slug, metal: m });
    if (state.mode === "setting" || state.diamondId) navigate({ to: "/ring-builder/complete" });
    else navigate({ to: "/ring-builder/diamond" });
  }

  return (
    <div>
      <BuilderSteps current={1} done={[...(state.settingSlug ? [1] : []), ...(state.diamondId ? [2] : [])]} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-light sm:text-5xl">Choose Your Setting</h1>
        <div className="mt-8 space-y-5">
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...METALS].map((m) => (
              <Chip key={m} active={metal === m} onClick={() => setMetal(m)}>{m === "All" ? "All metals" : m}</Chip>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs tracking-[0.14em] text-muted-foreground uppercase">{list.length} settings</p>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {list.map((s) => (
            <SettingCard key={s.slug} setting={s} preferred={metal} selected={state.settingSlug === s.slug} onChoose={choose} />
          ))}
        </div>
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No settings match these filters.</p>}
      </div>
    </div>
  );
}

function SettingCard({
  setting,
  preferred,
  selected,
  onChoose,
}: {
  setting: (typeof ringSettings)[number];
  preferred: string;
  selected: boolean;
  onChoose: (slug: string, metal: string) => void;
}) {
  const metals = setting.metals as string[];
  const [m, setM] = useState(metals.includes(preferred) ? preferred : metals[0]!);
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-linen">
        <img src={setting.image} alt={setting.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {selected && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-primary px-2 py-1 text-[10px] tracking-[0.14em] text-primary-foreground uppercase">
            <Check className="size-3" /> Selected
          </span>
        )}
      </div>
      <p className="mt-4 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{setting.style} · {designerName(setting.designerSlug)}</p>
      <h3 className="mt-1 font-display text-xl">{setting.name}</h3>
      <p className="mt-1 text-sm">{formatPrice(setting.price + (METAL_SURCHARGE[m] ?? 0))}</p>
      <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label="Metal">
        {metals.map((x) => (
          <button
            key={x}
            type="button"
            role="radio"
            aria-checked={m === x}
            title={x}
            onClick={() => setM(x)}
            className={`size-6 rounded-full border-2 ${m === x ? "border-primary" : "border-transparent"}`}
          >
            <span className="block size-full rounded-full" style={{ background: metalSwatch(x) }} />
          </button>
        ))}
      </div>
      <Button size="sm" variant="outline" onClick={() => onChoose(setting.slug, m)} className="mt-4 w-full rounded-none tracking-[0.16em] uppercase">
        Add to builder
      </Button>
    </div>
  );
}

export function metalSwatch(m: string) {
  if (m.includes("Yellow")) return "linear-gradient(135deg,#e9cf8e,#b8913f)";
  if (m.includes("Rose")) return "linear-gradient(135deg,#efc1ae,#b97a66)";
  return "linear-gradient(135deg,#f1f1f1,#a9a9ad)";
}
