/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.kiribee.com",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.8,
  // Exclude:
  //  - the API route
  //  - the .md and .txt AI-feed routes (they shadow the HTML pages and would
  //    look like duplicate content to Google)
  //  - the locale 404 page Next-sitemap sometimes picks up
  exclude: [
    "/api/*",
    "/*.md",
    "/llms.txt",
    "/*/index.md",
    "/*/home.md",
  ],
  // For path-based i18n (/en, /sq on the same domain), do NOT use
  // alternateRefs. Instead, generate hreflang inline per URL via transform,
  // so each locale page references its sibling locales correctly.
  transform: async (config, path) => {
    // Only emit canonical entries for the two locale roots — anything else
    // (the rare extra route, etc.) follows defaults.
    if (path === "/en" || path === "/sq") {
      return {
        loc: `https://www.kiribee.com${path}`,
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          { href: "https://www.kiribee.com/en", hreflang: "en", hrefIsAbsolute: true },
          { href: "https://www.kiribee.com/sq", hreflang: "sq", hrefIsAbsolute: true },
          { href: "https://www.kiribee.com/en", hreflang: "x-default", hrefIsAbsolute: true },
        ],
      };
    }
    // Skip everything else (avoid noise: the AI markdown routes, the API, etc.)
    return null;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/index.md", "/home.md", "/llms.txt"],
        disallow: ["/api/"],
      },
    ],
    additionalSitemaps: [],
  },
};
