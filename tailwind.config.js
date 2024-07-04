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
      }
    },
  },
  plugins: [],
}

