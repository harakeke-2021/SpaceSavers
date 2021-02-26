const connection = require('./connection')

const { generateHash } = require('authenticare/server')

module.exports = {
  getAllParks,
  setOccupied,
  setUnoccupied,
  getParkById,
  createUser,
  userExists,
  getUserById,
  getUserByName,
  getParksByOwnerId,
  addPark,
  editPark,
  deletePark
}

// GET ALL PARKS

function getAllParks (db = connection) {
  return db('parks').select()
}

// SET OCCUPIED

function setOccupied (userId, parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: true, occupant_id: userId })
}

// SET UNOCCUPIED

function setUnoccupied (parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: false, occupant_id: null })
}

// GET USER BY ID

function getUserById (userId, db = connection) {
  return db('users')
    .where('id', userId)
    .select(
      'id',
      'name',
      'email'
    )
    .then(result => {
      const user = result[0]
      return {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
}

// GET PARK BY ID

function getParkById (parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .select(
      'id',
      'name',
      'owner_id as ownerId',
      'address',
      'latlng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
    .then(result => {
      const park = result[0]
      return {
        id: park.id,
        name: park.name,
        ownerId: park.ownerId,
        address: park.address,
        latlng: park.latlng,
        price: park.price,
        occupied: park.occupied,
        occupantId: park.occupantId
      }
    }
    )
}

// CREATE USER

function createUser (newUser, db = connection) {
  const { username, email, password } = newUser

  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
      return null
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username, email, hash: passwordHash })
    })
}

// USER EXISTS

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

// GET USER BY NAME

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where('username', username)
    .first()
}

// GET PARK BY OWNER ID

function getParksByOwnerId (ownerId, db = connection) {
  return db('parks')
    .where('owner_id', ownerId)
    .select(
      'id',
      'name',
      'owner_id as ownerId',
      'address',
      'latlng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
}

// ADD PARK

function addPark (newPark, ownerId, latlng, db = connection) {
  return db('parks')
    .insert({
      name: newPark.name,
      owner_id: ownerId,
      address: newPark.address,
      latlng,
      price: newPark.price,
      occupied: false,
      occupant_id: null
    })
}

// EDIT PARK

function editPark (updatePark, db = connection) {
  return db('parks')
    .update({
      name: updatePark.name,
      price: updatePark.price
    })
}

// DELETE PARK

function deletePark (parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .delete()
}
