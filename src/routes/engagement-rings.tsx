import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/components/site/CatalogPage";

const title = "Engagement Rings — DANHOV";
const description =
  "Hand-formed engagement rings from a single continuous wire: Abbraccio, Voltaggio, Classico, Carezza, Petalo and Eleganza. Made to order in Los Angeles.";

export const Route = createFileRoute("/engagement-rings")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <CatalogPage category="engagement-rings" />,
});
