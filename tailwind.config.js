module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    fontFamily : {
      'source-sans-pro': ['"Source Sans Pro"']
    },
  },
  plugins: [
      require('@tailwindcss/line-clamp'),
      require("tw-elements/dist/plugin")
  ],
}