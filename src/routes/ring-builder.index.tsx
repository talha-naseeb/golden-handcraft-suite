import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Gem, Loader2, Sparkles, CircleDot, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useBuilder, type BuilderMode } from "@/lib/builder-store";
import { streamImage } from "@/lib/stream-image";
import { D_SHAPES } from "@/lib/diamonds";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-ring.jpg";

export const Route = createFileRoute("/ring-builder/")({
  head: () => ({
    meta: [
      { title: "Ring Builder — Design Your DANHOV Engagement Ring" },
      { name: "description", content: "Build a complete ring, buy a setting alone or a loose diamond, or design your own concept with our AI studio." },
      { property: "og:title", content: "DANHOV Ring Builder" },
      { property: "og:description", content: "Choose a setting, pair a certified diamond and complete your handcrafted ring." },
    ],
  }),
  component: BuilderLanding,
});

const PATHS: { mode: BuilderMode; title: string; body: string; cta: string; to: "/ring-builder/setting" | "/ring-builder/diamond"; icon: typeof Gem }[] = [
  { mode: "complete", title: "Build a Complete Ring", body: "Start with a handcrafted setting, then pair it with a certified diamond.", cta: "Start with a setting", to: "/ring-builder/setting", icon: Layers },
  { mode: "setting", title: "Buy a Setting Alone", body: "Already have a stone? Choose a setting and we'll mount your diamond.", cta: "Browse settings", to: "/ring-builder/setting", icon: CircleDot },
  { mode: "diamond", title: "Buy a Loose Diamond", body: "Search natural and lab-grown diamonds by shape, carat, color and clarity.", cta: "Search diamonds", to: "/ring-builder/diamond", icon: Gem },
];

const METALS = ["Platinum", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"] as const;

function BuilderLanding() {
  const { update } = useBuilder();
  const navigate = useNavigate();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <img src={heroImg} alt="" className="absolute inset-0 size-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <p className="eyebrow text-primary">The Ring Builder</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-light leading-tight sm:text-6xl">
            One wire. One stone. Entirely yours.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Three steps: choose a setting, choose a diamond, complete your ring. Every piece is made to order in our Los Angeles atelier.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {PATHS.map((p) => (
          <button
            key={p.mode}
            type="button"
            onClick={() => {
              update({ mode: p.mode });
              navigate({ to: p.to });
            }}
            className="group flex flex-col items-start border border-border bg-card p-8 text-left transition-colors hover:border-primary"
          >
            <p.icon className="size-6 text-primary" aria-hidden />
            <h2 className="mt-6 font-display text-3xl font-light">{p.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <span className="wire-underline mt-8 text-[11px] tracking-[0.18em] text-primary uppercase">{p.cta} →</span>
          </button>
        ))}
      </section>

      <p className="text-center text-sm text-muted-foreground">
        Prefer to start from the stone shape?{" "}
        <Link to="/ring-builder/shape" className="text-primary underline-offset-4 hover:underline">
          Design by shape, metal & cut
        </Link>
      </p>

      <AiStudio />
    </div>
  );
}

function AiStudio() {
  const [prompt, setPrompt] = useState("");
  const [metal, setMetal] = useState<(typeof METALS)[number]>("18k Yellow Gold");
  const [shape, setShape] = useState<string>("Oval");
  const [image, setImage] = useState<string | null>(null);
  const [final, setFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function render() {
    setLoading(true);
    setError(null);
    setFinal(false);
    try {
      await streamImage("/api/concept-render", { prompt, metal, shape, partial_images: 1 }, (url, isFinal) => {
        setImage(url);
        setFinal(isFinal);
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(
        msg.includes("402")
          ? "The concept studio is paused — AI credits have run out."
          : msg.includes("429")
            ? "The studio is busy. Please try again in a minute."
            : msg.includes("400")
              ? "Please describe your ring in a few more words."
              : "We couldn't render this concept. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="grid gap-10 border border-border bg-linen p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Design Your Own with AI</p>
          <h2 className="mt-3 font-display text-4xl font-light">The Concept Studio</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Describe the ring you imagine. We'll render a concept your DANHOV designer can refine into CAD and craft by hand.
          </p>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              if (!loading) void render();
            }}
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 400))}
              rows={4}
              required
              minLength={3}
              placeholder="e.g. A vintage-inspired band with a twisted wire gallery and tiny milgrain edges"
              className="rounded-none bg-background"
              aria-label="Describe your ring"
            />
            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Metal</p>
              <div className="flex flex-wrap gap-2">
                {METALS.map((m) => (
                  <Chip key={m} active={metal === m} onClick={() => setMetal(m)}>{m}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Center stone</p>
              <div className="flex flex-wrap gap-2">
                {D_SHAPES.map((s) => (
                  <Chip key={s} active={shape === s} onClick={() => setShape(s)}>{s}</Chip>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={loading || prompt.trim().length < 3} className="rounded-none px-8 py-6 tracking-[0.2em] uppercase">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Render concept
            </Button>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </form>
        </div>
        <div className="flex aspect-square items-center justify-center overflow-hidden border border-border bg-background">
          {image ? (
            <img src={image} alt="AI concept rendering of your ring" className={cn("size-full object-cover transition-[filter] duration-700", !final && "blur-md")} />
          ) : (
            <p className="px-8 text-center text-sm text-muted-foreground">
              {loading ? "Rendering your concept…" : "Your concept rendering will appear here."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-2 text-[11px] tracking-[0.12em] uppercase transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary",
      )}
    >
      {children}
    </button>
  );
}
