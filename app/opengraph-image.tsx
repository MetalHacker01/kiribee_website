import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Kiribee — beeswax candles handmade in Albania";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at top right, #F1C861 0%, #FAF6EC 55%, #F5E6C3 100%)",
          fontFamily: "Georgia, serif",
          color: "#3A2A12",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#E8B53A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3A2A12",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.5 }}>
            Kiribee
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Crafted by{" "}
            <span style={{ fontStyle: "italic", color: "#C8821C" }}>
              Albanian bees.
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#3A2A12",
              opacity: 0.7,
              maxWidth: 880,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Hand-poured beeswax candles, made in Tirana with a dash of love.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#3A2A12",
            opacity: 0.65,
            fontSize: 22,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>kiribee.com</span>
          <span>@kiribee_</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
