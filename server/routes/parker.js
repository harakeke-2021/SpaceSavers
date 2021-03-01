// const path = require('path')
const express = require('express')
const { getTokenDecoder } = require('authenticare/server')
const router = express.Router()
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')

const db = require('../db/dbHelpers')

module.exports = router

router.use(getTokenDecoder(), (req, res, next) => {
  next()
})

router.post('/', (req, res) => {
  const { address } = req.body
  const client = new Client({})
  client
    .geocode({
      params: {
        address,
        region: 'nz',
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

router.get('/park/:id', (req, res) => {
  const id = Number(req.params.id)
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

router.post('/parking/start', (req, res) => {
  // const parkerId = from authenticare once setup, won't need userId from
  const { parkId, userId } = req.body
  db.startPark(parkId, userId)
    .then((result) => {
      res.send(`${result} parking started`)
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to start park'
        }
      })
    })
})

// won't need parker id as url param once authenticare integrated
router.post('/parking/end', (req, res) => {
  // const parkerId = from authenticare
  const { parkId, userId } = req.body
  db.endPark(parkId, userId)
    .then((result) => {
      res.send(`${result} parking ended`)
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title:
            'Could not find parking history with Park ID' +
            parkId +
            'and User ID' +
            userId
        }
      })
    })
})

router.get('/history', (req, res) => {
  const user = req.user
  console.log(user)
  db.getHistoryByParkerId(user.id)
    .then(result => [result].flat())
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to get History'
        }
      })
    })
})
