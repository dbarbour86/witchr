import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07070b",
        surface: {
          DEFAULT: "#12101a",
          elevated: "#1d1630",
          hover: "#241b36",
          card: "#151221",
        },
        border: {
          subtle: "#1e1732",
          DEFAULT: "#2a2042",
          highlight: "#4a386c",
          ornate: "#72589f",
        },
        lavender: {
          DEFAULT: "#b9a2d6",
          light: "#d8c7f2",
          dim: "#8b78a8",
          moon: "#cbb7ff",
        },
        plum: {
          DEFAULT: "#34284c",
          dark: "#1b1428",
          light: "#4f3c70",
        },
        bone: {
          DEFAULT: "#e8e3f0",
          muted: "#a9a0b8",
          dim: "#6e6480",
        },
        rust: {
          DEFAULT: "#9d74bd",
          hover: "#b38ed6",
          dark: "#2a1c3d",
        },
        brass: {
          DEFAULT: "#cbb7ff",
          light: "#e0d4ff",
          dark: "#392a5c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cinzel Decorative", "serif"],
        serif: ["var(--font-serif)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 8px 0 rgba(7, 7, 11, 0.6)",
        card: "0 8px 32px -4px rgba(7, 7, 11, 0.85), inset 0 0 0 1px rgba(185, 162, 214, 0.12)",
        "card-tarot": "0 12px 40px -8px rgba(7, 7, 11, 0.95), inset 0 0 0 1px rgba(185, 162, 214, 0.2)",
        "glow-purple": "0 0 35px -5px rgba(185, 162, 214, 0.25)",
        "glow-moon": "0 0 45px -5px rgba(203, 183, 255, 0.35)",
        "glow-subtle": "0 0 25px -2px rgba(107, 83, 153, 0.35)",
      },
      letterSpacing: {
        editorial: "0.08em",
        wideDisplay: "0.18em",
        ceremonial: "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
