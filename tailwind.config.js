module.exports = {
  purge: [], // purges unused classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        work: ['"Work Sans"'],
        roboto: ['Roboto']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/custom-forms')
  ]
}
