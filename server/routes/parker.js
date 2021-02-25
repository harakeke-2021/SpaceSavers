const express = require('express')

const router = express.Router()
const { Client } = require('@googlemaps/google-maps-services-js')

module.exports = router

router.get('/', (req, res) => {
  const client = new Client({})
  client
    .geocode({
      params: {
        address: '17a walter street, auckland',
        key: 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'
      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0].geometry)
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
    })
})
