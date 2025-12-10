/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        cityfixdark: {
          /* BRAND COLORS */
          "primary": "#60A5FA",           // Soft Neon Blue
          "primary-focus": "#3B82F6",     // Bright Muted Blue
          "primary-content": "#0A0A0A",

          "secondary": "#A78BFA",         // Violet/Indigo Neon Mix
          "secondary-focus": "#7C3AED",
          "secondary-content": "#0A0A0A",

          "accent": "#34D399",            // Green Neon Accent
          "accent-focus": "#059669",
          "accent-content": "#0A0A0A",

          /* BACKGROUND (True Dark + Premium) */
          "base-100": "#0F1116",          // Deep Navy Black
          "base-200": "#1A1C23",          // Card/Section Background
          "base-300": "#292C35",          // Border / Hover BG
          "base-content": "#E5E7EB",      // Soft Light Text

          /* NEUTRALS (for text, border, sidebar) */
          "neutral": "#1F2937",
          "neutral-focus": "#111827",
          "neutral-content": "#CBD5E1",

          /* STATUS COLORS */
          "info": "#38BDF8",
          "success": "#34D399",
          "warning": "#FACC15",
          "error": "#F87171",
        },
      },
    ],
    darkTheme: "cityfixdark",
  },
};
