import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Timer } from "lucide-react";
import { toast } from "sonner";
import { BuilderSteps } from "@/components/site/BuilderSteps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSetting, formatPrice, RING_SIZES } from "@/lib/catalog";
import { getDiamond, describeDiamond } from "@/lib/diamonds";
import { diamondImage } from "@/lib/diamond-images";
import { METAL_SURCHARGE, useBuilder } from "@/lib/builder-store";
import { useShop } from "@/lib/shop-store";
import type { Metal } from "@/lib/products";

export const Route = createFileRoute("/ring-builder/complete")({
  head: () => ({
    meta: [
      { title: "Step 3: Complete Your Ring — DANHOV Ring Builder" },
      { name: "description", content: "Review your setting and diamond, choose your size, add a free engraving and lock today's gold price for 24 hours." },
      { property: "og:title", content: "Complete Your Ring — DANHOV" },
      { property: "og:description", content: "Review, engrave and order your handcrafted DANHOV ring." },
    ],
  }),
  component: CompleteStep,
});

const DAY = 24 * 60 * 60 * 1000;

function CompleteStep() {
  const { state, ready, update } = useBuilder();
  const { addToCart, setBookingOpen } = useShop();
  const [now, setNow] = useState(() => Date.now());
  const [email, setEmail] = useState("");

  const setting = state.settingSlug ? getSetting(state.settingSlug) : undefined;
  const diamond = getDiamond(state.diamondId);
  const mode = state.mode ?? "complete";
  const metal = state.metal ?? "18k White Gold";
  const size = state.size ?? "6";
  const engraving = state.engraving ?? "";

  useEffect(() => {
    if (ready && !state.startedAt) update({ startedAt: Date.now() });
  }, [ready, state.startedAt, update]);
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const needSetting = mode !== "diamond";
  const needDiamond = mode !== "setting";
  const missing = (needSetting && !setting) || (needDiamond && !diamond);

  const settingPrice = setting ? setting.price + (METAL_SURCHARGE[metal] ?? 0) : 0;
  const total = settingPrice + (diamond?.price ?? 0);
  const lockStart = state.lockedAt ?? state.startedAt ?? now;
  const remaining = Math.max(0, lockStart + DAY - now);
  const hh = String(Math.floor(remaining / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");

  if (!ready) return <div className="min-h-[60vh]" />;

  function addToBag() {
    const parts = [
      setting && `${setting.name} in ${metal}`,
      diamond && describeDiamond(diamond),
      needSetting && `Size ${size}`,
      engraving && `Engraving "${engraving}"`,
    ].filter(Boolean);
    addToCart({
      slug: `builder-${setting?.slug ?? "loose"}-${diamond?.id ?? "none"}-${Date.now()}`,
      metal: metal as Metal,
      ...(needSetting ? { size } : {}),
      quantity: 1,
      custom: {
        name: mode === "diamond" ? "Loose Diamond" : mode === "setting" ? `${setting?.name} Setting` : `${setting?.name} with ${diamond?.shape} Diamond`,
        price: total,
        image: setting?.image ?? diamondImage(diamond?.shape ?? "Round"),
        summary: parts.join(" · "),
      },
    });
    toast.success("Added to your bag");
  }

  return (
    <div>
      <BuilderSteps current={3} done={[...(setting ? [1] : []), ...(diamond ? [2] : [])]} />

      <div className="bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Timer className="size-5 shrink-0" aria-hidden />
            <p className="text-sm">
              {state.lockedAt ? (
                <>Gold price locked for <strong>{state.lockEmail}</strong> — </>
              ) : (
                <>Today's gold spot price is held for 24 hours — </>
              )}
              <span className="font-mono tabular-nums tracking-wider" aria-live="polite">{hh}:{mm}:{ss}</span> remaining
            </p>
          </div>
          {!state.lockedAt && (
            <form
              className="flex w-full gap-2 lg:w-auto"
              onSubmit={(e) => {
                e.preventDefault();
                update({ lockedAt: Date.now(), lockEmail: email });
                toast.success("Price locked for 24 hours — we've noted your email.");
              }}
            >
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email to lock price" className="rounded-none border-background/30 bg-transparent text-background placeholder:text-background/60 lg:w-64" />
              <Button type="submit" variant="secondary" className="rounded-none tracking-[0.16em] uppercase">
                <Lock className="size-3.5" /> Lock
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl font-light sm:text-5xl">Complete Your Ring</h1>

        {missing ? (
          <div className="mt-10 border border-border p-10 text-center">
            <p className="text-muted-foreground">Your ring needs {needSetting && !setting ? "a setting" : "a diamond"} before it can be completed.</p>
            <Button asChild className="mt-6 rounded-none tracking-[0.18em] uppercase">
              <Link to={needSetting && !setting ? "/ring-builder/setting" : "/ring-builder/diamond"}>
                Choose {needSetting && !setting ? "a setting" : "a diamond"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3">
              {setting && <img src={setting.image} alt={setting.name} className="col-span-2 aspect-[4/3] w-full object-cover" />}
              {diamond && <img src={diamondImage(diamond.shape)} alt={`${diamond.shape} diamond`} className={setting ? "aspect-square w-full object-cover" : "col-span-2 aspect-square w-full object-cover"} />}
              {setting && needSetting && (
                <div className="flex aspect-square flex-col items-center justify-center bg-linen p-4">
                  <p className="eyebrow text-muted-foreground">Inside band</p>
                  <div className="mt-4 flex h-14 w-full items-center justify-center rounded-full border-4 border-border bg-background px-4 shadow-inner">
                    <span className="truncate font-display text-lg italic">{engraving || "Your words here"}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <dl className="divide-y divide-border border-y border-border">
                {setting && (
                  <Row label="Setting" value={`${setting.name} · ${setting.style}`} extra={<Link to="/ring-builder/setting" className="text-primary">Change</Link>} price={settingPrice} />
                )}
                {setting && <Row label="Metal" value={metal} />}
                {diamond && (
                  <Row label="Diamond" value={describeDiamond(diamond)} extra={<Link to="/ring-builder/diamond" className="text-primary">Change</Link>} price={diamond.price} />
                )}
              </dl>

              {needSetting && (
                <>
                  <label className="mt-8 block">
                    <span className="eyebrow text-muted-foreground">Ring size</span>
                    <select value={size} onChange={(e) => update({ size: e.target.value })} className="mt-3 block w-full border border-border bg-background px-3 py-3 text-sm">
                      {RING_SIZES.map((s) => (
                        <option key={s} value={s}>US {s}</option>
                      ))}
                    </select>
                  </label>
                  <label className="mt-6 block">
                    <span className="eyebrow text-muted-foreground">Complimentary engraving ({engraving.length}/25)</span>
                    <Input value={engraving} maxLength={25} onChange={(e) => update({ engraving: e.target.value.slice(0, 25) })} placeholder="e.g. One again · 06.14.27" className="mt-3 rounded-none" />
                  </label>
                </>
              )}

              <div className="mt-8 flex items-baseline justify-between">
                <span className="eyebrow">Total</span>
                <span className="font-display text-4xl">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Handcrafted in 3 weeks · Free insured FedEx Priority Overnight · 30-day returns</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button onClick={addToBag} className="rounded-none py-6 tracking-[0.2em] uppercase">Add to Bag</Button>
                <Button variant="outline" onClick={() => setBookingOpen(true)} className="rounded-none py-6 tracking-[0.2em] uppercase">Book a Consultation</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, extra, price }: { label: string; value: string; extra?: React.ReactNode; price?: number }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <dt className="eyebrow text-muted-foreground">{label}</dt>
        <dd className="mt-1 text-sm">{value}</dd>
        {extra && <dd className="mt-1 text-[11px] tracking-[0.14em] uppercase">{extra}</dd>}
      </div>
      {price !== undefined && <span className="text-sm">{formatPrice(price)}</span>}
    </div>
  );
}
