const express = require('express')
const db = require('../db/dbHelpers')
const { getTokenDecoder } = require('authenticare/server')
const router = express.Router()

module.exports = router

// GET /api/v1/owner

router.use(getTokenDecoder(), (req, res, next) => {
  next()
})

router.get('/', async (req, res) => {
  const user = req.user

  try {
    const parks = await db.getParksByOwnerId(user.id)
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

router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

// UPDATE PARK /api/v1/owner

router.put('/', async (req, res) => {
  const newPark = req.body
  const user = req.user
  try {
    const parks = await db.udpatePark(newPark, user)
    res.json({ parks })
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).send(
        'Unauthorized: Only the user who added the park may update it'
      )
    }
    res.status(500).send(err.message)
  }
})

router.get('/balance', async (req, res) => {
  const user = req.user
  try {
    const balance = await db.getOwnerBalance(user.id)
    console.log(balance)
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

router.get('/history', (req, res) => {
  const user = req.user
  return db
    .getHistoryByOwnerId(user.id)
    .then((history) => res.json({ history }))
})
