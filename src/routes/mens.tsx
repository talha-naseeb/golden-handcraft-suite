import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

const title = "Men's Jewelry — DANHOV";
const description =
  "A curated men's collection of hand-engravable signets, wide braided bands and link bracelets in recycled platinum and 18k gold.";

export const Route = createFileRoute("/mens")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <CatalogPage category="mens" />,
});
