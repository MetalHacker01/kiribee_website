import { buildPageMarkdown } from "@/lib/markdown";
import { locales, type Locale } from "@/i18n";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safe = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const body = buildPageMarkdown(safe);
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
