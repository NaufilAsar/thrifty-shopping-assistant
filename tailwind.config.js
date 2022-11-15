const { colors } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
    "/node_modules/flowbite/dist/**/*.js",
    "/src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      // Light theme colors
      // primary: "#2577c1",
      // "secondary-bg": "#fff",
      // theme: "#fff",
      navy: "#16123f",
      mint: "#c7ddcc",
      "custom-teal": "#75c9b7",
      "custom-dark-teal": "#157064",
      "custom-light-teal": "#95d1c8",
      "soft-green": "rgb(66, 138, 127,0.9)",
      "fresh-lemon": "#ffe26a",
      "light-lime": "#abd699",
      "transparent-light-teal": "rgba(219,243,235,0.5)",
      "more-transparent-light-teal": "rgba(219,243,235,0.3)",
      "dark-bootstrap": "#343a40",
      "dark-bootstrap-transparent": "rgba(52, 58, 64, 0.2)",

      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      teal: colors.teal,
      orange: colors.orange,
      pink: colors.pink,
      slate: colors.slate,
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]

};
