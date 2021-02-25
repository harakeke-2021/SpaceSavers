const path = require('path')
const express = require('express')

const router = express.Router()
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')
require('dotenv').config()

module.exports = router

router.post('/', (req, res) => {
  const { address } = req.body
  const client = new Client({})
  client
    .geocode({
      params: {
        address,
        key: process.env.GEOCODE_API_KEY
      },
      timeout: 1000 // milliseconds
    })
    .then((r) => {
      // console.log(r.data.results[0].geometry)
      res.json(r.data.results[0].geometry)
      return null
    })
    .catch((e) => {
      console.log(e.message)
    })
})
