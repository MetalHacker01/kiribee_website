import { buildPageMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildPageMarkdown("en"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
