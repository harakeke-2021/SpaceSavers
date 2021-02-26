const express = require('express')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {})

router.get('/balance', (req, res) => {
  res.json({ balance: 50.01 })
})
