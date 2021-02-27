const express = require('express')
const db = require('../db/dbHelpers')
const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const ownerId = Number(req.params.id)

  return db
    .getParksByOwnerId(ownerId)
    .then((parks) => {
      res.json(parks)
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

router.post('/addpark', (req, res) => {
  const newPark = req.body
  return db
    .addPark(newPark)
    .then((result) => {
      res.status(201).json(result)
      return null
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).json({
        error: {
          title: 'Unable to add park'
        }
      })
    })
})
