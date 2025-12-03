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
      },
      keyframes: {
        fadeInSoftUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        fadeInSoftUp: 'fadeInSoftUp 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) 0.3s forwards'
      }
    },
  },
  plugins: [],
}
