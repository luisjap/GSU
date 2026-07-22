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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "ui-monospace", "monospace"],
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
        // Azul Corporativo — ingeniería, tecnología, confianza (uso 70%)
        brand: {
          DEFAULT: "#0057B8",
          light: "#1E73D6",
          dark: "#0A2342",
          soft: "rgba(0,87,184,0.08)",
        },
        // Gris Grafito — acero, equipos, industria (uso 10%)
        graphite: {
          DEFAULT: "#4B4F54",
          soft: "rgba(75,79,84,0.08)",
        },
        // Gris Claro — fondos (uso 3%)
        mist: "#E8ECEF",
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
