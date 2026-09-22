import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-linen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl tracking-[0.3em] uppercase">Danhov</span>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Sacred geometry. Eternal love. Handcrafted in Los Angeles since 1984.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p>3439 Cahuenga Blvd W, Los Angeles, CA 90068</p>
              <p>
                <a href="tel:+14244214072" className="hover:text-primary">
                  (424) 421-4072
                </a>
              </p>
              <p>
                <a href="mailto:care@danhov.com" className="hover:text-primary">
                  care@danhov.com
                </a>{" "}
                · Trade:{" "}
                <a href="mailto:trade@danhov.com" className="hover:text-primary">
                  trade@danhov.com
                </a>
              </p>
            </div>
            <div className="mt-6 flex gap-4 text-muted-foreground">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-primary">
                <Instagram className="size-4" />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-primary">
                <Facebook className="size-4" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-primary">
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-muted-foreground">Shop</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/engagement-rings" className="hover:text-primary">
                  Engagement Rings
                </Link>
              </li>
              <li>
                <Link to="/wedding-bands" className="hover:text-primary">
                  Wedding Bands
                </Link>
              </li>
              <li>
                <Link to="/fine-jewelry" className="hover:text-primary">
                  Fine Jewelry
                </Link>
              </li>
              <li>
                <Link to="/mens" className="hover:text-primary">
                  Men's
                </Link>
              </li>
              <li>
                <Link to="/" hash="builder" className="hover:text-primary">
                  Ring Builder
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-primary">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-muted-foreground">Maison</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/" hash="story" className="hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/" hash="philosophy" className="hover:text-primary">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link to="/" hash="sustainability" className="hover:text-primary">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/" hash="press" className="hover:text-primary">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-muted-foreground">Client Care</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>Shipping &amp; 30-Day Returns</li>
              <li>Lifetime Warranty</li>
              <li>Ring Sizing Guide</li>
              <li>Gift Cards</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 hairline" />

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h3 className="font-display text-2xl">The Atelier Letter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New releases, atelier notes and private viewings — a few times a year.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you — please confirm the link in your inbox.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="rounded-none border-border bg-background"
            />
            <Button type="submit" className="rounded-none px-6 tracking-[0.18em] uppercase">
              Join
            </Button>
          </form>
        </div>

        <p className="mt-12 text-xs tracking-[0.14em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} Danhov · Handcrafted in Los Angeles since 1984
        </p>
      </div>
    </footer>
  );
}
