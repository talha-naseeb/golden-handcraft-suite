import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Quote, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { COLLECTIONS, DIAMOND_SHAPES, products } from "@/lib/products";
import { diamondImage } from "@/lib/diamond-images";
import { useShop } from "@/lib/shop-store";
import heroImg from "@/assets/hero-ring.jpg";
import atelierImg from "@/assets/atelier.jpg";
import engagementImg from "@/assets/product-engagement.jpg";
import bandImg from "@/assets/product-band.jpg";
import fineImg from "@/assets/product-fine.jpg";
import mensImg from "@/assets/product-mens.jpg";

const title = "DANHOV — Sacred Geometry. Eternal Love. Handcrafted in Los Angeles Since 1984";
const description =
  "Danhov engagement rings, wedding bands and fine jewelry, hand-formed from a single continuous wire in our Los Angeles atelier since 1984.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

const COLLECTION_NOTES: Record<string, { note: string; image: string }> = {
  Abbraccio: { note: "The embrace — one wire, two lives, one again.", image: engagementImg },
  Voltaggio: { note: "Hand-braided current, award-winning weave.", image: mensImg },
  Classico: { note: "Uncomplicated proportion, eternal line.", image: bandImg },
  Carezza: { note: "Milgrain softness, a caress in metal.", image: fineImg },
  Petalo: { note: "Hand-cut petals in sculpted relief.", image: engagementImg },
  Eleganza: { note: "Deco geometry, limited atelier runs.", image: bandImg },
};

const PRESS = ["Vogue", "Harper's Bazaar", "WWD", "Brides", "Town & Country", "Who What Wear"];

const TRUST = [
  "Founded 1984",
  "40+ Years",
  "Handcrafted in LA",
  "Lifetime Warranty",
  "Complimentary Insured Shipping",
];

const TESTIMONIALS = [
  {
    quote:
      "The moment she saw the single wire wrap around the stone, she understood the whole idea without a word.",
    name: "Daniel R.",
    city: "Chicago, IL",
  },
  {
    quote:
      "We met the atelier over video, chose the metal together, and the ring arrived more beautiful than the photographs.",
    name: "Priya & Alex",
    city: "Austin, TX",
  },
  {
    quote: "Forty years of craft is obvious the second you hold one. Nothing else felt comparable.",
    name: "Michelle T.",
    city: "New York, NY",
  },
];

