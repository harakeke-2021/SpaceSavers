const path = require('path')
const express = require('express')

const parkerRoutes = require('./routes/parker')
const ownerRoutes = require('./routes/owner')
const authRoutes = require('./routes/auth')
const { getTokenDecoder } = require('authenticare/server')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/parker', parkerRoutes)
server.use('/api/v1/owner', ownerRoutes)
server.use('/api/v1', authRoutes)

module.exports = server
