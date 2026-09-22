import engagementImg from "@/assets/product-engagement.jpg";
import bandImg from "@/assets/product-band.jpg";
import fineImg from "@/assets/product-fine.jpg";
import mensImg from "@/assets/product-mens.jpg";

export const METALS = [
  "Platinum",
  "18k White Gold",
  "18k Yellow Gold",
  "18k Rose Gold",
] as const;
export type Metal = (typeof METALS)[number];

export const COLLECTIONS = [
  "Abbraccio",
  "Voltaggio",
  "Classico",
  "Carezza",
  "Petalo",
  "Eleganza",
] as const;
export type Collection = (typeof COLLECTIONS)[number];

export type Category = "engagement-rings" | "wedding-bands" | "fine-jewelry" | "mens";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  collection: Collection;
  price: number;
  metals: Metal[];
  image: string;
  hoverImage: string;
  gallery: string[];
  badge?: string;
  newest: number; // higher = newer
  description: string;
  craftsmanship: string;
  specs: { label: string; value: string }[];
};

const ringImgs = [engagementImg, bandImg, fineImg];
const bandImgs = [bandImg, engagementImg, fineImg];
const fineImgs = [fineImg, bandImg, engagementImg];
const mensImgs = [mensImg, bandImg, engagementImg];

type Seed = {
  name: string;
  category: Category;
  subcategory: string;
  collection: Collection;
  price: number;
  badge?: string;
  metals?: Metal[];
  description: string;
};

