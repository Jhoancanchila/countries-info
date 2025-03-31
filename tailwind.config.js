/** @type {import('tailwindcss').Config} */
export default {  // Cambia a module.exports
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita el modo oscuro basado en la clase `dark`
  theme: {
    extend: {
      keyframes: {  // Cambia "Keyframes" a minúscula
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn .2s ease-in-out"
      },
      colors: {
        'dark-color-primary': '#11182B',
        'dark-color-secondary': '#151C2F',
        'dark-accent': '#c2410c',
      },
    },
    screens: {
      'xs': '600px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  },
  plugins: [
    require("daisyui")  // Usa require en lugar de import
  ],
}