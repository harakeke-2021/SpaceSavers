const express = require('express')
const db = require('../db/dbHelpers')
const { getTokenDecoder } = require('authenticare/server')
const router = express.Router()

module.exports = router

router.get('/:id', getTokenDecoder(), async (req, res) => {
  const ownerId = req.params.id
  try {
    const parks = await db.getParksByOwnerId(ownerId)
    res.json({ parks })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve parks'
      }
    })
  }
}
)


