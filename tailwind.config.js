/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rothko: {
          bg: '#1f1c1d',
          charcoal: '#423f40',
          charcoal2: '#2e2b2c',
          cream: '#e3c9ab',
          cream2: '#d7bb98',
          purple: '#7a3f5f',
          purpledeep: '#5c2d49',
          red: '#d5410f',
          redsoft: '#c1461f',
          maroon: '#6d3c30',
          green: '#3f7a4d',
          greendeep: '#2c5c3a',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        band: '0 8px 30px -8px rgba(0,0,0,0.45)',
      },
      borderRadius: {
        band: '18px',
      },
      keyframes: {
        floatSoft: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        floatSoft: 'floatSoft 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
