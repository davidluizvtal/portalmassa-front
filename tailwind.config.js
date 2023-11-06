/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vtal: {
          white: {
            100: "#ffffff",
          },
          black: {
            100: "#000",
          },
          green: {
            100: "#61ce70",
          },
          blue: {
            100: "#6ec1e4",
          },
          yellow: {
            100: "#f1ff00",
          },
          gray: {
            100: "#7a7a7a",
            200: "#eeeeee",
            300: "#54595f",
            500: "#464643",
            600: "#404040",
            800: "#191918",
          },
        },
      },
    },
  },
  plugins: [],
};
