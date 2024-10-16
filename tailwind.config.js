/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html'],
  theme: {
    extend: {
      colors:{
        primary: '#14b8a6',
        secondary:'#64748b',
        dark:'#0f172a'
      },
      padding: {
        '25': '6.25rem',
        '40': '7.5rem',
        // tambahkan nilai lain sesuai kebutuhan
      }

    },
  },
  plugins: [],
}

