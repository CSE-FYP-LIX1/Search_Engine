module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    // "./node_modules/flowbite/**/*.js",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"

  ],
  theme: {
    fontFamily : {
      'source-sans-pro': ['"Source Sans Pro"'],
      'rubik': ['Rubik']

    },
    fontWeight : {
      'extra-bold' : '1000',
    }
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require("tw-elements/dist/plugin"),
      // require('flowbite/plugin')
  ],
}