function Home() {
  const { setBookingOpen } = useShop();
  const featured = products.filter((p) => p.badge).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <img
          src={heroImg}
          alt="Platinum single-wire diamond engagement ring worn on the hand"
          width={1920}
          height={1200}
          className="h-[78vh] min-h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <div className="max-w-xl text-background">
              <p className="eyebrow text-champagne">Los Angeles · Since 1984</p>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                You Already Are One.
                <span className="block italic">Love is remembering.</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-background/80">
                Sacred geometry. Eternal love. Every Danhov piece begins as one continuous wire,
                hand-formed in our Los Angeles atelier.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-none px-8 py-6 tracking-[0.2em] uppercase"
                  size="lg"
                >
                  <Link to="/" hash="collections">
                    Explore Collections
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setBookingOpen(true)}
                  className="rounded-none border-background/70 bg-transparent px-8 py-6 tracking-[0.2em] text-background uppercase hover:bg-background hover:text-ink"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-ink text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 text-[10px] tracking-[0.22em] uppercase sm:px-6">
          {TRUST.map((item) => (
            <span key={item} className="text-background/80">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-24 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img
              src={atelierImg}
              alt="Jeweller bending a single continuous gold wire at the Los Angeles atelier bench"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full object-cover"
            />
            <div className="absolute -right-4 -bottom-6 hidden bg-background px-6 py-5 shadow-sm lg:block">
              <p className="font-display text-3xl">1984</p>
              <p className="eyebrow mt-1 text-muted-foreground">Jack Hovsepian</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">The Origin</p>
            <h2 className="mt-5 font-display text-4xl leading-tight lg:text-5xl">
              One wire, two lives, one again
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              In 1984 Jack Hovsepian set out to make a ring with no beginning and no end. He drew a
              single wire, bent it into an embrace, and the Abbraccio was born — two lives folding
              into one continuous line.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Four decades later every Danhov piece is still hand-formed on Cahuenga Boulevard from
              one wire, by hands that learned the technique directly from Jack.
            </p>
            <div className="mt-8 hairline max-w-xs" />
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="font-display text-3xl">40+</p>
                <p className="eyebrow mt-1 text-muted-foreground">Years of craft</p>
              </div>
              <div>
                <p className="font-display text-3xl">100%</p>
                <p className="eyebrow mt-1 text-muted-foreground">Recycled gold</p>
              </div>
              <div>
                <p className="font-display text-3xl">Zero</p>
                <p className="eyebrow mt-1 text-muted-foreground">Speculative production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections carousel */}
      <section id="collections" className="scroll-mt-32 border-y border-border bg-linen">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">The Collections</p>
              <h2 className="mt-4 font-display text-4xl lg:text-5xl">Six ways to say forever</h2>
            </div>
            <Link
              to="/engagement-rings"
              className="wire-underline flex items-center gap-2 text-xs tracking-[0.18em] uppercase hover:text-primary"
            >
              View all rings <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <Carousel opts={{ align: "start" }} className="mt-12">
            <CarouselContent>
              {COLLECTIONS.map((collection) => (
                <CarouselItem key={collection} className="sm:basis-1/2 lg:basis-1/3">
                  <Link to="/engagement-rings" className="group block">
                    <div className="overflow-hidden bg-background">
                      <img
                        src={COLLECTION_NOTES[collection]!.image}
                        alt={`${collection} collection`}
                        loading="lazy"
                        width={1008}
                        height={1008}
                        className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-5 font-display text-2xl group-hover:text-primary">
                      {collection}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {COLLECTION_NOTES[collection]!.note}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="rounded-none" />
            <CarouselNext className="rounded-none" />
          </Carousel>
        </div>
      </section>

      {/* Diamond shapes / builder */}
      <section id="builder" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-24 text-center sm:px-6">
        <p className="eyebrow text-primary">Begin With the Stone</p>
        <h2 className="mt-4 font-display text-4xl lg:text-5xl">Choose a diamond shape</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Setting, then diamond, then your complete ring. Start anywhere — we'll guide the rest.
        </p>
        <div className="mt-14 grid grid-cols-5 gap-y-10 sm:grid-cols-5 lg:grid-cols-10">
          {DIAMOND_SHAPES.map((shape) => (
            <Link
              key={shape}
              to="/ring-builder"
              search={{ shape }}
              className="group flex flex-col items-center gap-3"
            >
              <span className="block size-20 overflow-hidden border border-border bg-linen transition-colors group-hover:border-primary">
                <img
                  src={diamondImage(shape)}
                  alt={`${shape} cut diamond`}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase group-hover:text-primary">
                {shape}
              </span>
            </Link>
          ))}
        </div>
        <Button asChild className="mt-14 rounded-none px-10 py-6 tracking-[0.2em] uppercase">
          <Link to="/ring-builder">Start the Ring Builder</Link>
        </Button>
      </section>

      {/* Featured pieces */}
      <section className="border-y border-border bg-linen">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="text-center">
            <p className="eyebrow text-primary">Atelier Selection</p>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl">Signature pieces</h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 sm:px-6">
        <p className="eyebrow text-center text-muted-foreground">As Seen In</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {PRESS.map((name) => (
            <span key={name} className="font-display text-2xl text-foreground/55">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Why Danhov */}
      <section id="philosophy" className="scroll-mt-32 bg-ink text-background">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="text-center">
            <p className="eyebrow text-champagne">Why Danhov</p>
            <h2 className="mt-4 font-display text-4xl lg:text-5xl">
              Made by hand, kept for generations
            </h2>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: "Single-Wire Technique",
                copy: "One continuous wire, hand-bent — the structural signature no machine reproduces.",
              },
              {
                icon: ShieldCheck,
                title: "Lifetime Warranty",
                copy: "Cleaning, rhodium, prong care and one complimentary resize in the first year.",
              },
              {
                icon: Leaf,
                title: "Sustainable by Default",
                copy: "100% recycled gold and platinum, ethically sourced stones, zero speculative production.",
              },
              {
                icon: Truck,
                title: "Insured Overnight",
                copy: "Complimentary FedEx overnight, fully insured, with 30-day returns.",
              },
            ].map(({ icon: Icon, title: t, copy }) => (
              <div key={t}>
                <Icon className="size-5 text-champagne" aria-hidden />
                <h3 className="mt-5 font-display text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/70">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability + testimonials */}
      <section id="sustainability" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="border border-border bg-card p-8">
              <Quote className="size-5 text-primary" aria-hidden />
              <blockquote className="mt-5 font-display text-xl leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border bg-linen">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="eyebrow text-primary">Private Appointment</p>
          <h2 className="mt-4 font-display text-4xl lg:text-5xl">
            Meet the atelier, wherever you are
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Thirty minutes with a Danhov consultant — see pieces in real light, compare metals, and
            ask anything. No obligation.
          </p>
          <Button
            onClick={() => setBookingOpen(true)}
            className="mt-10 rounded-none px-10 py-6 tracking-[0.2em] uppercase"
          >
            Book Virtual Consultation
          </Button>
          <p className="mt-6 text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Or call{" "}
            <a href="tel:+14244214072" className="text-primary">
              (424) 421-4072
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

function ShapeGlyph({ shape }: { shape: string }) {
  const common = "stroke-current fill-none";
  const size = 28;
  switch (shape) {
    case "Round":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "Oval":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <ellipse cx="12" cy="12" rx="6" ry="9.5" />
        </svg>
      );
    case "Cushion":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        </svg>
      );
    case "Emerald":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M8 3h8l4 4v10l-4 4H8l-4-4V7z" />
        </svg>
      );
    case "Radiant":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M8.5 3.5h7l4 4v9l-4 4h-7l-4-4v-9z" />
          <path d="M8.5 8h7v8h-7z" />
        </svg>
      );
    case "Pear":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M12 2.5c3 4 6.5 6.5 6.5 11a6.5 6.5 0 0 1-13 0c0-4.5 3.5-7 6.5-11z" />
        </svg>
      );
    case "Princess":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <rect x="4" y="4" width="16" height="16" />
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "Marquise":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M12 2c4 4.5 6 7.5 6 10s-2 5.5-6 10c-4-4.5-6-7.5-6-10s2-5.5 6-10z" />
        </svg>
      );
    case "Asscher":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M8 4h8l4 4v8l-4 4H8l-4-4V8z" />
          <path d="M9.5 9.5h5v5h-5z" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={common}>
          <path d="M12 20.5S3.5 14.8 3.5 9.4A4.9 4.9 0 0 1 12 6.3a4.9 4.9 0 0 1 8.5 3.1c0 5.4-8.5 11.1-8.5 11.1z" />
        </svg>
      );
  }
}
