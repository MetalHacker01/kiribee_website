// Downloads top-N Instagram post images from posts.json into public/images/gallery/
// and copies the first image into public/images/candle-* placeholders.
//
// Usage: node scripts/fetch-ig-images.mjs
//
// Notes:
// - Instagram CDN URLs in posts.json are short-lived (~24h after scrape).
//   If they return 403/410, you'll need to re-scrape posts.json first.
// - Images are NOT post-processed here; next/image + sharp handle optimization.

import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_JSON = join(ROOT, "..", "posts.json"); // sibling to /site
const OUT_GALLERY = join(ROOT, "public", "images", "gallery");
const OUT_IMAGES = join(ROOT, "public", "images");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(POSTS_JSON))) {
    console.error(
      `[fetch-ig-images] posts.json not found at ${POSTS_JSON}. Place it next to /site or rerun the scrape.`
    );
    process.exit(0);
  }

  await mkdir(OUT_GALLERY, { recursive: true });

  const raw = await import(POSTS_JSON, { assert: { type: "json" } }).catch(
    async () => {
      const fs = await import("node:fs/promises");
      const txt = await fs.readFile(POSTS_JSON, "utf8");
      return { default: JSON.parse(txt) };
    }
  );
  const posts = raw.default ?? raw;

  // Pick top 9 by likes that have an imageUrl/displayUrl/thumbnail
  const candidates = posts
    .map((p) => ({
      url: p.displayUrl || p.imageUrl || p.thumbnailUrl || null,
      likes: p.likesCount ?? 0,
      caption: p.caption ?? "",
      link: p.url,
    }))
    .filter((p) => p.url)
    .sort((a, b) => b.likes - a.likes);

  if (candidates.length === 0) {
    console.warn(
      "[fetch-ig-images] posts.json has no displayUrl/imageUrl fields — IG scraper output may be image-less. Skipping image download. The site will render with empty gallery placeholders until images are added manually."
    );
    return;
  }

  const picks = candidates.slice(0, 9);
  console.log(`[fetch-ig-images] downloading ${picks.length} images…`);

  let downloaded = 0;
  for (let i = 0; i < picks.length; i++) {
    const num = String(i + 1).padStart(2, "0");
    const dest = join(OUT_GALLERY, `${num}.jpg`);
    try {
      const res = await fetch(picks[i].url, { redirect: "follow" });
      if (!res.ok) {
        console.warn(`  ! ${num} → ${res.status} ${res.statusText}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      downloaded++;
      console.log(`  ✓ ${num}.jpg`);
    } catch (err) {
      console.warn(`  ! ${num} → ${err.message}`);
    }
  }

  // Copy first 4 images into candle-* placeholders if not already present.
  const candleNames = [
    "candle-beequite.jpg",
    "candle-honeycomb.jpg",
    "candle-embrace.jpg",
    "candle-personalized.jpg",
  ];
  for (let i = 0; i < candleNames.length; i++) {
    const src = join(OUT_GALLERY, `${String(i + 1).padStart(2, "0")}.jpg`);
    const dest = join(OUT_IMAGES, candleNames[i]);
    if ((await exists(src)) && !(await exists(dest))) {
      await copyFile(src, dest);
      console.log(`  → seeded ${candleNames[i]}`);
    }
  }

  console.log(
    `[fetch-ig-images] done. ${downloaded}/${picks.length} downloaded. Replace files in /public/images/ with hi-res photos when available.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
