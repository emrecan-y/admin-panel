/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        nav: "#212121",
        page: "#0F0F0F",
        "table-light" :"#545454",
        "table-dark" :"#3E3E3E",
        "accent-dark": "#7C309C",
        "accent-light": "#C847FF",
      },
    },
  },
  plugins: [],
};
