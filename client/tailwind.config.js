/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1024px',
      },
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
