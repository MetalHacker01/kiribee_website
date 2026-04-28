/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://kiribee.com",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.8,
  exclude: ["/api/*"],
  alternateRefs: [
    { href: "https://kiribee.com/en", hreflang: "en" },
    { href: "https://kiribee.com/sq", hreflang: "sq" },
    { href: "https://kiribee.com/en", hreflang: "x-default" },
  ],
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
