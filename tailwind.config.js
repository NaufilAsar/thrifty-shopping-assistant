/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "/node_modules/flowbite/dist/**/*.js"],
  theme: {
    colors: {
      // Light theme colors
      // primary: "#2577c1",
      // "secondary-bg": "#fff",
      // theme: "#fff",
      navy: "#16123f",
      mint: "#c7ddcc",
      teal: "#75c9b7",
      "fresh-lemon": "#ffe26a",
      "light-lime": "#abd699",

      // Dark theme colors
      "dark-primary": "#ff500b",
      "dark-secondary-bg": "#424242",
      "dark-theme": "#424242",
      "dark-header-color": "#424242",
      "dark-route-link-active": "#ff500b",
      "dark-link-color": "#fff",
      "dark-border-color": "#1cd61c",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
