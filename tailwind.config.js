/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#1C1917",
        card: "#292524",
        subtle: "#44403C",
        profit: "#10B981",
        loss: "#EF4444",
        neutral: "#F59E0B",
        fire: "#F97316",
        xp: "#EAB308",
        primary: "#D97757",
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
        sans: ["Inter", "System UI", "sans-serif"],
      }
    },
  },
  plugins: [],
};
