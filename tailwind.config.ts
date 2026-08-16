import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0F",
        surface: "#121218",
        interactive: "#1A1A24",
        sonar: {
          DEFAULT: "#9662E9",
          hover: "#673EA8",
          highlight: "#D0A6FA",
        },
        premium: {
          DEFAULT: "#D4AF37",
          hover: "#C9A227",
          subtle: "#E6C87A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
