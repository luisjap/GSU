import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["Barlow Semi Condensed", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Marca — verde (acento principal, CTA, precios, tienda)
        leaf: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#0f7a3d",
          soft: "rgba(22,163,74,0.08)",
        },
        // Gasfitería
        accent: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e",
          soft: "rgba(13,148,136,0.08)",
        },
        // Electricidad
        volt: {
          DEFAULT: "#2563eb",
          light: "#3b82f6",
          soft: "rgba(37,99,235,0.08)",
        },
        // Climatización
        frost: {
          DEFAULT: "#0891b2",
          light: "#06b6d4",
          soft: "rgba(8,145,178,0.08)",
        },
        // Certificaciones / seguridad — uso puntual
        safety: {
          DEFAULT: "#d97706",
          soft: "rgba(217,119,6,0.1)",
        },
        dark: "#0a141f",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        rise: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        rise: "rise 0.65s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
