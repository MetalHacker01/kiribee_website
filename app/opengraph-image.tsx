import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Kiribee, beeswax candles handmade in Tirana, Albania";

const file = (...p: string[]) => readFile(path.join(process.cwd(), ...p));

// Share card for WhatsApp, Facebook and search: the BeeQuite photo beside
// the kiribee wordmark in Bodoni, with the honey dots over both i's.
export default async function OG() {
  const [regular, italic, photo] = await Promise.all([
    file("app", "fonts", "og", "BodoniModa-450.ttf"),
    file("app", "fonts", "og", "BodoniModa-450-Italic.ttf"),
    file("public", "images", "candle-beequite.jpg"),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const dotted = (key: string) => (
    <div key={key} style={{ display: "flex", position: "relative" }}>
      ı
      <div
        style={{
          position: "absolute",
          top: 27,
          left: "50%",
          marginLeft: -10,
          width: 20,
          height: 20,
          borderRadius: 999,
          background: "#E3A730",
        }}
      />
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(90% 90% at 20% 30%, #3a220c 0%, #1a0f06 70%)",
          color: "#F5E9D6",
          fontFamily: "Bodoni",
        }}
      >
        <div
          style={{
            width: 660,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 64px 60px 80px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 120, lineHeight: 1, letterSpacing: -1 }}>
              k{dotted("a")}r{dotted("b")}bee
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 19, letterSpacing: 8, color: "#CDBBA2" }}>
              CRAFTED BY ALBANIAN BEES
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 50, lineHeight: 1.1, fontStyle: "italic", color: "#E3A730" }}>
              Hand-poured beeswax candles
            </div>
            <div style={{ display: "flex", fontSize: 30, marginTop: 14, color: "#CDBBA2" }}>
              Qirinj me dyll blete, punuar me dorë në Tiranë
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 2, color: "#CDBBA2" }}>
            kiribee.com · @kiribee_
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 540, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={540}
            height={630}
            style={{ objectFit: "cover", objectPosition: "55% 40%" }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #1a0f06 0%, rgba(26,15,6,0) 28%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni", data: regular, weight: 400, style: "normal" },
        { name: "Bodoni", data: italic, weight: 400, style: "italic" },
      ],
    }
  );
}
