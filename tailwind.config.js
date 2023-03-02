module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"

  ],
  theme: {
    extend: {
      fontFamily : {
        'source-sans-pro': ['"Source Sans Pro"'],
        'rubik': ['Rubik', 'sans-serif'],
  
      },
      fontWeight : {
        'extra-bold' : '1000',
      }
    }
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require("tw-elements/dist/plugin"),
  ],
}