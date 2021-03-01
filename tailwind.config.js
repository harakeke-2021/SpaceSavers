module.exports = {
  purge: [], // purges unused classes
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      lg: '500px',
      xl: '600px'
    },
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
