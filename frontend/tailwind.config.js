/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hahu: {
          slate: '#0f172a',
          yellow: '#F7B500',
        }
      }
    },
  },
  plugins: [],
}
