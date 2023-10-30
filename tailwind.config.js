/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: [
    "./assets/views/**/*"
  ],
  theme: {
    extend: {
      colors: {
        body: {
          background: {
            DEFAULT: colors.neutral["50"],
            dark: colors.neutral["800"]
          },
          text: {
            DEFAULT: colors.neutral["800"],
            dark: colors.neutral["50"]
          }
        },
        header: {
          background: {
            DEFAULT: "#284600"
          }
        }
      }
    },
  },
  plugins: [],
}
