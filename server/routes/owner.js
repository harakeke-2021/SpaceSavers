const express = require('express')
const db = require('../db/dbHelpers')
const { getTokenDecoder } = require('authenticare/server')
const router = express.Router()

module.exports = router

// GET /api/v1/owner

router.get('/parks', getTokenDecoder(), async (req, res) => {
  const user = req.user.username

  try {
    const parks = await db.getParksByOwnerUsername(user)
    res.json({ parks })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      error: {
        title: 'Unable to retrieve parks'
      }

    })
  }
})

// POST /api/v1/owner

router.post('/addpark', getTokenDecoder(), async (req, res) => {
  const newPark = req.body

  const user = req.user

  try {
    const parks = await db.addPark(newPark, user)
    res.json({ parks })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

// DELETE /api/v1/owner
router.delete('/:id', getTokenDecoder(), async (req, res) => {
  const id = Number(req.params.id)
  const user = req.user

  try {
    const parks = await db.deletePark(id, user)
    res.json({ parks })
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).send(
        'Unauthorized: Only the user who added the park may delete it'
      )
    }
    res.status(500).send(err.message)
  }
})

router.get('/', getTokenDecoder(), async (req, res) => {
  try {
    const balance = await db.getBalance()
    res.json({ balance })
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).send(
        'Unauthorized: Cannot get balance'
      )
    }
    res.status(500).send(err.message)
  }
})
