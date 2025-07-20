/** @type {import('tailwindcss').Config} */

const { keyframes, animations } = require("./src/styles");

export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      animation: animations,
      keyframes: keyframes,
    },
  },
  plugins: [],
};
