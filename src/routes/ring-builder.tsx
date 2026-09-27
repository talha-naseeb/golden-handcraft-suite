import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Link2, Mail, Save, Sparkles, Trash2, UserRound } from "lucide-react";
import { streamImage } from "@/lib/stream-image";
import {
  decodeConfig,
  describeConfig,
  encodeConfig,
  loadSavedDesigns,
  shrinkImage,
  storeSavedDesigns,
  type RingConfig,
  type SavedDesign,
} from "@/lib/ring-config";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DIAMOND_SHAPES, METALS, formatPrice, type Metal } from "@/lib/products";
import { diamondImage } from "@/lib/diamond-images";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ shape: z.string().optional(), d: z.string().optional() });

export const Route = createFileRoute("/ring-builder")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Ring Builder — Design Your Engagement Ring" },
      {
        name: "description",
        content:
          "Build your ring step by step: choose the diamond shape, metal, stone, cut grade, preview the final look and order.",
      },
      { property: "og:title", content: "Ring Builder — Design Your Engagement Ring" },
      {
        property: "og:description",
        content: "Shape, metal, diamond, cut, final look — design your ring and order it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RingBuilder,
});

const STEPS = ["Shape", "Material", "Diamond", "Cut", "Final Look"] as const;

const METAL_INFO: Record<Metal, { price: number; swatch: string; note: string }> = {
  Platinum: { price: 2200, swatch: "oklch(0.86 0.005 250)", note: "Dense, naturally white, hypoallergenic" },
  "18k White Gold": { price: 1650, swatch: "oklch(0.9 0.008 90)", note: "Bright white, rhodium finished" },
  "18k Yellow Gold": { price: 1650, swatch: "oklch(0.8 0.11 85)", note: "Warm, classic, timeless" },
  "18k Rose Gold": { price: 1700, swatch: "oklch(0.78 0.07 40)", note: "Soft blush, romantic tone" },
};

const CARATS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const COLORS = [
  { grade: "D", mult: 1.45, note: "Colorless" },
  { grade: "E", mult: 1.3, note: "Colorless" },
  { grade: "F", mult: 1.18, note: "Colorless" },
  { grade: "G", mult: 1.0, note: "Near colorless" },
  { grade: "H", mult: 0.9, note: "Near colorless" },
];
const CLARITIES = [
  { grade: "IF", mult: 1.5 },
  { grade: "VVS1", mult: 1.3 },
  { grade: "VVS2", mult: 1.2 },
  { grade: "VS1", mult: 1.05 },
  { grade: "VS2", mult: 1.0 },
  { grade: "SI1", mult: 0.85 },
];
const CUTS = [
  { grade: "Ideal", mult: 1.2, note: "Top 3% of stones — maximum brilliance and fire" },
  { grade: "Excellent", mult: 1.1, note: "Exceptional light return, near-perfect proportions" },
  { grade: "Very Good", mult: 1.0, note: "Strong sparkle at a considered price" },
  { grade: "Good", mult: 0.88, note: "Good light return, best value" },
];
const SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"];

