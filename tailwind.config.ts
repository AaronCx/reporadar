import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        accent: "#00ff88",
        "card-bg": "#111111",
        "card-border": "#1a1a1a",
        "text-main": "#e0e0e0",
        "text-dim": "#666666",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        sans: ['"Outfit"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
