import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

// Honey hexagon with a candle flame on a dark wax tile. Bold shapes and
// high contrast so it still reads at 16px, in light and dark browser tabs.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F140B",
          borderRadius: 22,
        }}
      >
        <svg width="86" height="86" viewBox="0 0 100 100">
          <path
            d="M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z"
            fill="#E8A92E"
          />
          <path
            d="M50 22 C 60 36, 68 46, 68 60 C 68 71, 60 79, 50 79 C 40 79, 32 71, 32 60 C 32 46, 40 36, 50 22 Z"
            fill="#1F140B"
          />
          <path
            d="M50 44 C 55 51, 58 56, 58 63 C 58 68, 54.5 72, 50 72 C 45.5 72, 42 68, 42 63 C 42 56, 45 51, 50 44 Z"
            fill="#FFE7A8"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
