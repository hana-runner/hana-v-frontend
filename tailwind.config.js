/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        hanaRegular: ["HanaRegular", "sans-serif"],
        hanaMedium: ["hanaMedium", "sans-serif"],
        hanaBold: ["hanaBold", "sans-serif"],
      },
      colors: {
        hanaGreen: "#008C8C",
        hanaRed: "#D70037",
        hanaSilver: "#B5B5B5",
        hanaGold: "#B27A3E",
        hanaBlack: "#000000",
      },
    },
  },
  plugins: [],
};
