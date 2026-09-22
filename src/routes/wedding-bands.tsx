import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

const title = "Wedding Bands — DANHOV";
const description =
  "Her bands, his bands and award-winning contours, hand-finished in recycled platinum and 18k gold at our Los Angeles atelier.";

export const Route = createFileRoute("/wedding-bands")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <CatalogPage category="wedding-bands" />,
});
