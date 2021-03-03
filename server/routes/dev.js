const express = require('express')
const router = express.Router()
const request = require('superagent')
const db = require('../db/dbHelpers')

module.exports = router

// router.get('/newuser', (req, res) => {
//   request
//     .get('https://randomuser.me/api')
//     .then((r) => {
//       const u = r.body.results[0]
//       const newUser = {
//         name: u.name.first,
//         username: u.login.username,
//         email: u.email,
//         password: u.login.password
//       }
//       return request.post('http://localhost:3000/api/v1/auth/register').send(newUser)
//     })
//     .then(result => {
//       console.log(result.body)
//       return res.send(result.body)
//     })
//     .catch((error) => {
//       console.log(error)
//       res.set(500).send(error.message)
//     })
// })

router.get('/newuser', async (req, res) => {
  const user = await request.get('https://randomuser.me/api').then((r) => {
    return r.body.results[0]
  })

  const registerPayload = {
    name: user.name.first,
    username: user.login.username,
    email: user.email,
    password: user.login.password
  }

  await request
    .post('http://localhost:3000/api/v1/auth/register')
    .send(registerPayload)
  const { id } = await db.getIdByUsername(user.login.username)
  const latlng = await request.post('http://localhost:3000/api/v1/parker/geocode').send({address:user.location.city + " " +user.location.country })
  const parkingSpot = {
    name: user.name.first + "'s Parking Spot",
    address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`,
    lat: latlng.body.location.lat,
    lng: latlng.body.location.lng,
    price: Math.floor(Math.random() * 40 * 100) / 100
  }
  const addedPark = await db.addPark(parkingSpot, {id: id})
  res.json(registerPayload)
  // .then(result => {
  //   console.log(result.body)
  //   return res.send(result.body)
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.set(500).send(error.message)
  // })
})
