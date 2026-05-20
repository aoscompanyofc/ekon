/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ekon: {
          purple: {
            DEFAULT: '#3D1B6E',
            dark: '#2A0F5C',
            light: '#4A2280',
          },
          green: {
            DEFAULT: '#00E676',
            light: '#33EB91',
            dark: '#00C853',
          },
          text: {
            dark: '#1A1A2E',
            gray: '#6B7280',
            white: '#FFFFFF',
          },
          bg: {
            light: '#FFFFFF',
            gray: '#F8F9FA',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
