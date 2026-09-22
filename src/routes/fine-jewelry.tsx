import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

const title = "Fine Jewelry — DANHOV";
const description =
  "Earrings, pendants, rings, bands and limited edition pieces carrying the Danhov single-wire signature beyond the engagement.";

export const Route = createFileRoute("/fine-jewelry")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <CatalogPage category="fine-jewelry" />,
});
