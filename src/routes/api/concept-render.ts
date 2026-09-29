import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { generateImage } from "@/lib/image-gateway.server";

const schema = z.object({
  prompt: z.string().trim().min(3).max(400),
  metal: z.enum(["Platinum", "18k White Gold", "18k Yellow Gold", "18k Rose Gold"]),
  shape: z.string().max(20),
});

export const Route = createFileRoute("/api/concept-render")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
        const parsed = schema.safeParse(body);
        if (!parsed.success) return new Response("Please describe your ring (3–400 characters).", { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("Concept studio is not configured", { status: 500 });
        const { prompt, metal, shape } = parsed.data;
        const full = `Ultra-realistic luxury jewelry concept rendering of a handcrafted engagement ring in polished ${metal} with a ${shape} cut center diamond. Client brief: ${prompt}. Studio product photograph on warm ivory linen, soft diffused light, macro detail, no text, no hands, no logos.`;
        const upstream = await generateImage(apiKey, full, body["stream"] !== false);
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
