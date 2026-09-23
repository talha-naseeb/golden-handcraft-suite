/**
 * AURELIA JEWELS — catalog data layer.
 *
 * All data here is local mock data. Every accessor is a pure function so the
 * same call sites can later be swapped for API/database calls without touching
 * the UI components.
 */

import imgRing from "@/assets/product-engagement.jpg";
import imgBand from "@/assets/product-band.jpg";
import imgFine from "@/assets/product-fine.jpg";
import imgMens from "@/assets/product-mens.jpg";
import imgHero from "@/assets/aurelia-hero.jpg";
import imgBespoke from "@/assets/aurelia-bespoke.jpg";
import imgStones from "@/assets/aurelia-create-ring.jpg";
import imgStore from "@/assets/aurelia-store.jpg";
import imgAtelier from "@/assets/atelier.jpg";
import imgHeroRing from "@/assets/hero-ring.jpg";

export const IMAGES = {
  hero: imgHero,
  bespoke: imgBespoke,
  stones: imgStones,
  store: imgStore,
  atelier: imgAtelier,
  heroRing: imgHeroRing,
  ring: imgRing,
  band: imgBand,
  fine: imgFine,
  mens: imgMens,
};

/* ------------------------------------------------------------------ types */

export type Category =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "charms"
  | "engagement"
  | "wedding";

export type Metal =
  | "18k Yellow Gold"
  | "18k White Gold"
  | "18k Rose Gold"
  | "Platinum"
  | "Sterling Silver";

export type GemstoneName =
  | "Diamond"
  | "Sapphire"
  | "Emerald"
  | "Ruby"
  | "Aquamarine"
  | "Opal"
  | "Pearl"
  | "Tourmaline"
  | "Tanzanite"
  | "None";

export type Availability = "In Stock" | "Made to Order" | "Ready to Ship";

export type Product = {
  id: string;
  slug: string;
  name: string;
  designerSlug: string;
  collectionSlug: string;
  category: Category;
  subcategory: string;
  price: number;
  metals: Metal[];
  gemstone: GemstoneName;
  color: string;
  availability: Availability;
  sizes?: string[];
  images: string[];
  badge?: string;
  bestSellerRank?: number;
  createdAt: string;
  description: string;
  details: string[];
  materials: string[];
  dimensions: string;
  care: string;
};

export type Designer = {
  slug: string;
  name: string;
  location: string;
  founded: number;
  tagline: string;
  bio: string;
  philosophy: string;
  image: string;
  featured: boolean;
  independent: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  eyebrow: string;
  blurb: string;
  image: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  bullets: string[];
  cta: string;
  image: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  category:
    | "Jewelry"
    | "Engagement"
    | "Wedding"
    | "Designers"
    | "Gemstones"
    | "Style"
    | "Stories"
    | "Education";
  excerpt: string;
  author: string;
  date: string;
  readingMinutes: number;
  image: string;
  body: string[];
  relatedProducts: string[];
};

export type RingSetting = {
  slug: string;
  name: string;
  designerSlug: string;
  style: "Solitaire" | "Side Stone" | "Halo" | "Three Stone" | "Vintage" | "Bezel";
  metals: Metal[];
  price: number;
  image: string;
  description: string;
};

export type Gemstone = {
  id: string;
  type: "Diamond" | "Sapphire" | "Emerald" | "Ruby" | "Tourmaline" | "Aquamarine";
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  certification: string;
  origin: "Natural" | "Lab Grown";
  price: number;
};

export type CartItem = {
  key: string;
  productSlug?: string;
  metal?: Metal;
  size?: string;
  quantity: number;
  custom?: { settingSlug: string; gemstoneId: string };
};

export type WishlistItem = { productSlug: string; addedAt: string };

export type OrderStatus = "Processing" | "Crafting" | "Shipped" | "Delivered";

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  shipping: string;
  tracking?: string;
  items: { productSlug: string; quantity: number; price: number }[];
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  addresses: {
    id: string;
    label: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
  }[];
};

export type Appointment = {
  id: string;
  service: string;
  mode: "Virtual" | "In-Store";
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  customer: string;
};

/* ------------------------------------------------------------- constants */

export const METALS: Metal[] = [
  "18k Yellow Gold",
  "18k White Gold",
  "18k Rose Gold",
  "Platinum",
  "Sterling Silver",
];

export const GEMSTONES: GemstoneName[] = [
  "Diamond",
  "Sapphire",
  "Emerald",
  "Ruby",
  "Aquamarine",
  "Opal",
  "Pearl",
  "Tourmaline",
  "Tanzanite",
];

export const COLORS = ["White", "Yellow", "Rose", "Blue", "Green", "Red", "Multi"];

export const AVAILABILITY: Availability[] = ["In Stock", "Ready to Ship", "Made to Order"];

export const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"];

export const DIAMOND_SHAPES = [
  "Round",
  "Oval",
  "Cushion",
  "Emerald",
  "Pear",
  "Radiant",
  "Princess",
  "Marquise",
  "Asscher",
  "Heart",
];

export const CATEGORY_META: Record<
  Category,
  { title: string; eyebrow: string; blurb: string; subcategories: string[] }
> = {
  rings: {
    title: "Rings",
    eyebrow: "Fine Jewelry",
    blurb:
      "Stacking bands, signets and statement stones — designed to be layered, lived in and handed down.",
    subcategories: ["Stacking", "Signet", "Statement", "Eternity"],
  },
  necklaces: {
    title: "Necklaces",
    eyebrow: "Fine Jewelry",
    blurb: "Pendants, chains and lariats in recycled gold, cut for the collarbone.",
    subcategories: ["Pendants", "Chains", "Lariats", "Chokers"],
  },
  earrings: {
    title: "Earrings",
    eyebrow: "Fine Jewelry",
    blurb: "Studs to shoulder-dusters, balanced by hand for all-day wear.",
    subcategories: ["Studs", "Hoops", "Drops", "Ear Climbers"],
  },
  bracelets: {
    title: "Bracelets",
    eyebrow: "Fine Jewelry",
    blurb: "Bangles, tennis bracelets and chain links with concealed clasps.",
    subcategories: ["Bangles", "Tennis", "Chain", "Cuffs"],
  },
  charms: {
    title: "Charms",
    eyebrow: "Fine Jewelry",
    blurb: "Collectable charms and birthstones to build a piece that is only yours.",
    subcategories: ["Charms", "Birthstones", "Lockets"],
  },
  engagement: {
    title: "Engagement Rings",
    eyebrow: "The Proposal",
    blurb:
      "Responsibly sourced centre stones set in hand-finished settings — ready to ship or made to order.",
    subcategories: ["Solitaire", "Side Stone", "Halo", "Three Stone", "Gemstone"],
  },
  wedding: {
    title: "Wedding Bands",
    eyebrow: "The Vow",
    blurb: "Bands for both of you, sized and finished in our New York workshop.",
    subcategories: ["Women's Bands", "Men's Bands", "Eternity", "Contour"],
  },
};