function RingBuilder() {
  const { shape: initialShape, d } = Route.useSearch();
  const { addToCart, setBookingOpen } = useShop();
  const shared = decodeConfig(d);
  const startShape = DIAMOND_SHAPES.find((s) => s === initialShape);
  const [step, setStep] = useState(shared ? 4 : startShape ? 1 : 0);
  const [shape, setShape] = useState<string>(shared?.shape ?? startShape ?? "Round");
  const [metal, setMetal] = useState<Metal>((shared?.metal as Metal) ?? "Platinum");
  const [carat, setCarat] = useState(shared?.carat ?? 1);
  const [color, setColor] = useState<string>(shared?.color ?? "G");
  const [clarity, setClarity] = useState<string>(shared?.clarity ?? "VS2");
  const [cut, setCut] = useState<string>(shared?.cut ?? "Excellent");
  const [size, setSize] = useState(shared?.size ?? "6");
  const [aiImage, setAiImage] = useState<{ url: string; final: boolean; key: string } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedDesign[]>([]);
  useEffect(() => setSaved(loadSavedDesigns()), []);

  const config = { shape, metal, carat, color, clarity, cut, size } as RingConfig;
  const designKey = `${shape}|${metal}|${carat}|${color}|${clarity}|${cut}`;
  const preview = aiImage && aiImage.key === designKey ? aiImage : null;

  const generate = async () => {
    setGenerating(true);
    setAiError(null);
    try {
      await streamImage("/api/ring-preview", { config }, (url, final) =>
        setAiImage({ url, final, key: designKey }),
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setAiError(
        msg.includes("402")
          ? "The preview service is out of credits right now. Please try later."
          : msg.includes("429")
            ? "Too many previews requested. Please wait a moment and try again."
            : "We couldn't create a preview. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  };

  const shareUrl = () =>
    `${window.location.origin}/ring-builder?d=${encodeURIComponent(encodeConfig(config))}`;

  const saveDesign = () => {
    const entry: SavedDesign = { id: String(Date.now()), config, price, savedAt: Date.now() };
    const next = [entry, ...saved.filter((s) => encodeConfig(s.config) !== encodeConfig(config))].slice(0, 12);
    setSaved(next);
    storeSavedDesigns(next);
    toast.success("Design saved");
  };
  const removeSaved = (id: string) => {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    storeSavedDesigns(next);
  };
  const loadDesign = (c: RingConfig) => {
    setShape(c.shape);
    setMetal(c.metal as Metal);
    setCarat(c.carat);
    setColor(c.color);
    setClarity(c.clarity);
    setCut(c.cut);
    setSize(c.size);
    setStep(4);
  };
  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl());
    toast.success("Share link copied");
  };
  const mailBody = () =>
    encodeURIComponent(
      `Here's the DANHOV ring I designed:\n\n${describeConfig(config)}\nPrice: ${formatPrice(price)}\n\nView it: ${shareUrl()}`,
    );
  const emailPartner = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent("What do you think of this ring?")}&body=${mailBody()}`;
  };
  const emailAdvisor = () => {
    window.location.href = `mailto:care@danhov.com?subject=${encodeURIComponent("Custom ring design review")}&body=${mailBody()}`;
  };

  const price = useMemo(() => {
    const c = COLORS.find((x) => x.grade === color)!.mult;
    const cl = CLARITIES.find((x) => x.grade === clarity)!.mult;
    const cu = CUTS.find((x) => x.grade === cut)!.mult;
    const shapeMult = shape === "Round" ? 1.15 : 1;
    const stone = 5200 * Math.pow(carat, 1.8) * c * cl * cu * shapeMult;
    return Math.round((METAL_INFO[metal].price + stone) / 10) * 10;
  }, [shape, metal, carat, color, clarity, cut]);

  const summary = `${carat.toFixed(2)}ct ${shape} · ${color}/${clarity} · ${cut} cut · ${metal}`;

  const order = async () => {
    const image = preview?.final ? await shrinkImage(preview.url) : diamondImage(shape);
    addToCart({
      slug: `custom-${shape}-${metal}-${carat}-${color}-${clarity}-${cut}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
      metal,
      size,
      quantity: 1,
      custom: {
        name: `Custom ${shape} Engagement Ring`,
        price,
        image,
        summary,
        config,
      },
    });
  };

  const canNext = step < STEPS.length - 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <p className="eyebrow text-primary">Ring Builder</p>
        <h1 className="mt-3 font-display text-4xl lg:text-5xl">Design your ring</h1>
      </div>

      {/* Stepper */}
      <ol className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "grid size-9 place-items-center rounded-full border text-xs transition-colors",
                i < step && "border-primary bg-primary text-primary-foreground",
                i === step && "border-primary text-primary",
                i > step && "border-border text-muted-foreground",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </button>
            <span
              className={cn(
                "text-[10px] tracking-[0.18em] uppercase",
                i === step ? "text-primary" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Step content */}
        <section className="min-h-[420px]">
          {step === 0 && (
            <StepBlock title="Choose the diamond shape">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {DIAMOND_SHAPES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShape(s)}
                    className={cn(
                      "group border p-2 text-center transition-colors",
                      shape === s ? "border-primary" : "border-border hover:border-primary/50",
                    )}
                  >
                    <img
                      src={diamondImage(s)}
                      alt={`${s} cut diamond`}
                      loading="lazy"
                      width={816}
                      height={816}
                      className="aspect-square w-full object-cover"
                    />
                    <span className="mt-2 block text-[11px] tracking-[0.18em] uppercase">{s}</span>
                  </button>
                ))}
              </div>
            </StepBlock>
          )}

          {step === 1 && (
            <StepBlock title="Choose your material">
              <div className="grid gap-4 sm:grid-cols-2">
                {METALS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMetal(m)}
                    className={cn(
                      "flex items-center gap-4 border p-5 text-left transition-colors",
                      metal === m ? "border-primary" : "border-border hover:border-primary/50",
                    )}
                  >
                    <span
                      className="size-12 shrink-0 rounded-full border border-border"
                      style={{ background: METAL_INFO[m].swatch }}
                    />
                    <span>
                      <span className="block font-display text-xl">{m}</span>
                      <span className="block text-xs text-muted-foreground">{METAL_INFO[m].note}</span>
                      <span className="mt-1 block text-xs">Setting from {formatPrice(METAL_INFO[m].price)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </StepBlock>
          )}

          {step === 2 && (
            <StepBlock title="Choose your diamond">
              <OptionRow label="Carat weight">
                {CARATS.map((c) => (
                  <Chip key={c} active={carat === c} onClick={() => setCarat(c)}>
                    {c.toFixed(2)} ct
                  </Chip>
                ))}
              </OptionRow>
              <OptionRow label="Color">
                {COLORS.map((c) => (
                  <Chip key={c.grade} active={color === c.grade} onClick={() => setColor(c.grade)}>
                    {c.grade} <span className="text-muted-foreground">· {c.note}</span>
                  </Chip>
                ))}
              </OptionRow>
              <OptionRow label="Clarity">
                {CLARITIES.map((c) => (
                  <Chip key={c.grade} active={clarity === c.grade} onClick={() => setClarity(c.grade)}>
                    {c.grade}
                  </Chip>
                ))}
              </OptionRow>
            </StepBlock>
          )}

          {step === 3 && (
            <StepBlock title="Choose the cut grade">
              <div className="grid gap-4 sm:grid-cols-2">
                {CUTS.map((c) => (
                  <button
                    key={c.grade}
                    type="button"
                    onClick={() => setCut(c.grade)}
                    className={cn(
                      "border p-5 text-left transition-colors",
                      cut === c.grade ? "border-primary" : "border-border hover:border-primary/50",
                    )}
                  >
                    <span className="block font-display text-xl">{c.grade}</span>
                    <span className="block text-xs text-muted-foreground">{c.note}</span>
                  </button>
                ))}
              </div>
            </StepBlock>
          )}

          {step === 4 && (
            <StepBlock title="Your final look">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  {preview ? (
                    <img
                      src={preview.url}
                      alt={`AI preview: ${summary}`}
                      className={cn(
                        "aspect-square w-full border border-border object-cover transition-[filter] duration-700",
                        preview.final ? "blur-0" : "blur-2xl",
                      )}
                    />
                  ) : (
                    <Preview shape={shape} metal={metal} large />
                  )}
                  <Button
                    variant="outline"
                    onClick={generate}
                    disabled={generating}
                    className="mt-3 w-full rounded-none tracking-[0.18em] uppercase"
                  >
                    <Sparkles className="size-4" />
                    {generating ? "Creating preview…" : preview ? "Regenerate preview" : "See my finished ring"}
                  </Button>
                  {aiError && <p className="mt-2 text-xs text-destructive">{aiError}</p>}
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    AI-generated illustration of your design. Your finished ring is handcrafted and may vary slightly.
                  </p>
                </div>
                <div>
                  <dl className="divide-y divide-border border-y border-border text-sm">
                    {[
                      ["Shape", shape],
                      ["Material", metal],
                      ["Carat", `${carat.toFixed(2)} ct`],
                      ["Color", color],
                      ["Clarity", clarity],
                      ["Cut", cut],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-3">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <OptionRow label="Ring size">
                    {SIZES.map((s) => (
                      <Chip key={s} active={size === s} onClick={() => setSize(s)}>
                        {s}
                      </Chip>
                    ))}
                  </OptionRow>
                  <p className="mt-6 font-display text-3xl">{formatPrice(price)}</p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Button onClick={order} className="rounded-none py-6 tracking-[0.2em] uppercase">
                      Order this ring
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setBookingOpen(true)}
                      className="rounded-none py-6 tracking-[0.2em] uppercase"
                    >
                      Book a private viewing
                    </Button>
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="eyebrow mb-3 text-muted-foreground">Save & share before ordering</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="ghost" size="sm" onClick={saveDesign} className="justify-start rounded-none">
                        <Save className="size-4" /> Save design
                      </Button>
                      <Button variant="ghost" size="sm" onClick={copyLink} className="justify-start rounded-none">
                        <Link2 className="size-4" /> Copy link
                      </Button>
                      <Button variant="ghost" size="sm" onClick={emailPartner} className="justify-start rounded-none">
                        <Mail className="size-4" /> Send to partner
                      </Button>
                      <Button variant="ghost" size="sm" onClick={emailAdvisor} className="justify-start rounded-none">
                        <UserRound className="size-4" /> Ask an advisor
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </StepBlock>
          )}

          <div className="mt-10 flex justify-between">
            <Button
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
              className="rounded-none tracking-[0.18em] uppercase"
            >
              <ChevronLeft className="size-4" /> Back
            </Button>
            {canNext && (
              <Button
                onClick={() => setStep((s) => s + 1)}
                className="rounded-none px-8 tracking-[0.18em] uppercase"
              >
                Next: {STEPS[step + 1]} <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </section>

        {/* Live summary */}
        <aside className="h-fit border border-border bg-linen p-6 lg:sticky lg:top-32">
          <p className="eyebrow text-muted-foreground">Your ring so far</p>
          <div className="mt-4">
            <Preview shape={shape} metal={metal} />
          </div>
          <p className="mt-4 text-sm">{summary}</p>
          <p className="mt-3 font-display text-2xl">{formatPrice(price)}</p>
          {saved.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <p className="eyebrow mb-3 text-muted-foreground">Saved designs</p>
              <ul className="space-y-2">
                {saved.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => loadDesign(s.config)}
                      className="flex-1 text-left hover:text-primary"
                    >
                      {describeConfig(s.config)} — {formatPrice(s.price)}
                    </button>
                    <button type="button" aria-label="Remove saved design" onClick={() => removeSaved(s.id)}>
                      <Trash2 className="size-3.5 text-muted-foreground hover:text-primary" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Preview({ shape, metal, large }: { shape: string; metal: Metal; large?: boolean }) {
  return (
    <div className="relative overflow-hidden border border-border bg-background">
      <img
        src={diamondImage(shape)}
        alt={`${shape} diamond in ${metal}`}
        width={816}
        height={816}
        className="aspect-square w-full object-cover"
      />
      <div
        className={cn("absolute inset-x-0 bottom-0", large ? "h-3" : "h-2")}
        style={{ background: METAL_INFO[metal].swatch }}
        aria-hidden
      />
    </div>
  );
}

function StepBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="reveal-up">
      <h2 className="mb-6 font-display text-3xl">{title}</h2>
      {children}
    </div>
  );
}

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="eyebrow mb-3 text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-4 py-2 text-xs transition-colors",
        active ? "border-primary text-primary" : "border-border hover:border-primary/50",
      )}
    >
      {children}
    </button>
  );
}
