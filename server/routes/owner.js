const express = require('express')
const db = require('../db/dbHelpers')
const router = express.Router()

module.exports = router

router.get('/:id', (req, res) => {
  const ownerId = req.params.id
  return db.getParksByOwnerId(ownerId)
    .then(parks => {
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
