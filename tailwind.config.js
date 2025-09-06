/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          50: '#fffdf7',
          100: '#fffaeb',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'offwhite': {
          50: '#fefefe',
          100: '#fdfdfd',
          200: '#fbfbfb',
          300: '#f8f8f8',
          400: '#f4f4f4',
          500: '#f0f0f0',
          600: '#e8e8e8',
          700: '#d1d1d1',
          800: '#b4b4b4',
          900: '#8a8a8a',
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'offwhite-gradient': 'linear-gradient(135deg, #fefefe 0%, #f0f0f0 100%)',
        'gold-offwhite-gradient': 'linear-gradient(135deg, #fffdf7 0%, #fef3c7 50%, #f59e0b 100%)',
      }
    },
  },
  plugins: [],
}
