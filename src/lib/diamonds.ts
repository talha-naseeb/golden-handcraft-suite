export const ORIGINS = ["Natural", "Lab-Grown"] as const;
export const D_SHAPES = [
  "Round",
  "Oval",
  "Cushion",
  "Pear",
  "Heart",
  "Emerald",
  "Princess",
  "Marquise",
  "Radiant",
  "Asscher",
] as const;
export const D_COLORS = ["D", "E", "F", "G", "H", "I", "J", "K", "Fancy Yellow", "Fancy Pink", "Fancy Blue"] as const;
export const D_CLARITIES = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"] as const;
export const D_CUTS = ["Ideal", "Excellent", "Very Good", "Good"] as const;

export type Diamond = {
  id: string;
  origin: (typeof ORIGINS)[number];
  shape: (typeof D_SHAPES)[number];
  carat: number;
  color: (typeof D_COLORS)[number];
  clarity: (typeof D_CLARITIES)[number];
  cut: (typeof D_CUTS)[number];
  cert: "GIA" | "IGI";
  price: number;
};

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(r: () => number, list: readonly T[]) => list[Math.floor(r() * list.length)]!;

const r = rng(1984);
export const diamonds: Diamond[] = Array.from({ length: 200 }, (_, i) => {
  const origin = r() < 0.55 ? "Natural" : "Lab-Grown";
  const shape = pick(r, D_SHAPES);
  const carat = Math.round((0.3 + Math.pow(r(), 1.6) * 4.7) * 100) / 100;
  const color = r() < 0.08 ? pick(r, D_COLORS.slice(8)) : pick(r, D_COLORS.slice(0, 8));
  const clarity = pick(r, D_CLARITIES);
  const cut = pick(r, D_CUTS);
  const colorF = color.startsWith("Fancy") ? 1.7 : 1.35 - D_COLORS.indexOf(color) * 0.06;
  const clarF = 1.45 - D_CLARITIES.indexOf(clarity) * 0.07;
  const cutF = 1.12 - D_CUTS.indexOf(cut) * 0.07;
  const shapeF = shape === "Round" ? 1.15 : 1;
  const base = origin === "Natural" ? 6200 : 1100;
  const price = Math.round((base * Math.pow(carat, 1.7) * colorF * clarF * cutF * shapeF) / 10) * 10;
  return {
    id: `DH${(10421 + i * 37).toString()}`,
    origin,
    shape,
    carat,
    color,
    clarity,
    cut,
    cert: origin === "Natural" ? "GIA" : "IGI",
    price,
  };
});

export function getDiamond(id?: string) {
  return id ? diamonds.find((d) => d.id === id) : undefined;
}

export function describeDiamond(d: Diamond) {
  return `${d.carat.toFixed(2)}ct ${d.origin} ${d.shape} · ${d.color} / ${d.clarity} · ${d.cut} · ${d.cert}`;
}
