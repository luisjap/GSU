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
        // Marca — turquesa (gasfitería / acento principal)
        accent: {
          DEFAULT: "#22d3c4",
          light: "#5fe6da",
          dark: "#159c90",
          soft: "rgba(34,211,196,0.1)",
        },
        // Electricidad
        volt: {
          DEFAULT: "#4a7dfa",
          light: "#7fa2ff",
          soft: "rgba(74,125,250,0.1)",
        },
        // Climatización
        frost: {
          DEFAULT: "#5fd0f2",
          light: "#90e4f9",
          soft: "rgba(95,208,242,0.1)",
        },
        // Certificaciones / seguridad — uso puntual
        safety: {
          DEFAULT: "#f2a33d",
          soft: "rgba(242,163,61,0.12)",
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