/* ------------------------------------------------------------- designers */

export const designers: Designer[] = [
  {
    slug: "maison-verrine",
    name: "Maison Verrine",
    location: "Paris, France",
    founded: 1998,
    tagline: "Architectural gold, softened by hand.",
    bio: "Claire Verrine trained as an architect before turning to goldsmithing. Her studio in the Marais works almost exclusively in recycled 18k gold, finishing each surface with a hand file rather than a polishing wheel.",
    philosophy:
      "Structure first, ornament second. A piece should read as a single considered line from across a room.",
    image: IMAGES.atelier,
    featured: true,
    independent: true,
  },
  {
    slug: "halden-co",
    name: "Halden & Co.",
    location: "New York, NY",
    founded: 1986,
    tagline: "American classicism, quietly stated.",
    bio: "A second-generation family workshop on West 47th Street, Halden & Co. is known for its bright-cut pavé and for setting stones that other houses consider too difficult.",
    philosophy: "Nothing decorative that isn't also structural.",
    image: IMAGES.bespoke,
    featured: true,
    independent: false,
  },
  {
    slug: "iolite-studio",
    name: "Iolite Studio",
    location: "Lisbon, Portugal",
    founded: 2014,
    tagline: "Colour, treated as a material.",
    bio: "Iolite Studio sources unusual sapphires and tourmalines directly from small-scale cutters, then builds the setting around whatever the stone wants to be.",
    philosophy: "Let the rough decide the shape.",
    image: IMAGES.stones,
    featured: true,
    independent: true,
  },
  {
    slug: "orin-fields",
    name: "Orin Fields",
    location: "Santa Fe, NM",
    founded: 2009,
    tagline: "Hand-forged, deliberately imperfect.",
    bio: "Orin Fields hammers every band from a single ingot. No two pieces share a surface, and the studio produces fewer than four hundred pieces a year.",
    philosophy: "The mark of the hammer is the signature.",
    image: IMAGES.mens,
    featured: false,
    independent: true,
  },
  {
    slug: "celestine",
    name: "Celestine",
    location: "Antwerp, Belgium",
    founded: 1974,
    tagline: "Diamond specialists since 1974.",
    bio: "Celestine holds one of the oldest independent diamond-cutting licences in Antwerp and cuts to proportions rather than to weight.",
    philosophy: "Brilliance is arithmetic before it is romance.",
    image: IMAGES.ring,
    featured: true,
    independent: false,
  },
  {
    slug: "amara-leal",
    name: "Amara Leal",
    location: "Mexico City, Mexico",
    founded: 2017,
    tagline: "Sculptural silver and gold.",
    bio: "Amara Leal casts from wax models carved by hand, producing pieces that feel closer to small sculpture than to conventional jewellery.",
    philosophy: "Weight is a form of reassurance.",
    image: IMAGES.fine,
    featured: false,
    independent: true,
  },
  {
    slug: "north-and-vine",
    name: "North & Vine",
    location: "Portland, OR",
    founded: 2011,
    tagline: "Everyday gold, made to be worn together.",
    bio: "North & Vine designs for stacking. Every chain, charm and band in the line is dimensioned to sit against the rest of it.",
    philosophy: "Jewellery should accumulate, not compete.",
    image: IMAGES.band,
    featured: false,
    independent: true,
  },
  {
    slug: "seren-atelier",
    name: "Seren Atelier",
    location: "Istanbul, Türkiye",
    founded: 2003,
    tagline: "Granulation and antique technique.",
    bio: "Seren Atelier revived Byzantine granulation, fusing thousands of gold beads without solder — a process the studio teaches to two apprentices at a time.",
    philosophy: "Old techniques, used honestly, never read as costume.",
    image: IMAGES.store,
    featured: true,
    independent: true,
  },
  {
    slug: "lior-bey",
    name: "Lior Bey",
    location: "Tel Aviv, Israel",
    founded: 2015,
    tagline: "Minimal settings for unusual stones.",
    bio: "Lior Bey works with salt-and-pepper diamonds and heavily included stones, using bezels so thin they nearly disappear.",
    philosophy: "An inclusion is a fingerprint, not a flaw.",
    image: IMAGES.heroRing,
    featured: false,
    independent: true,
  },
  {
    slug: "atelier-rowe",
    name: "Atelier Rowe",
    location: "London, United Kingdom",
    founded: 1992,
    tagline: "Bridal, reconsidered.",
    bio: "Atelier Rowe makes bridal jewellery for people who dislike bridal jewellery — unpolished platinum, low profiles, no filigree.",
    philosophy: "A ring worn for fifty years should look like it was designed for the fiftieth.",
    image: IMAGES.hero,
    featured: true,
    independent: false,
  },
];

/* ----------------------------------------------------------- collections */

export const collections: Collection[] = [
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    eyebrow: "Just In",
    blurb: "The newest pieces to arrive in the showroom, added weekly.",
    image: IMAGES.fine,
    },
  {
    slug: "aurelia-signature",
    name: "Aurelia Signature",
    eyebrow: "In House",
    blurb: "Our own line, drawn in New York and made within a mile of the showroom.",
    image: IMAGES.hero,
  },
  {
    slug: "the-light-series",
    name: "The Light Series",
    eyebrow: "Diamonds",
    blurb: "Open settings and bright-cut pavé built to move light rather than hold it.",
    image: IMAGES.ring,
  },
  {
    slug: "colour-study",
    name: "Colour Study",
    eyebrow: "Gemstones",
    blurb: "Sapphires, tourmalines and emeralds chosen for hue before size.",
    image: IMAGES.stones,
  },
  {
    slug: "everyday-gold",
    name: "Everyday Gold",
    eyebrow: "Wear Daily",
    blurb: "Solid recycled gold with nothing to catch, snag or come loose.",
    image: IMAGES.band,
  },
  {
    slug: "heirloom",
    name: "Heirloom",
    eyebrow: "Archive",
    blurb: "Antique-technique pieces and restored settings, one of each only.",
    image: IMAGES.atelier,
  },
  {
    slug: "the-vow",
    name: "The Vow",
    eyebrow: "Bridal",
    blurb: "Engagement rings and bands designed as a set from the first sketch.",
    image: IMAGES.bespoke,
  },
  {
    slug: "for-him",
    name: "For Him",
    eyebrow: "Men's",
    blurb: "Signets, wide bands and bracelets with weight and a matte finish.",
    image: IMAGES.mens,
  },
];

