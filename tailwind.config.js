/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FCF3F5",
        ivory: "#FFFAFC",
        blush: "#F7D7E1",
        rose: "#D483A0",
        peach: "#F5D7BF",
        gold: "#C2869B",
        "gold-soft": "#E6B7C6",
        plum: "#8F6BB3",
        lilac: "#CDB9EC",
        cocoa: "#5A4152",
        "cocoa-soft": "#8D7187",
        sage: "#C9D3BE",
        lavender: "#E4DCEE",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        script: ['"Great Vibes"', "cursive"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 30px 60px -30px rgba(90,65,82,0.35)",
        polaroid: "0 2px 4px rgba(90,65,82,0.06), 0 24px 48px -24px rgba(90,65,82,0.4)",
      },
    },
  },
  plugins: [],
};
