const path = require('path')
const express = require('express')

const router = express.Router()
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')

const db = require('../db/dbHelpers')

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

router.get('/', (req, res) => {
  return db
    .getAllParks()
    .then((parks) => {
      res.json({ parks })
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve parks'
        }
      })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  return db
    .getParkById(id)
    .then((park) => {
      res.json({ park })
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to retrieve park'
        }
      })
    })
})
