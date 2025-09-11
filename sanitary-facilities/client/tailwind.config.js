/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#000000',
        'custom-white': '#ffffff',
      },
      fontFamily: {
        'sans': ['Uni Neue Book', 'Inter', 'system-ui', 'sans-serif'],
        'uni-neue': ['Uni Neue Book', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
