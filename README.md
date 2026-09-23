# DANHOV Reimagined

# DANHOV — Full Site Audit & Lovable Rebuild Guide

Source: https://www.danhov.com (crawled Sept 2026)

---

## 1. Brand Basics

| | |
|---|---|
| Brand | DANHOV — luxury handcrafted jewelry |
| Founded | 1984, by Jack Hovsepian |
| Location | Los Angeles, CA (3439 Cahuenga Blvd W, 90068) |
| Tagline | "Sacred geometry. Eternal love. Handcrafted in Los Angeles since 1984." |
| Theme color | `#AC3438` (deep maroon/red) |
| Phone | (424) 421-4072 |
| Email | care@danhov.com (trade@danhov.com for wholesale) |
| Socials | Instagram, Pinterest, Facebook, Twitter/X, LinkedIn |
| Booking | Calendly embeds (consolidate to one booking flow) |
| Press | Vogue, Harper's Bazaar, WWD, Brides, Who What Wear, Town & Country |

Visual aesthetic & palette:
- Primary luxury theme: `#AC3438` (deep maroon/red)
- Neutral base: Warm ivory/linen (`#FAF8F5`, `#F5F2EB`) and crisp whites rather than harsh stark white
- Typography: High-contrast luxury editorial serif headers (e.g. Cormorant Garamond / Playfair Display style) with clean, refined sans-serif for body and technical details
- Accents: Deep charcoal (`#1A1A1A`) for text, subtle champagne/warm gold accents for badges or primary CTA highlights

---

## 2. Sitemap & Architecture

**Shop / commerce**
- `/` — Home
- `/engagement-rings` — listing (Abbraccio, Voltaggio, Classico, etc.)
- `/wedding-bands` — listing (Her Bands, His Bands, Award Winners)
- `/fine-jewelry` — listing (Earrings, Pendants, Rings, Bands, Limited Edition)
- `/mens` — curated men's signets, bands, bracelets (clean taxonomy, no miscategorized SKUs)
- `/product/:slug` — product detail view with multi-angle photography, metal selector, ring size, craftsmanship notes
- `/ring-builder` — 3-step configurator entry (Setting -> Diamond -> Complete Ring)
- `/gift-cards` — gift card purchase & balance checker

**Brand & support**
- `/story` — Jack Hovsepian bio, single-wire technique, LA atelier
- `/philosophy` — sacred geometry, "one wire, two lives, one again"
- `/sustainability` — 100% recycled gold, ethical stones, zero speculative production
- `/partner` — B2B wholesale portal & application form
- `/affiliate` — tiered ambassador/affiliate program application
- `/shipping-and-return-policy` — canonical policy (standardize to 30 days return window)
- `/faq`
- `/wishlist`

---

## 3. Scope for Phase 1

Build the foundational Phase 1 architecture:
1. **Global Design System & Layout**:
   - Sticky top utility bar: phone contact `(424) 421-4072`, Book Virtual Consultation modal/trigger, Account, Wishlist counter, and Cart drawer trigger.
   - Unified luxury header navigation: Engagement Rings, Wedding Bands, Fine Jewelry, Men's, Collections, Ring Builder, Our Story. Consistent across every route.
   - Elegant interactive Slide-out Cart Drawer with subtotal calculation, free insured FedEx overnight shipping callout, and checkout mock.
   - Persistent responsive Wishlist system (saved pieces).

2. **Luxury Homepage (`/`)**:
   - Hero section: "You Already Are One. Love is remembering." with dual CTAs ("Explore Collections" & "Book Appointment").
   - "One wire, two lives, one again" — Jack Hovsepian & Abbraccio origin story with single-wire visual motif.
   - Trust strip: Founded 1984 · 40+ Years · Handcrafted in LA · Lifetime Warranty · Complimentary Insured Shipping.
   - Featured Collections horizontal interactive carousel / showcase (Abbraccio, Voltaggio, Classico, Carezza, Petalo, Eleganza).
   - Diamond Shape visual selector (Round, Oval, Cushion, Emerald, Radiant, Pear, Princess, Marquise, Asscher, Heart) linking into catalog/builder.
   - Editorial press strip (Vogue, Harper's Bazaar, WWD, Brides, Town & Country).
   - "Why DANHOV" luxury value props and client testimonials.
   - Footer with full sitemap, newsletter signup, and contact information.

3. **Curated Product Catalog & Filtering Foundation (`/engagement-rings`, `/wedding-bands`, `/fine-jewelry`, `/mens`)**:
   - Clean, stable data model for products with accurate taxonomy, high-res luxury imagery, metal options (Platinum, 18k White Gold, 18k Yellow Gold, 18k Rose Gold), collection tags, and real pricing.
   - Faceted filters (Collection, Metal, Price range, Sort by Featured/Price/Newest).
   - Rich product cards with image hover crossfades, quick-add wishlist hearts, and collection badges.
   - Fully functional Product Detail Page (`/product/:slug`) with multi-angle gallery, metal selector, ring sizing guide, accordion specs, and add-to-bag / book private viewing CTAs.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://golden-handcraft-suite.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e41e4847-cbbf-4a81-b023-b96fb6f0984b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
