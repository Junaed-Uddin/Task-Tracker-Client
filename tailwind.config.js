/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        'darkBlack': '#102137',
        'lightDark': '#1E293B'
      }
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
}
