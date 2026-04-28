import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export const config = {
  // Exclude api, Next internals, the OG/icon route handlers, and any path
  // with a dot (sitemap.xml, robots.txt, *.md, etc.) from the locale middleware.
  matcher: [
    "/((?!api|_next|_vercel|icon|opengraph-image|favicon|robots|sitemap.*|.*\\..*).*)",
  ],
};
