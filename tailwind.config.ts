import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: "#050506",
        bgDark: "#0a0a0b",
        surface: "#131315",
        surfaceLight: "#1b1b1e",
        surfaceBorder: "rgba(230, 225, 211, 0.12)",
        surfaceBorderStrong: "rgba(230, 225, 211, 0.22)",
        cream: {
          DEFAULT: "#e6e1d3",
          dim: "rgba(230, 225, 211, 0.65)",
          faint: "rgba(230, 225, 211, 0.35)",
        },
        gold: {
          DEFAULT: "#c8a961",
          champagne: "#b7a37e",
          soft: "rgba(200, 169, 97, 0.15)",
          glow: "rgba(200, 169, 97, 0.35)",
        },
        emeraldData: {
          DEFAULT: "#10b981",
          soft: "rgba(16, 185, 129, 0.15)",
        }
      },
      fontFamily: {
        display: ["Clash Display", "-apple-system", "sans-serif"],
        body: ["General Sans", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
