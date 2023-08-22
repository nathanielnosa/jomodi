/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "blue",
          "success":"green",
          "primary-focus": "mediumblue",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}