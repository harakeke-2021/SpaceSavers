// const path = require('path')
const express = require('express')
const { getTokenDecoder } = require('authenticare/server')
const router = express.Router()
require('dotenv').config()
const { Client } = require('@googlemaps/google-maps-services-js')

const db = require('../db/dbHelpers')

module.exports = router

router.post('/geocode', (req, res) => {
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
      res.json(r.data.results[0].geometry)
      return null
    })
    .catch((e) => {
      console.log(e.message)
    })
})

// router.post('/geolocate', (req, res) => {
//   console.log(req.ip)
//   res.send(req.ip)
// })

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

router.post('/parking/start', getTokenDecoder(), (req, res) => {
  const userId = req.user.id
  const { parkId } = req.body
  db.startPark(parkId, userId)
    .then((result) => {
      res.send(result)
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

router.patch('/parking/end', getTokenDecoder(), (req, res) => {
  const userId = req.user.id
  const { historyId } = req.body

  db.newEndPark(historyId, userId)
    .then((result) => {
      res.send(`${result} parking ended`)
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title:
            'Could not find parking history with History ID' +
            historyId
        }
      })
    })
})

router.get('/history', getTokenDecoder(), (req, res) => {
  const user = req.user
  const isFinished = true
  db.getHistoryByParkerId(user.id, isFinished)
    // .then(result => [result].flat())
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

router.get('/bookings', getTokenDecoder(), (req, res) => {
  const user = req.user
  const isFinished = false
  db.getHistoryByParkerId(user.id, isFinished)
    .then(result => {
      res.json(result)
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to get Bookings'
        }
      })
    })
})
