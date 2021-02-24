const path = require('path')
const express = require('express')

const router = express.Router()
const { Client } = require('@googlemaps/google-maps-services-js')
require('dotenv').config()

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
      return null
    })
    .catch((e) => {
      console.log(e.response.data.error_message)
    })
})