/* -------------------------------------------------------------- products */

type Seed = Omit<
  Product,
  | "id"
  | "slug"
  | "images"
  | "details"
  | "materials"
  | "dimensions"
  | "care"
  | "createdAt"
  | "color"
> & { color?: string; dimensions?: string; daysAgo: number };

const seeds: Seed[] = [
  // ---- Engagement (8)
  {
    name: "Lumen Round Solitaire",
    designerSlug: "celestine",
    collectionSlug: "the-light-series",
    category: "engagement",
    subcategory: "Solitaire",
    price: 6850,
    metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    badge: "Bestseller",
    bestSellerRank: 1,
    daysAgo: 24,
    description:
      "A 1.20ct round brilliant held four prongs above a 1.8mm knife-edge band. The basket is cut away entirely so light enters the stone from beneath.",
  },
  {
    name: "Aster Oval Side Stone",
    designerSlug: "atelier-rowe",
    collectionSlug: "the-vow",
    category: "engagement",
    subcategory: "Side Stone",
    price: 9240,
    metals: ["Platinum", "18k White Gold"],
    gemstone: "Diamond",
    availability: "Made to Order",
    sizes: RING_SIZES,
    daysAgo: 12,
    description:
      "An elongated oval centre flanked by two tapered baguettes, set low enough to sit flush against a wedding band.",
  },
  {
    name: "Verrine Cathedral Solitaire",
    designerSlug: "maison-verrine",
    collectionSlug: "aurelia-signature",
    category: "engagement",
    subcategory: "Solitaire",
    price: 5480,
    metals: ["18k Yellow Gold", "18k White Gold", "Platinum"],
    gemstone: "Diamond",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    daysAgo: 40,
    description:
      "Two rising shoulders carry the centre stone without a visible basket — architecture doing the work of ornament.",
  },
  {
    name: "Halden Bright-Cut Halo",
    designerSlug: "halden-co",
    collectionSlug: "the-light-series",
    category: "engagement",
    subcategory: "Halo",
    price: 7960,
    metals: ["Platinum", "18k White Gold"],
    gemstone: "Diamond",
    availability: "In Stock",
    sizes: RING_SIZES,
    bestSellerRank: 4,
    daysAgo: 62,
    description:
      "Sixty-four bright-cut diamonds form a halo one-third the width of a conventional setting, hand-set in a single sitting.",
  },
  {
    name: "Iolite Ceylon Sapphire Ring",
    designerSlug: "iolite-studio",
    collectionSlug: "colour-study",
    category: "engagement",
    subcategory: "Gemstone",
    price: 4380,
    metals: ["18k Yellow Gold", "18k Rose Gold"],
    gemstone: "Sapphire",
    color: "Blue",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    badge: "One of One",
    daysAgo: 6,
    description:
      "A 2.05ct unheated cornflower Ceylon sapphire in a hand-carved bezel, purchased directly from the cutter.",
  },
  {
    name: "Rowe Three Stone Emerald Cut",
    designerSlug: "atelier-rowe",
    collectionSlug: "the-vow",
    category: "engagement",
    subcategory: "Three Stone",
    price: 12400,
    metals: ["Platinum"],
    gemstone: "Diamond",
    availability: "Made to Order",
    sizes: RING_SIZES,
    daysAgo: 30,
    description:
      "An emerald-cut centre with two trapezoid shoulders, all three stones matched for colour across a single parcel.",
  },
  {
    name: "Bey Salt & Pepper Bezel",
    designerSlug: "lior-bey",
    collectionSlug: "heirloom",
    category: "engagement",
    subcategory: "Solitaire",
    price: 2980,
    metals: ["18k Yellow Gold", "Platinum"],
    gemstone: "Diamond",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    daysAgo: 9,
    description:
      "A 1.60ct hexagonal salt-and-pepper diamond in a 0.4mm bezel — grey, cloudy, and entirely its own.",
  },
  {
    name: "Seren Granulated Engagement Ring",
    designerSlug: "seren-atelier",
    collectionSlug: "heirloom",
    category: "engagement",
    subcategory: "Halo",
    price: 8650,
    metals: ["18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "Made to Order",
    sizes: RING_SIZES,
    daysAgo: 75,
    description:
      "Nine hundred fused gold beads surround an old European cut diamond, built without a drop of solder.",
  },

  // ---- Wedding (5)
  {
    name: "Rowe Unpolished Platinum Band",
    designerSlug: "atelier-rowe",
    collectionSlug: "the-vow",
    category: "wedding",
    subcategory: "Men's Bands",
    price: 1740,
    metals: ["Platinum", "18k White Gold"],
    gemstone: "None",
    availability: "In Stock",
    sizes: RING_SIZES,
    daysAgo: 55,
    description: "A 4mm band left deliberately unpolished, so wear reads as patina rather than damage.",
  },
  {
    name: "Halden Eternity Band",
    designerSlug: "halden-co",
    collectionSlug: "the-light-series",
    category: "wedding",
    subcategory: "Eternity",
    price: 4260,
    metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "In Stock",
    sizes: RING_SIZES,
    bestSellerRank: 3,
    daysAgo: 48,
    description: "A full circle of shared-prong round brilliants, 2.4mm wide, hand-set front and back.",
  },
  {
    name: "Verrine Contour Band",
    designerSlug: "maison-verrine",
    collectionSlug: "the-vow",
    category: "wedding",
    subcategory: "Contour",
    price: 2180,
    metals: ["18k White Gold", "18k Yellow Gold", "Platinum"],
    gemstone: "Diamond",
    availability: "Made to Order",
    sizes: RING_SIZES,
    daysAgo: 20,
    description: "Cut to follow the curve of your engagement setting exactly, with a four-stone pavé arc.",
  },
  {
    name: "Fields Hammered Wide Band",
    designerSlug: "orin-fields",
    collectionSlug: "for-him",
    category: "wedding",
    subcategory: "Men's Bands",
    price: 1980,
    metals: ["18k Yellow Gold", "Platinum"],
    gemstone: "None",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    daysAgo: 15,
    description: "A 6mm band hammered from a single ingot, with a comfort-fit interior.",
  },
  {
    name: "North & Vine Thin Stacking Band",
    designerSlug: "north-and-vine",
    collectionSlug: "everyday-gold",
    category: "wedding",
    subcategory: "Women's Bands",
    price: 620,
    metals: ["18k Yellow Gold", "18k Rose Gold", "18k White Gold"],
    gemstone: "None",
    availability: "In Stock",
    sizes: RING_SIZES,
    bestSellerRank: 6,
    daysAgo: 4,
    description: "A 1.2mm solid gold band dimensioned to nest with anything else in the line.",
  },

  // ---- Rings (4)
  {
    name: "Leal Sculpted Signet",
    designerSlug: "amara-leal",
    collectionSlug: "for-him",
    category: "rings",
    subcategory: "Signet",
    price: 1450,
    metals: ["18k Yellow Gold", "Sterling Silver"],
    gemstone: "None",
    availability: "In Stock",
    sizes: RING_SIZES,
    daysAgo: 18,
    description: "A hand-carved signet face with a soft concave top, ready for engraving.",
  },
  {
    name: "Iolite Tourmaline Cocktail Ring",
    designerSlug: "iolite-studio",
    collectionSlug: "colour-study",
    category: "rings",
    subcategory: "Statement",
    price: 3260,
    metals: ["18k Yellow Gold"],
    gemstone: "Tourmaline",
    color: "Green",
    availability: "Ready to Ship",
    sizes: RING_SIZES,
    badge: "One of One",
    daysAgo: 3,
    description: "A 6.40ct mint tourmaline in an open gallery that lets light through the pavilion.",
  },
  {
    name: "Verrine Stacking Trio",
    designerSlug: "maison-verrine",
    collectionSlug: "everyday-gold",
    category: "rings",
    subcategory: "Stacking",
    price: 1180,
    metals: ["18k Yellow Gold", "18k White Gold", "18k Rose Gold"],
    gemstone: "Diamond",
    availability: "In Stock",
    sizes: RING_SIZES,
    bestSellerRank: 5,
    daysAgo: 11,
    description: "Three intentionally mismatched bands — plain, hammered and single-stone — sold as a set.",
  },
  {
    name: "Seren Granulated Dome Ring",
    designerSlug: "seren-atelier",
    collectionSlug: "heirloom",
    category: "rings",
    subcategory: "Statement",
    price: 2740,
    metals: ["18k Yellow Gold"],
    gemstone: "None",
    availability: "Made to Order",
    sizes: RING_SIZES,
    daysAgo: 36,
    description: "A domed ring surfaced entirely in fused gold granules, matte from the acid bath.",
  },

  // ---- Necklaces (5)
  {
    name: "Lumen Pear Pendant",
    designerSlug: "celestine",
    collectionSlug: "the-light-series",
    category: "necklaces",
    subcategory: "Pendants",
    price: 2860,
    metals: ["18k White Gold", "18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "In Stock",
    badge: "Bestseller",
    bestSellerRank: 2,
    daysAgo: 8,
    description: "A 0.70ct pear brilliant on a 16in cable chain with a hidden 18in extender.",
  },
  {
    name: "North & Vine Layering Chain",
    designerSlug: "north-and-vine",
    collectionSlug: "everyday-gold",
    category: "necklaces",
    subcategory: "Chains",
    price: 740,
    metals: ["18k Yellow Gold", "18k Rose Gold"],
    gemstone: "None",
    availability: "In Stock",
    daysAgo: 2,
    description: "A 1.5mm solid gold cable chain with a lobster clasp that sits flat under a collar.",
  },
  {
    name: "Iolite Sapphire Lariat",
    designerSlug: "iolite-studio",
    collectionSlug: "colour-study",
    category: "necklaces",
    subcategory: "Lariats",
    price: 3480,
    metals: ["18k Yellow Gold"],
    gemstone: "Sapphire",
    color: "Blue",
    availability: "Ready to Ship",
    daysAgo: 21,
    description: "Graduated teal sapphires descend a fine chain to a single drop at the sternum.",
  },
  {
    name: "Leal Cast Pendant",
    designerSlug: "amara-leal",
    collectionSlug: "aurelia-signature",
    category: "necklaces",
    subcategory: "Pendants",
    price: 980,
    metals: ["Sterling Silver", "18k Yellow Gold"],
    gemstone: "None",
    availability: "In Stock",
    daysAgo: 29,
    description: "A carved wax form cast in solid metal and left with its original tool marks.",
  },
  {
    name: "Seren Granulated Locket",
    designerSlug: "seren-atelier",
    collectionSlug: "heirloom",
    category: "necklaces",
    subcategory: "Pendants",
    price: 4120,
    metals: ["18k Yellow Gold"],
    gemstone: "Pearl",
    availability: "Made to Order",
    daysAgo: 66,
    description: "A hinged locket bordered in granulation, with a seed pearl set into the clasp.",
  },

  // ---- Earrings (4)
  {
    name: "Halden Pavé Huggie Hoops",
    designerSlug: "halden-co",
    collectionSlug: "everyday-gold",
    category: "earrings",
    subcategory: "Hoops",
    price: 1680,
    metals: ["18k White Gold", "18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "In Stock",
    bestSellerRank: 7,
    daysAgo: 14,
    description: "Bright-cut pavé across the front face only, so the back sits flat against the lobe.",
  },
  {
    name: "Celestine Diamond Studs",
    designerSlug: "celestine",
    collectionSlug: "the-light-series",
    category: "earrings",
    subcategory: "Studs",
    price: 2240,
    metals: ["Platinum", "18k White Gold", "18k Yellow Gold"],
    gemstone: "Diamond",
    availability: "Ready to Ship",
    daysAgo: 52,
    description: "A matched pair of 0.50ct round brilliants, cut to proportion rather than to weight.",
  },
  {
    name: "Verrine Architectural Drops",
    designerSlug: "maison-verrine",
    collectionSlug: "aurelia-signature",
    category: "earrings",
    subcategory: "Drops",
    price: 1920,
    metals: ["18k Yellow Gold", "18k White Gold"],
    gemstone: "None",
    availability: "In Stock",
    daysAgo: 7,
    description: "Two folded gold planes suspended from a concealed post, weighted to hang straight.",
  },
  {
    name: "Iolite Emerald Ear Climbers",
    designerSlug: "iolite-studio",
    collectionSlug: "colour-study",
    category: "earrings",
    subcategory: "Ear Climbers",
    price: 2780,
    metals: ["18k Yellow Gold"],
    gemstone: "Emerald",
    color: "Green",
    availability: "Made to Order",
    daysAgo: 33,
    description: "A rising line of Zambian emeralds that follows the curve of the ear.",
  },

  // ---- Bracelets (3)
  {
    name: "Halden Tennis Bracelet",
    designerSlug: "halden-co",
    collectionSlug: "the-light-series",
    category: "bracelets",
    subcategory: "Tennis",
    price: 7480,
    metals: ["18k White Gold", "Platinum"],
    gemstone: "Diamond",
    availability: "In Stock",
    bestSellerRank: 8,
    daysAgo: 44,
    description: "Four carats of graduated round brilliants on a double-locking clasp.",
  },
  {
    name: "Fields Forged Cuff",
    designerSlug: "orin-fields",
    collectionSlug: "for-him",
    category: "bracelets",
    subcategory: "Cuffs",
    price: 2340,
    metals: ["18k Yellow Gold", "Sterling Silver"],
    gemstone: "None",
    availability: "Ready to Ship",
    daysAgo: 17,
    description: "Forged flat from a single bar and shaped over a mandrel, with a hand-filed edge.",
  },
  {
    name: "North & Vine Charm Bracelet",
    designerSlug: "north-and-vine",
    collectionSlug: "everyday-gold",
    category: "bracelets",
    subcategory: "Chain",
    price: 890,
    metals: ["18k Yellow Gold"],
    gemstone: "None",
    availability: "In Stock",
    daysAgo: 5,
    description: "A solid gold curb chain with six soldered loops, built to carry charms.",
  },

  // ---- Charms (3)
  {
    name: "North & Vine Birthstone Charm",
    designerSlug: "north-and-vine",
    collectionSlug: "everyday-gold",
    category: "charms",
    subcategory: "Birthstones",
    price: 320,
    metals: ["18k Yellow Gold"],
    gemstone: "Aquamarine",
    color: "Blue",
    availability: "In Stock",
    daysAgo: 1,
    description: "A bezel-set birthstone charm on a jump ring, in all twelve months.",
  },
  {
    name: "Leal Talisman Charm",
    designerSlug: "amara-leal",
    collectionSlug: "aurelia-signature",
    category: "charms",
    subcategory: "Charms",
    price: 480,
    metals: ["18k Yellow Gold", "Sterling Silver"],
    gemstone: "None",
    availability: "In Stock",
    daysAgo: 26,
    description: "A small cast talisman with a carved reverse, meant to be worn against the skin.",
  },
  {
    name: "Bey Opal Charm",
    designerSlug: "lior-bey",
    collectionSlug: "colour-study",
    category: "charms",
    subcategory: "Charms",
    price: 560,
    metals: ["18k Yellow Gold"],
    gemstone: "Opal",
    color: "Multi",
    availability: "Ready to Ship",
    daysAgo: 13,
    description: "An Australian crystal opal in a thin bezel, chosen for a blue-green play of colour.",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function galleryFor(category: Category): string[] {
  switch (category) {
    case "engagement":
      return [IMAGES.ring, IMAGES.heroRing, IMAGES.stones, IMAGES.bespoke];
    case "wedding":
      return [IMAGES.band, IMAGES.ring, IMAGES.bespoke, IMAGES.atelier];
    case "necklaces":
      return [IMAGES.hero, IMAGES.fine, IMAGES.store, IMAGES.atelier];
    case "earrings":
      return [IMAGES.fine, IMAGES.hero, IMAGES.store, IMAGES.atelier];
    case "bracelets":
      return [IMAGES.mens, IMAGES.band, IMAGES.atelier, IMAGES.store];
    case "charms":
      return [IMAGES.fine, IMAGES.stones, IMAGES.band, IMAGES.store];
    default:
      return [IMAGES.band, IMAGES.mens, IMAGES.fine, IMAGES.atelier];
  }
}

function colorFor(seed: Seed): string {
  if (seed.color) return seed.color;
  const metal = seed.metals[0] ?? "18k Yellow Gold";
  if (metal.includes("Rose")) return "Rose";
  if (metal.includes("Yellow")) return "Yellow";
  return "White";
}

function isoDaysAgo(days: number) {
  const base = Date.UTC(2026, 8, 20);
  return new Date(base - days * 86400000).toISOString();
}

export const products: Product[] = seeds.map((seed, index) => {
  const slug = slugify(seed.name);
  const designer = designers.find((d) => d.slug === seed.designerSlug);
  return {
    id: `AUR-${String(index + 1).padStart(3, "0")}`,
    slug,
    name: seed.name,
    designerSlug: seed.designerSlug,
    collectionSlug: seed.collectionSlug,
    category: seed.category,
    subcategory: seed.subcategory,
    price: seed.price,
    metals: seed.metals,
    gemstone: seed.gemstone,
    color: colorFor(seed),
    availability: seed.availability,
    ...(seed.sizes ? { sizes: seed.sizes } : {}),
    images: galleryFor(seed.category),
    ...(seed.badge ? { badge: seed.badge } : {}),
    ...(seed.bestSellerRank ? { bestSellerRank: seed.bestSellerRank } : {}),
    createdAt: isoDaysAgo(seed.daysAgo),
    description: seed.description,
    details: [
      `Designed and made by ${designer?.name ?? "our atelier"} in ${designer?.location ?? "New York"}.`,
      `${seed.availability === "Made to Order" ? "Made to order in 4–6 weeks." : "Ships within 2 business days, fully insured."}`,
      "Complimentary sizing, engraving and lifetime cleaning at our New York showroom.",
      "Each piece arrives in an Aurelia presentation case with its full specification card.",
    ],
    materials: [
      `Metal: ${seed.metals.join(" · ")} — 100% recycled`,
      seed.gemstone === "None"
        ? "No stones; hand-finished metal surface"
        : `Stone: ${seed.gemstone}, responsibly sourced and independently graded`,
      "Nickel free and hypoallergenic",
    ],
    dimensions:
      seed.dimensions ??
      (seed.category === "necklaces"
        ? "16in chain with 18in extender; pendant 9mm x 6mm"
        : seed.category === "earrings"
          ? "Drop 22mm; width 8mm; post and friction back"
          : seed.category === "bracelets"
            ? "7in length adjustable to 6.5in; width 3.4mm"
            : "Band width 1.8mm; setting height 6.2mm"),
    care:
      "Clean with warm water, a drop of unscented soap and a soft brush. Remove before swimming, sport or sleeping. We clean and check settings free of charge, for life.",
  };
});

/* -------------------------------------------------------------- services */

export const services: Service[] = [
  {
    slug: "bespoke-design",
    name: "Bespoke Design",
    summary: "A piece drawn from scratch around your story, stone and budget.",
    description:
      "We begin with a conversation, not a catalogue. Over four to twelve weeks we move from sketch to CAD to a finished piece made in our workshop.",
    bullets: ["Complimentary first consultation", "Hand sketches and CAD renders", "Stone sourcing to your brief"],
    cta: "Start your bespoke journey",
    image: IMAGES.bespoke,
  },
  {
    slug: "jewelry-repair",
    name: "Jewelry Repair",
    summary: "Retipping, resizing, restringing and stone replacement, in house.",
    description:
      "Our benches repair everything from a snapped chain to a Victorian setting. Nothing leaves the building, and nothing is sent overseas.",
    bullets: ["Free assessment and quote", "Most repairs in 5–10 days", "Antique and inherited pieces welcome"],
    cta: "Book a repair consultation",
    image: IMAGES.atelier,
  },
  {
    slug: "restyling",
    name: "Restyling",
    summary: "Turn jewelry you no longer wear into something you will.",
    description:
      "We reuse your stones and metal wherever possible, presenting two or three directions before any work begins.",
    bullets: ["Stone and metal reclaimed", "Two to three design directions", "Written estimate before work starts"],
    cta: "Discuss a restyle",
    image: IMAGES.stones,
  },
  {
    slug: "appraisals",
    name: "Appraisals",
    summary: "Independent valuations for insurance, estate and resale.",
    description:
      "Appraisals are carried out by a GIA-trained gemologist on site and issued with photography and full documentation.",
    bullets: ["Insurance replacement value", "Estate and probate valuation", "Same-day service by appointment"],
    cta: "Book an appraisal",
    image: IMAGES.store,
  },
  {
    slug: "sell-your-jewelry",
    name: "Sell Your Jewelry",
    summary: "A direct, documented offer on diamonds, gold and signed pieces.",
    description:
      "Send photographs for an indicative range, then bring the piece in for a firm offer. No obligation, no consignment.",
    bullets: ["Indicative range within 48 hours", "Firm offer in person", "Payment within one business day"],
    cta: "Request a valuation",
    image: IMAGES.mens,
  },
  {
    slug: "jewelry-concierge",
    name: "Jewelry Concierge",
    summary: "A specialist who learns what you wear and finds the rest.",
    description:
      "Tell us the occasion, the recipient and the budget. We come back with a short, considered list rather than a catalogue.",
    bullets: ["Personal recommendations", "Gift sourcing and engraving", "Private after-hours viewings"],
    cta: "Ask the concierge",
    image: IMAGES.hero,
  },
  {
    slug: "virtual-shopping",
    name: "Virtual Shopping",
    summary: "Meet a specialist by video, from anywhere.",
    description:
      "A specialist takes pieces out of the case on camera, under showroom lighting, and answers everything in real time.",
    bullets: ["45-minute video appointment", "Live stone comparisons", "Follow-up summary by email"],
    cta: "Book a virtual appointment",
    image: IMAGES.store,
  },
  {
    slug: "engraving",
    name: "Hand Engraving",
    summary: "Machine or hand engraving on anything we make.",
    description:
      "Our engraver works by hand for scripts and monograms, and by machine for fine interior dates.",
    bullets: ["Hand script and monogram", "Interior date engraving", "Complimentary on Aurelia pieces"],
    cta: "Ask about engraving",
    image: IMAGES.band,
  },
];

/* --------------------------------------------------------------- journal */

type JournalSeed = {
  title: string;
  category: JournalArticle["category"];
  excerpt: string;
  author: string;
  date: string;
  minutes: number;
  image: string;
  related?: string[];
};

const journalSeeds: JournalSeed[] = [
  {
    title: "How to Read a Diamond Certificate Without Getting Lost",
    category: "Education",
    excerpt: "Cut grade does more for brilliance than colour and clarity combined. Here is the order we actually read a report in.",
    author: "Nadia Okonjo",
    date: "2026-09-12",
    minutes: 7,
    image: IMAGES.stones,
  },
  {
    title: "Six Engagement Rings That Look Nothing Like an Engagement Ring",
    category: "Engagement",
    excerpt: "Bezels, salt-and-pepper stones and unpolished platinum for people who never wanted a solitaire.",
    author: "Marcus Hale",
    date: "2026-09-05",
    minutes: 6,
    image: IMAGES.ring,
  },
  {
    title: "Inside Maison Verrine's Marais Studio",
    category: "Designers",
    excerpt: "Claire Verrine files every surface by hand. We spent a morning watching her do it.",
    author: "Ines Fabre",
    date: "2026-08-28",
    minutes: 9,
    image: IMAGES.atelier,
  },
  {
    title: "The Case for Wearing Your Good Jewelry Every Day",
    category: "Style",
    excerpt: "Jewelry kept in a safe isn't being looked after. It's being wasted.",
    author: "Nadia Okonjo",
    date: "2026-08-21",
    minutes: 4,
    image: IMAGES.hero,
  },
  {
    title: "Sapphire Beyond Blue",
    category: "Gemstones",
    excerpt: "Teal, peach, grey and colour-change: the sapphires our buyers actually chase.",
    author: "Tomas Reyes",
    date: "2026-08-14",
    minutes: 8,
    image: IMAGES.stones,
  },
  {
    title: "What Happens in a Bespoke Consultation",
    category: "Stories",
    excerpt: "A step-by-step account of one commission, from a napkin sketch to a finished ring.",
    author: "Marcus Hale",
    date: "2026-08-07",
    minutes: 10,
    image: IMAGES.bespoke,
  },
  {
    title: "Lab Grown or Natural: An Honest Comparison",
    category: "Education",
    excerpt: "Both are diamonds. They differ in price, resale and provenance — not in beauty.",
    author: "Nadia Okonjo",
    date: "2026-07-31",
    minutes: 7,
    image: IMAGES.ring,
  },
  {
    title: "How to Build a Stack That Doesn't Look Cluttered",
    category: "Style",
    excerpt: "Three rules: one hero, repeated metal, and varied width.",
    author: "Ines Fabre",
    date: "2026-07-24",
    minutes: 5,
    image: IMAGES.band,
  },
  {
    title: "Wedding Bands for People Who Work With Their Hands",
    category: "Wedding",
    excerpt: "Low profiles, matte finishes and metals that take a knock without showing it.",
    author: "Marcus Hale",
    date: "2026-07-17",
    minutes: 6,
    image: IMAGES.mens,
  },
  {
    title: "Amara Leal on Carving Wax Before Metal",
    category: "Designers",
    excerpt: "Why the studio still models everything by hand, and what that changes.",
    author: "Ines Fabre",
    date: "2026-07-10",
    minutes: 8,
    image: IMAGES.fine,
  },
  {
    title: "Ring Sizing, Properly Explained",
    category: "Education",
    excerpt: "Your fingers change by nearly a half size across a day. Here's how to account for it.",
    author: "Nadia Okonjo",
    date: "2026-07-03",
    minutes: 5,
    image: IMAGES.band,
  },
  {
    title: "The Return of Granulation",
    category: "Jewelry",
    excerpt: "A Byzantine technique, three surviving practitioners, and why it looks modern again.",
    author: "Tomas Reyes",
    date: "2026-06-26",
    minutes: 9,
    image: IMAGES.store,
  },
  {
    title: "Choosing an Emerald Cut",
    category: "Gemstones",
    excerpt: "Step cuts hide nothing. Clarity and proportion matter more than carat.",
    author: "Tomas Reyes",
    date: "2026-06-19",
    minutes: 6,
    image: IMAGES.stones,
  },
  {
    title: "Five Couples, Five Very Different Proposals",
    category: "Stories",
    excerpt: "The rings, and the moments they were given in.",
    author: "Ines Fabre",
    date: "2026-06-12",
    minutes: 11,
    image: IMAGES.hero,
  },
  {
    title: "Responsible Sourcing Is a Paper Trail, Not a Promise",
    category: "Jewelry",
    excerpt: "What we ask of every supplier, and what we refuse to buy.",
    author: "Marcus Hale",
    date: "2026-06-05",
    minutes: 8,
    image: IMAGES.atelier,
  },
  {
    title: "A Short History of the Tennis Bracelet",
    category: "Jewelry",
    excerpt: "One dropped bracelet at the 1987 US Open, and a category was named.",
    author: "Nadia Okonjo",
    date: "2026-05-29",
    minutes: 4,
    image: IMAGES.mens,
  },
  {
    title: "Pearls, Reconsidered",
    category: "Gemstones",
    excerpt: "Baroque shapes, unusual overtones, and how to keep them alive.",
    author: "Tomas Reyes",
    date: "2026-05-22",
    minutes: 6,
    image: IMAGES.fine,
  },
  {
    title: "Restyling an Inherited Ring",
    category: "Stories",
    excerpt: "One client's grandmother's setting, reworked into something worn daily.",
    author: "Ines Fabre",
    date: "2026-05-15",
    minutes: 7,
    image: IMAGES.bespoke,
  },
  {
    title: "How We Grade Cut in House",
    category: "Education",
    excerpt: "Our own three-point check before a diamond reaches the case.",
    author: "Nadia Okonjo",
    date: "2026-05-08",
    minutes: 8,
    image: IMAGES.ring,
  },
  {
    title: "Dressing Jewelry Up and Down in the Same Week",
    category: "Style",
    excerpt: "The four pieces our stylists reach for most, and why they work everywhere.",
    author: "Ines Fabre",
    date: "2026-05-01",
    minutes: 5,
    image: IMAGES.store,
  },
];

export const journal: JournalArticle[] = journalSeeds.map((seed, i) => ({
  slug: slugify(seed.title),
  title: seed.title,
  category: seed.category,
  excerpt: seed.excerpt,
  author: seed.author,
  date: seed.date,
  readingMinutes: seed.minutes,
  image: seed.image,
  body: [
    seed.excerpt,
    "At Aurelia, every recommendation on this page comes from the bench and the case — from the people who set the stones and the specialists who sell them. We would rather tell you what we would choose for ourselves than repeat industry copy.",
    "Start with proportion. Whether you are buying a diamond, a sapphire or a plain gold band, proportion is what makes a piece read as considered from across a room. A well-cut one-carat stone will outperform a poorly cut one-and-a-half, and a band with the right width for your hand will always look better than a wider one bought for presence.",
    "Then consider how you live. Jewelry that is too precious to wear becomes jewelry you do not own. Low settings, secure bezels and matte finishes are not compromises; they are the reason a piece survives twenty years of daily wear with its character intact.",
    "Finally, ask questions. A good showroom welcomes them. Ask where a stone came from, who set it, and what happens if something works loose in ten years. Our answer is always the same: bring it back, and we will look after it for as long as you own it.",
  ],
  relatedProducts: seed.related ?? [
    products[i % products.length]!.slug,
    products[(i + 7) % products.length]!.slug,
    products[(i + 13) % products.length]!.slug,
  ],
}));

/* -------------------------------------------------------- ring builder */

const settingStyles: RingSetting["style"][] = [
  "Solitaire",
  "Side Stone",
  "Halo",
  "Three Stone",
  "Vintage",
  "Bezel",
];

const settingNames = [
  "Lumen Four-Prong",
  "Aster Tapered Baguette",
  "Verrine Cathedral",
  "Halden Bright Halo",
  "Rowe Low Profile",
  "Seren Granulated Crown",
  "Bey Thin Bezel",
  "Celestine Six-Prong",
  "Iolite Open Gallery",
  "Fields Forged Solitaire",
  "Leal Sculpted Basket",
  "North Knife Edge",
  "Rowe Trellis Three Stone",
  "Halden Hidden Halo",
  "Verrine Plane Setting",
  "Seren Beaded Vintage",
  "Celestine Compass Set",
  "Bey Hexagon Bezel",
  "Iolite Twin Claw",
  "Aster Split Shank",
];

export const ringSettings: RingSetting[] = settingNames.map((name, i) => ({
  slug: slugify(name),
  name,
  designerSlug: designers[i % designers.length]!.slug,
  style: settingStyles[i % settingStyles.length]!,
  metals:
    i % 3 === 0
      ? ["Platinum", "18k White Gold", "18k Yellow Gold"]
      : i % 3 === 1
        ? ["18k Yellow Gold", "18k Rose Gold"]
        : ["Platinum", "18k White Gold"],
  price: 1200 + ((i * 370) % 3600),
  image: i % 2 === 0 ? IMAGES.ring : IMAGES.heroRing,
  description:
    "Hand-finished in our workshop and dimensioned to sit flush against a wedding band. Complimentary sizing included.",
}));

const stoneTypes: Gemstone["type"][] = [
  "Diamond",
  "Diamond",
  "Diamond",
  "Sapphire",
  "Emerald",
  "Ruby",
  "Tourmaline",
  "Aquamarine",
];
const clarities = ["VVS1", "VVS2", "VS1", "VS2", "SI1"];
const cuts = ["Ideal", "Excellent", "Very Good"];
const diamondColors = ["D", "E", "F", "G", "H"];
const gemColors = ["Cornflower Blue", "Teal", "Vivid Green", "Pigeon Blood", "Mint", "Sea Blue"];

export const gemstones: Gemstone[] = Array.from({ length: 24 }, (_, i) => {
  const type = stoneTypes[i % stoneTypes.length]!;
  const isDiamond = type === "Diamond";
  const carat = Number((0.7 + ((i * 17) % 22) / 10).toFixed(2));
  return {
    id: `STN-${String(i + 1).padStart(3, "0")}`,
    type,
    shape: DIAMOND_SHAPES[i % DIAMOND_SHAPES.length]!,
    carat,
    color: isDiamond ? diamondColors[i % diamondColors.length]! : gemColors[i % gemColors.length]!,
    clarity: clarities[i % clarities.length]!,
    cut: cuts[i % cuts.length]!,
    certification: isDiamond ? (i % 2 === 0 ? "GIA" : "IGI") : "AGL",
    origin: isDiamond && i % 3 === 0 ? "Lab Grown" : "Natural",
    price: Math.round((isDiamond ? 3200 : 1800) * carat + ((i * 431) % 2600)),
  };
});

/* --------------------------------------------------------- account mock */

export const customer: Customer = {
  name: "Elena Marchetti",
  email: "elena.marchetti@example.com",
  phone: "(212) 555-0147",
  memberSince: "2023-04-11",
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      line1: "212 Bleecker Street, Apt 4R",
      city: "New York",
      state: "NY",
      zip: "10012",
      isDefault: true,
    },
    {
      id: "addr-2",
      label: "Studio",
      line1: "48 Wooster Street, Floor 3",
      city: "New York",
      state: "NY",
      zip: "10013",
      isDefault: false,
    },
  ],
};

export const orders: Order[] = [
  {
    id: "AUR-284193",
    date: "2026-09-02",
    status: "Shipped",
    total: 3186,
    shipping: "FedEx Priority Overnight, insured",
    tracking: "7742 9931 0084",
    items: [{ productSlug: products[18]!.slug, quantity: 1, price: 2860 }],
  },
  {
    id: "AUR-279844",
    date: "2026-07-19",
    status: "Delivered",
    total: 1830,
    shipping: "FedEx Priority Overnight, insured",
    tracking: "7742 8810 5521",
    items: [{ productSlug: products[23]!.slug, quantity: 1, price: 1680 }],
  },
  {
    id: "AUR-271002",
    date: "2026-05-30",
    status: "Crafting",
    total: 9240,
    shipping: "Made to order — 4 to 6 weeks",
    items: [{ productSlug: products[1]!.slug, quantity: 1, price: 9240 }],
  },
];

export const appointments: Appointment[] = [
  {
    id: "APT-4471",
    service: "Engagement Ring Consultation",
    mode: "In-Store",
    date: "2026-10-02",
    time: "11:00",
    status: "Confirmed",
    customer: "Elena Marchetti",
  },
  {
    id: "APT-4462",
    service: "Bespoke Design",
    mode: "Virtual",
    date: "2026-09-29",
    time: "15:30",
    status: "Pending",
    customer: "Jonah Pryce",
  },
  {
    id: "APT-4455",
    service: "Appraisal",
    mode: "In-Store",
    date: "2026-09-24",
    time: "09:30",
    status: "Confirmed",
    customer: "Renata Silva",
  },
  {
    id: "APT-4440",
    service: "Jewelry Repair",
    mode: "In-Store",
    date: "2026-09-18",
    time: "14:00",
    status: "Completed",
    customer: "Aiden Cole",
  },
];

export const APPOINTMENT_TYPES = [
  "Engagement Ring Consultation",
  "Wedding Band Consultation",
  "Jewelry Shopping",
  "Bespoke Design",
  "Jewelry Restyling",
  "Jewelry Repair",
  "Appraisal",
  "Sell Your Jewelry",
];

/* ------------------------------------------------------------ accessors */

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getDesigner(slug: string) {
  return designers.find((d) => d.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getArticle(slug: string) {
  return journal.find((a) => a.slug === slug);
}

export function getSetting(slug: string) {
  return ringSettings.find((s) => s.slug === slug);
}

export function getGemstone(id: string) {
  return gemstones.find((g) => g.id === id);
}

export function designerName(slug: string) {
  return getDesigner(slug)?.name ?? "Aurelia";
}

export function productsIn(filter: {
  categories?: Category[];
  collectionSlug?: string;
  designerSlug?: string;
}) {
  return products.filter((p) => {
    if (filter.categories && !filter.categories.includes(p.category)) return false;
    if (filter.collectionSlug && p.collectionSlug !== filter.collectionSlug) return false;
    if (filter.designerSlug && p.designerSlug !== filter.designerSlug) return false;
    return true;
  });
}

export function newArrivals(count = 8) {
  return [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, count);
}

export function bestSellers(count = 8) {
  return [...products]
    .filter((p) => p.bestSellerRank)
    .sort((a, b) => (a.bestSellerRank ?? 99) - (b.bestSellerRank ?? 99))
    .slice(0, count);
}

export function relatedProducts(product: Product, count = 4) {
  const sameCollection = products.filter(
    (p) => p.slug !== product.slug && p.collectionSlug === product.collectionSlug,
  );
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const merged = [...sameCollection, ...sameCategory].filter(
    (p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i,
  );
  return merged.slice(0, count);
}

export function moreFromDesigner(product: Product, count = 4) {
  return products
    .filter((p) => p.designerSlug === product.designerSlug && p.slug !== product.slug)
    .slice(0, count);
}

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { products: [], designers: [], articles: [] };
  const match = (value: string) => value.toLowerCase().includes(q);
  return {
    products: products.filter(
      (p) =>
        match(p.name) ||
        match(p.subcategory) ||
        match(p.category) ||
        match(p.gemstone) ||
        match(designerName(p.designerSlug)),
    ),
    designers: designers.filter((d) => match(d.name) || match(d.tagline)),
    articles: journal.filter((a) => match(a.title) || match(a.category)),
  };
}

export const POPULAR_SEARCHES = [
  "engagement rings",
  "diamond studs",
  "sapphire",
  "gold hoops",
  "eternity band",
  "tennis bracelet",
];

export const PRICE_BOUNDS: [number, number] = [
  Math.min(...products.map((p) => p.price)),
  Math.max(...products.map((p) => p.price)),
];
