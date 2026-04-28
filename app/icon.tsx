import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 50% 35%, #F1C861 0%, #C8821C 80%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 32">
          <path
            d="M12 2c3 4 7 7 7 14a7 7 0 0 1-14 0c0-5 3-7 7-14z"
            fill="#3A2A12"
          />
          <ellipse cx="12" cy="20" rx="2.6" ry="5" fill="#FFE19B" />
          <ellipse cx="12" cy="22" rx="1.2" ry="2.6" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
