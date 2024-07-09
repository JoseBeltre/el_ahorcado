/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "system-ui", "Arial", "sans-serif"],
      },
      colors: {
        primary: "#3498db",
        secondary: "#f1c40f",
        tertiary: "#e74c3c",
        quaternary: "#9b59b6",
        background: {
          light: "#E8E8E8",
          dark: "#1D1D1D",
        },
        accent: {
          light: "#FF7A00",
          dark: "#FF7A00",
        },
        tile: {
          light: "#e8e8e8",
          dark: "#272727",
        },
        key: {
          light: "#FFF",
          dark: "#424242",
        },
        keyLetter: {
          light: "#7A7A7A",
          dark: "#BABABA",
        },
      },
      boxShadow: {
        tileLight: "0px 4px 6.5px 0px rgba(0,0,0,0.15) inset",
        tileDark: "0px 4px 12.1px 0px rgba(0,0,0,0.25) inset",
        key: "1px 2px 2px 0px rgba(0,0,0,0.25)",
      },
      screens: {
        xs: { min: "300px" },
      },
    },
  },
  plugins: [],
};
