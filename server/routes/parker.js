const express = require('express')

const router = express.Router()
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')

module.exports = router

router.get('/', (req, res) => {
  const client = new Client({})
  client
    .geocode({
      params: {
        address: '17a walter street, auckland',
        key: process.env.GEOCODE_API_KEY
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
