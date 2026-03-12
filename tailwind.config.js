/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f1f5',
          100: '#d9dbe5',
          200: '#b3b7cb',
          300: '#8d93b1',
          400: '#676f97',
          500: '#414b7d',
          600: '#2d3560',
          700: '#232847',
          800: '#1C2035',
          900: '#14172B',
          950: '#0d0f1c',
        },
        accent: {
          DEFAULT: '#A4FF79',
          50: '#f2ffe8',
          100: '#dfffc5',
          200: '#bfff91',
          300: '#A4FF79',
          400: '#7de84c',
          500: '#5cc42d',
          600: '#459c1e',
          700: '#35771a',
          800: '#2d5e1a',
          900: '#284f1b',
        },
        indigo: {
          DEFAULT: '#6C63FF',
          50: '#f0efff',
          100: '#e4e2ff',
          200: '#cecbff',
          300: '#aca5ff',
          400: '#8b80ff',
          500: '#6C63FF',
          600: '#5a3ff7',
          700: '#4c30e3',
          800: '#3f28be',
          900: '#35249b',
        },
        surface: {
          DEFAULT: '#F3F3F7',
          50: '#FAFAFC',
          100: '#F3F3F7',
          200: '#EBEBEF',
          300: '#D8D8E0',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(28, 32, 53, 0.06)',
        'card': '0 4px 16px rgba(28, 32, 53, 0.08)',
        'card-hover': '0 8px 30px rgba(28, 32, 53, 0.12)',
        'elevated': '0 12px 40px rgba(28, 32, 53, 0.15)',
      },
    },
  },
  plugins: [],
}
