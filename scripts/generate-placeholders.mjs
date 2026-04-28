// Generates branded placeholder JPGs (warm honey tones) so the site builds and
// renders cleanly until real product photography is dropped into /public/images.

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMG = join(ROOT, "public", "images");
const GALLERY = join(IMG, "gallery");

const HONEY_TONES = [
  { bg: "#F5E6C3", fg: "#3A2A12" },
  { bg: "#EFD9A1", fg: "#3A2A12" },
  { bg: "#F1C861", fg: "#3A2A12" },
  { bg: "#E8B53A", fg: "#3A2A12" },
  { bg: "#D49E22", fg: "#FAF6EC" },
  { bg: "#C8821C", fg: "#FAF6EC" },
  { bg: "#A26716", fg: "#FAF6EC" },
  { bg: "#3A2A12", fg: "#E8B53A" },
  { bg: "#FAF6EC", fg: "#3A2A12" },
];

function svgPlaceholder({ bg, fg, label, w = 1080, h = 1350 }) {
  // simple honeycomb-pattern background + centered label
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <pattern id="honeycomb" x="0" y="0" width="84" height="150" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="${fg}" stroke-opacity="0.10" stroke-width="1.5">
          <path d="M42 0L84 24.27V74.73L42 99 0 74.73V24.27L42 0z"/>
          <path d="M42 49.73L84 74V124.5L42 148.5 0 124.5V74L42 49.73z"/>
        </g>
      </pattern>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#FFE19B" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#FFE19B" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="${bg}"/>
    <rect width="100%" height="100%" fill="url(#honeycomb)"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <g transform="translate(${w / 2} ${h / 2 - 40})" text-anchor="middle"
       font-family="Georgia, serif" fill="${fg}">
      <text font-size="${Math.round(w / 18)}" font-style="italic" opacity="0.9">Kiribee</text>
      <text y="${Math.round(w / 14)}" font-size="${Math.round(w / 38)}" opacity="0.65" font-family="system-ui">${label}</text>
    </g>
  </svg>`;
}

async function writeJpg(svg, dest, q = 85) {
  await sharp(Buffer.from(svg)).jpeg({ quality: q, mozjpeg: true }).toFile(dest);
  console.log(`  ✓ ${dest.replace(ROOT, "")}`);
}

async function main() {
  await mkdir(GALLERY, { recursive: true });

  // Featured candles
  const candleNames = [
    { file: "candle-beequite.jpg",     label: "BeeQuite",       tone: 3 },
    { file: "candle-honeycomb.jpg",    label: "Honeycomb",      tone: 2 },
    { file: "candle-embrace.jpg",      label: "Embrace",        tone: 4 },
    { file: "candle-personalized.jpg", label: "Personalized",   tone: 1 },
  ];
  for (const c of candleNames) {
    const tone = HONEY_TONES[c.tone];
    await writeJpg(
      svgPlaceholder({ bg: tone.bg, fg: tone.fg, label: c.label, w: 1080, h: 1350 }),
      join(IMG, c.file)
    );
  }

  // Gallery (9 images)
  const labels = [
    "from the workshop",
    "the wax",
    "the wick",
    "hand-painted",
    "by candlelight",
    "honeycomb relief",
    "Tirana, AL",
    "warm light",
    "small batch",
  ];
  for (let i = 0; i < 9; i++) {
    const tone = HONEY_TONES[i % HONEY_TONES.length];
    const num = String(i + 1).padStart(2, "0");
    await writeJpg(
      svgPlaceholder({ bg: tone.bg, fg: tone.fg, label: labels[i], w: 1080, h: 1080 }),
      join(GALLERY, `${num}.jpg`)
    );
  }

  console.log("\n[generate-placeholders] done. Replace /public/images/* with real photos when available.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
