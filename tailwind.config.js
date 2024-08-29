/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9EB',
          100: '#FDEDC8',
          200: '#FCE0A0',
          300: '#FAC050',
          400: '#F8A827',
          500: '#F2850E',
          600: '#D66209',
          700: '#B2420B',
          800: '#903310',
          900: '#772A10',
          950: '#441304',
        },
        blue: {
          50: '#F0F7FF',
          100: '#E1EFFD',
          200: '#BBDFFC',
          300: '#70BFF9',
          400: '#3CAAF4',
          500: '#128EE5',
          600: '#0670C3',
          700: '#06599E',
          800: '#094C83',
          900: '#0E416C',
          950: '#092948',
        },
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sevillana: ['Sevillana', 'cursive'],
      },
    },
  },
  plugins: [],
}

