import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Metal, type Product } from "./products";

export type CartLine = {
  slug: string;
  metal: Metal;
  size?: string;
  quantity: number;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  bookingOpen: boolean;
  hydrated: boolean;
  setCartOpen: (open: boolean) => void;
  setBookingOpen: (open: boolean) => void;
  addToCart: (line: CartLine) => void;
  removeLine: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  toggleWishlist: (slug: string) => void;
  inWishlist: (slug: string) => boolean;
  cartCount: number;
  subtotal: number;
  detailedCart: { line: CartLine; product: Product }[];
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "danhov.cart";
const WISH_KEY = "danhov.wishlist";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (l) => l.slug === line.slug && l.metal === line.metal && l.size === line.size,
      );
      if (idx >= 0) {
        const existing = prev[idx]!;
        const next = [...prev];
        next[idx] = { ...existing, quantity: existing.quantity + line.quantity };
        return next;
      }
      return [...prev, line];
    });
    setCartOpen(true);
  }, []);

  const removeLine = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((_, i) => i !== index)
        : prev.map((l, i) => (i === index ? { ...l, quantity } : l)),
    );
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const detailedCart = useMemo(
    () =>
      cart
        .map((line) => ({ line, product: getProduct(line.slug) }))
        .filter((entry): entry is { line: CartLine; product: Product } => Boolean(entry.product)),
    [cart],
  );

  const value: ShopState = {
    cart,
    wishlist,
    cartOpen,
    bookingOpen,
    hydrated,
    setCartOpen,
    setBookingOpen,
    addToCart,
    removeLine,
    updateQuantity,
    toggleWishlist,
    inWishlist: (slug) => wishlist.includes(slug),
    cartCount: cart.reduce((n, l) => n + l.quantity, 0),
    subtotal: detailedCart.reduce((sum, e) => sum + e.product.price * e.line.quantity, 0),
    detailedCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
