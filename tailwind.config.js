/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'inner-xl': 'inset 0 5px 10px 0 rgb(0 0 0 / 0.05)'
      }
    }
  },
  plugins: []
}
