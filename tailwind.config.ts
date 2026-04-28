import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FAF6EC",
          100: "#F5EFDD",
        },
        beeswax: {
          100: "#F5E6C3",
          200: "#EFD9A1",
        },
        honey: {
          400: "#F1C861",
          500: "#E8B53A",
          600: "#D49E22",
        },
        amber: {
          700: "#C8821C",
          800: "#A26716",
        },
        wax: {
          900: "#3A2A12",
        },
        ink: {
          950: "#1F1A14",
        },
        moss: {
          600: "#4A5530",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        "soft-amber":
          "0 16px 40px -16px rgba(200, 130, 28, 0.35), 0 4px 12px -4px rgba(58, 42, 18, 0.12)",
        "soft-cream": "0 12px 32px -12px rgba(58, 42, 18, 0.18)",
      },
      backgroundImage: {
        "honeycomb":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'><g fill='none' stroke='%23C8821C' stroke-opacity='0.12' stroke-width='1'><path d='M28 0L56 16.18V49.82L28 66 0 49.82V16.18L28 0z'/><path d='M28 33.18L56 49.36V83L28 99.18 0 83V49.36L28 33.18z'/></g></svg>\")",
        "radial-warmth":
          "radial-gradient(ellipse at top, rgba(232,181,58,0.18) 0%, rgba(250,246,236,0) 60%)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "flame-flicker": "flicker 2.4s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        flicker: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.95" },
          "25%": { transform: "scale(1.04) translateY(-1px)", opacity: "1" },
          "50%": { transform: "scale(0.98) translateY(1px)", opacity: "0.85" },
          "75%": { transform: "scale(1.02)", opacity: "0.98" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
