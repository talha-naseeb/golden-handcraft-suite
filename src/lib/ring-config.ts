import { z } from "zod";
import { DIAMOND_SHAPES, METALS } from "./products";

export const ringConfigSchema = z.object({
  shape: z.enum(DIAMOND_SHAPES as unknown as [string, ...string[]]),
  metal: z.enum(METALS as unknown as [string, ...string[]]),
  carat: z.number().min(0.25).max(5),
  color: z.enum(["D", "E", "F", "G", "H"]),
  clarity: z.enum(["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1"]),
  cut: z.enum(["Ideal", "Excellent", "Very Good", "Good"]),
  size: z.string().max(5),
});

export type RingConfig = z.infer<typeof ringConfigSchema>;

export function buildRingPrompt(c: RingConfig) {
  return [
    `Ultra-realistic luxury jewelry product photograph of a solitaire engagement ring.`,
    `Center stone: a ${c.carat.toFixed(2)} carat ${c.shape} cut diamond, ${c.color} color, ${c.clarity} clarity, ${c.cut} cut grade with brilliant light return and fire.`,
    `Band and prongs in polished ${c.metal}.`,
    `Three-quarter view, the ring standing upright on a warm ivory linen surface, soft diffused studio light, shallow depth of field, crisp macro detail, no text, no hands, no logos.`,
  ].join(" ");
}

export function encodeConfig(c: RingConfig) {
  return btoa(JSON.stringify(c)).replace(/=+$/, "");
}

export function decodeConfig(s: string | undefined): RingConfig | null {
  if (!s) return null;
  try {
    const r = ringConfigSchema.safeParse(JSON.parse(atob(s)));
    return r.success ? r.data : null;
  } catch {
    return null;
  }
}

export function describeConfig(c: RingConfig) {
  return `${c.carat.toFixed(2)}ct ${c.shape} · ${c.color}/${c.clarity} · ${c.cut} cut · ${c.metal} · Size ${c.size}`;
}

export type SavedDesign = { id: string; config: RingConfig; price: number; savedAt: number };
const SAVED_KEY = "danhov.savedDesigns";

export function loadSavedDesigns(): SavedDesign[] {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as SavedDesign[];
  } catch {
    return [];
  }
}

export function storeSavedDesigns(list: SavedDesign[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
}

/** Shrink a generated preview so it fits in the saved bag. */
export function shrinkImage(dataUrl: string, size = 480): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = Math.round((img.height / img.width) * size);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
