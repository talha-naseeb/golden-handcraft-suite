import { createFileRoute } from "@tanstack/react-router";
import { generateImage } from "@/lib/image-gateway.server";
import { buildRingPrompt, ringConfigSchema } from "@/lib/ring-config";

export const Route = createFileRoute("/api/ring-preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        const parsed = ringConfigSchema.safeParse(body["config"]);
        if (!parsed.success) return new Response("Invalid ring configuration", { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Preview service is not configured", { status: 500 });
        const stream = body["stream"] !== false;
        const upstream = await generateImage(apiKey, buildRingPrompt(parsed.data), stream);
        return new Response(upstream.body, {
          status: upstream.status,
          headers: {
            "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
