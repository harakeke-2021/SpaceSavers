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
  deletePark,
  authorizeUpdate
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
      'username',
      'name',
      'email'
    )
    .then(result => {
      const user = result[0]
      return {
        id: user.id,
        username: user.username,
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
      'username',
      'name',
      'owner_id as ownerId',
      'address',
      'lat',
      'lng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
    .then((result) => {
      const park = result[0]
      return {
        id: park.id,
        username: park.username,
        name: park.name,
        ownerId: park.ownerId,
        address: park.address,
        lat: park.lat,
        lng: park.lng,
        price: park.price,
        occupied: park.occupied,
        occupantId: park.occupantId
      }
    })
}

// CREATE USER

function createUser (newUser, db = connection) {
  const { username, name, email, password } = newUser

  return userExists(username, db)
    .then(exists => {
      if (exists) {
        throw new Error('User exists')
      }
      return null
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username, name, email, hash: passwordHash })
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
    .select('username', 'name', 'email', 'id', 'hash')
    .where('username', username)
    .first()
}

// GET PARK BY OWNER ID

function getParksByOwnerId (ownerId, db = connection) {
  return db('parks')
    .where('owner_id', ownerId)
    .select(
      'id',
      'username',
      'name',
      'owner_id as ownerId',
      'address',
      'lat',
      'lng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
}

// ADD PARK

async function addPark (newPark, ownerId, latlng, user, db = connection) {
  const park = {
    username: newPark.username,
    name: newPark.name,
    owner_id: ownerId,
    address: newPark.address,
    latlng,
    price: newPark.price,
    occupied: false,
    occupant_id: null
  }

  park.added_by_user = user.id

  return db('parks')
    .insert(park)
    .then(() => db)
}

// EDIT PARK

async function editPark (updatePark, db = connection) {
  return db('parks')
    .update({
      name: updatePark.name,
      price: updatePark.price
    })
}

// DELETE PARK

async function deletePark (parkId, user, db = connection) {
  return db('parks')
    .where('id', parkId)
    .first()
    .then(park => authorizeUpdate(park, user))
    .then(() => {
      return db('parks')
        .where('id', parkId)
        .delete()
    }
    )
}

// AUTHORIZE FUNCTION

function authorizeUpdate (park, user) {
  if (park.added_by_user !== user.id) {
    throw new Error('Unauthorized')
  }
}
