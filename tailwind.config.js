/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit"],
        body: ["Roboto"],
      },
      colors: {
        white: "#FBFBFB",
        primary: "#FB8B24",
        secondary: "#160F4E",
        "skimmer-light": {
          100: "#E6EDFB",
          200: "#CADAF7",
          300: "#AAC6F3",
          400: "#82AFEF",
          500: "#4795EC",
          600: "#3F85D3",
          700: "#3673B6",
          800: "#2C5E95",
          900: "#1F4269",
        },
        orchid: {
          600: "#4C3779",
          700: "#3A2A5D",
        },
        "skimmer-text": {
          light: "#FCFCFC",
          medium: "#637381",
          dark: "#212B36",
        },
        gray: {
          300: "#B7BABF",
        },
        navy: {
          600: "#160F4E",
          700: "#110B3C",
        },
      },
    },
  },
  plugins: [],
};
