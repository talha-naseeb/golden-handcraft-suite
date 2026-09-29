import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ring-builder")({
  component: () => <Outlet />,
});
