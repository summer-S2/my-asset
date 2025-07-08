const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");

module.exports = {
  plugins: [tailwindcss(), autoprefixer, nested],
};