const seeds: Seed[] = [
  // Engagement rings
  {
    name: "Abbraccio Single-Wire Solitaire",
    category: "engagement-rings",
    subcategory: "Solitaire",
    collection: "Abbraccio",
    price: 4850,
    badge: "Icon",
    description:
      "The original embrace. One continuous wire wraps the center stone and returns to itself — two lives, one unbroken line.",
  },
  {
    name: "Abbraccio Twin Halo",
    category: "engagement-rings",
    subcategory: "Halo",
    collection: "Abbraccio",
    price: 6420,
    description:
      "Two intertwined wires open into a whisper-thin halo, catching light from every approach.",
  },
  {
    name: "Voltaggio Braided Pavé",
    category: "engagement-rings",
    subcategory: "Pavé",
    collection: "Voltaggio",
    price: 7290,
    badge: "Award Winner",
    description:
      "Hand-braided strands of precious metal carry a current of micro-pavé toward the center stone.",
  },
  {
    name: "Voltaggio Tension Oval",
    category: "engagement-rings",
    subcategory: "Solitaire",
    collection: "Voltaggio",
    price: 8150,
    description: "An oval center held in suspended tension between two mirror-polished shoulders.",
  },
  {
    name: "Classico Six-Prong Solitaire",
    category: "engagement-rings",
    subcategory: "Solitaire",
    collection: "Classico",
    price: 3980,
    description: "Uncomplicated and eternal — a knife-edge band and six hand-formed prongs.",
  },
  {
    name: "Classico Cathedral Trilogy",
    category: "engagement-rings",
    subcategory: "Three Stone",
    collection: "Classico",
    price: 9640,
    description: "Past, present and future set beneath softly rising cathedral arches.",
  },
  {
    name: "Carezza Cushion Halo",
    category: "engagement-rings",
    subcategory: "Halo",
    collection: "Carezza",
    price: 6890,
    description: "A caress of milgrain traces the cushion halo, softening every edge.",
  },
  {
    name: "Carezza Emerald Bezel",
    category: "engagement-rings",
    subcategory: "Bezel",
    collection: "Carezza",
    price: 7740,
    badge: "New",
    description: "An emerald cut cradled in a full bezel — architectural, quiet, absolute.",
  },
  {
    name: "Petalo Floret Engagement Ring",
    category: "engagement-rings",
    subcategory: "Vintage",
    collection: "Petalo",
    price: 5460,
    description: "Hand-cut petals unfurl around the center stone in sculpted relief.",
  },
  {
    name: "Petalo Pear Vine",
    category: "engagement-rings",
    subcategory: "Vintage",
    collection: "Petalo",
    price: 6120,
    description: "A pear center rests on a climbing vine of diamond buds and polished leaves.",
  },
  {
    name: "Eleganza Marquise Trellis",
    category: "engagement-rings",
    subcategory: "Three Stone",
    collection: "Eleganza",
    price: 10480,
    badge: "Limited Edition",
    description: "Marquise side stones flank the center in an open trellis of hand-drawn wire.",
  },
  {
    name: "Eleganza Asscher Deco",
    category: "engagement-rings",
    subcategory: "Vintage",
    collection: "Eleganza",
    price: 11250,
    description: "Deco geometry and an Asscher center — sacred proportion made wearable.",
  },

  // Wedding bands — her
  {
    name: "Abbraccio Her Eternity Band",
    category: "wedding-bands",
    subcategory: "Her Bands",
    collection: "Abbraccio",
    price: 3450,
    badge: "Best Seller",
    description: "A full circle of shared-prong diamonds set in one continuous embrace.",
  },
  {
    name: "Carezza Milgrain Half Band",
    category: "wedding-bands",
    subcategory: "Her Bands",
    collection: "Carezza",
    price: 2180,
    description: "Fine milgrain edges frame a half-circle of hand-set brilliant diamonds.",
  },
  {
    name: "Petalo Scalloped Stacking Band",
    category: "wedding-bands",
    subcategory: "Her Bands",
    collection: "Petalo",
    price: 1690,
    description: "A scalloped silhouette designed to nest against any Danhov engagement ring.",
  },
  {
    name: "Eleganza Contour Diamond Band",
    category: "wedding-bands",
    subcategory: "Award Winners",
    collection: "Eleganza",
    price: 3980,
    badge: "Award Winner",
    description: "A sculpted contour that follows the curve of the center setting exactly.",
  },
  // Wedding bands — his
  {
    name: "Voltaggio His Braided Band",
    category: "wedding-bands",
    subcategory: "His Bands",
    collection: "Voltaggio",
    price: 2650,
    description: "Six strands of hand-braided metal, finished with a soft satin brush.",
  },
  {
    name: "Classico His Beveled Band",
    category: "wedding-bands",
    subcategory: "His Bands",
    collection: "Classico",
    price: 1980,
    description: "A 6mm beveled profile with a comfort-fit interior, polished by hand.",
  },
  {
    name: "Classico Hammered Comfort Band",
    category: "wedding-bands",
    subcategory: "His Bands",
    collection: "Classico",
    price: 2240,
    description: "Hand-hammered texture that holds light like brushed stone.",
  },
  {
    name: "Voltaggio Twin Wire Band",
    category: "wedding-bands",
    subcategory: "Award Winners",
    collection: "Voltaggio",
    price: 3120,
    badge: "Award Winner",
    description: "Two wires cross and rejoin — the Danhov signature, stated plainly.",
  },

  // Fine jewelry
  {
    name: "Carezza Diamond Drop Earrings",
    category: "fine-jewelry",
    subcategory: "Earrings",
    collection: "Carezza",
    price: 4320,
    description: "Articulated drops that move with the wearer, suspended from pavé studs.",
  },
  {
    name: "Petalo Floret Studs",
    category: "fine-jewelry",
    subcategory: "Earrings",
    collection: "Petalo",
    price: 1780,
    description: "Petal clusters of graduated brilliants, set in recycled 18k gold.",
  },
  {
    name: "Abbraccio Embrace Pendant",
    category: "fine-jewelry",
    subcategory: "Pendants",
    collection: "Abbraccio",
    price: 2260,
    badge: "New",
    description: "The single-wire motif, drawn into a pendant that rests just below the collarbone.",
  },
  {
    name: "Eleganza Deco Line Pendant",
    category: "fine-jewelry",
    subcategory: "Pendants",
    collection: "Eleganza",
    price: 3140,
    description: "A slender baguette line pendant on a hand-finished cable chain.",
  },
  {
    name: "Voltaggio Stacking Ring Trio",
    category: "fine-jewelry",
    subcategory: "Rings",
    collection: "Voltaggio",
    price: 2890,
    description: "Three braided stacking rings, sold as an intentionally mismatched set.",
  },
  {
    name: "Classico Anniversary Band",
    category: "fine-jewelry",
    subcategory: "Bands",
    collection: "Classico",
    price: 2540,
    description: "A channel-set anniversary band with square-edge precision.",
  },
  {
    name: "Eleganza Atelier Cuff",
    category: "fine-jewelry",
    subcategory: "Limited Edition",
    collection: "Eleganza",
    price: 12800,
    badge: "Limited Edition",
    description: "One of twelve. A hand-forged cuff finished in the Cahuenga atelier.",
  },

  // Men's
  {
    name: "Voltaggio Signet Ring",
    category: "mens",
    subcategory: "Signets",
    collection: "Voltaggio",
    price: 2980,
    badge: "New",
    metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
    description: "A weighted signet face, brushed flat, ready for hand engraving.",
  },
  {
    name: "Classico Onyx Signet",
    category: "mens",
    subcategory: "Signets",
    collection: "Classico",
    price: 3260,
    metals: ["Platinum", "18k Yellow Gold"],
    description: "Black onyx set flush into a squared signet shoulder.",
  },
  {
    name: "Voltaggio Wide Braided Band",
    category: "mens",
    subcategory: "Bands",
    collection: "Voltaggio",
    price: 3480,
    description: "An 8mm braided band — the widest expression of the Voltaggio weave.",
  },
  {
    name: "Classico Satin Band 7mm",
    category: "mens",
    subcategory: "Bands",
    collection: "Classico",
    price: 2120,
    description: "Satin-finished, comfort-fit, quietly substantial.",
  },
  {
    name: "Abbraccio Link Bracelet",
    category: "mens",
    subcategory: "Bracelets",
    collection: "Abbraccio",
    price: 5640,
    metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
    description: "Interlocking single-wire links with a concealed box clasp.",
  },
  {
    name: "Eleganza Bar Bracelet",
    category: "mens",
    subcategory: "Bracelets",
    collection: "Eleganza",
    price: 4180,
    description: "Polished bars alternating with brushed spacers on a flexible spine.",
  },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function galleryFor(category: Category) {
  if (category === "wedding-bands") return bandImgs;
  if (category === "fine-jewelry") return fineImgs;
  if (category === "mens") return mensImgs;
  return ringImgs;
}

export const products: Product[] = seeds.map((seed, i) => {
  const gallery = galleryFor(seed.category);
  return {
    slug: slugify(seed.name),
    name: seed.name,
    category: seed.category,
    subcategory: seed.subcategory,
    collection: seed.collection,
    price: seed.price,
    metals: seed.metals ?? [...METALS],
    image: gallery[0],
    hoverImage: gallery[1],
    gallery,
    badge: seed.badge,
    newest: seeds.length - i,
    description: seed.description,
    craftsmanship:
      "Formed from a single continuous wire, hand-finished over 40+ hours in our Los Angeles atelier using 100% recycled precious metal and responsibly sourced stones. Every piece is made to order — never speculatively produced.",
    specs: [
      { label: "Collection", value: seed.collection },
      { label: "Category", value: seed.subcategory },
      { label: "Center stone", value: "Responsibly sourced, GIA graded" },
      { label: "Setting", value: "Hand-formed prongs, single-wire construction" },
      { label: "Metal", value: "100% recycled platinum or 18k gold" },
      { label: "Made in", value: "Los Angeles, California" },
      { label: "Warranty", value: "Lifetime craftsmanship warranty" },
    ],
  };
});

export const CATEGORY_META: Record<
  Category,
  { title: string; eyebrow: string; blurb: string; subcategories: string[] }
> = {
  "engagement-rings": {
    title: "Engagement Rings",
    eyebrow: "The Proposal",
    blurb:
      "Every Danhov engagement ring begins as one continuous wire. Sacred geometry, hand-formed in Los Angeles.",
    subcategories: ["Solitaire", "Halo", "Three Stone", "Pavé", "Bezel", "Vintage"],
  },
  "wedding-bands": {
    title: "Wedding Bands",
    eyebrow: "The Vow",
    blurb:
      "Bands for her and for him, including our award-winning contours — designed to sit against the ring you already love.",
    subcategories: ["Her Bands", "His Bands", "Award Winners"],
  },
  "fine-jewelry": {
    title: "Fine Jewelry",
    eyebrow: "Every Day",
    blurb:
      "Earrings, pendants, rings and bands carrying the Danhov single-wire signature beyond the engagement.",
    subcategories: ["Earrings", "Pendants", "Rings", "Bands", "Limited Edition"],
  },
  mens: {
    title: "Men's",
    eyebrow: "For Him",
    blurb:
      "A curated collection of signets, wide bands and bracelets — weighted, tactile, hand-finished.",
    subcategories: ["Signets", "Bands", "Bracelets"],
  },
};

export const DIAMOND_SHAPES = [
  "Round",
  "Oval",
  "Cushion",
  "Emerald",
  "Radiant",
  "Pear",
  "Princess",
  "Marquise",
  "Asscher",
  "Heart",
] as const;

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}
