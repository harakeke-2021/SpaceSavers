module.exports = {
  purge: [], // purges unused classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        work: ['"Work Sans"'],
        roboto: ['Roboto']
      },
      height: {
        lg: '500px',
        xl: '600px'
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
