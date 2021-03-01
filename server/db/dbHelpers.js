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
  getParksByOwnerUsername,
  getUserParksbyId,
  addPark,
  editPark,
  deletePark,
  authorizeUpdate,
  getBalance,
  startPark,
  endPark,
  getHistoryByParkerId,
  getHistoryByOwnerId
}

// GET ALL PARKS

function getAllParks (db = connection) {
  return db('parks').select()
}

// SET OCCUPIED

function setOccupied (parkId, userId, db = connection) {
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

function getParksByOwnerUsername (username, db = connection) {
  return db('parks')
    .where('username', username)
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
    .then(res => res)
}

// GET USER PARKS BY ID

async function getUserParksbyId (id, db = connection) {
  return db('users')
    .join('parks', 'users.id', 'parks.owner_id')
    .where('parks.owner_id', id)
    .select(
      'parks.id as id',
      'username',
      'parks.name as name',
      'owner_id as ownerId',
      'address',
      'lat',
      'lng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
    .then(res => console.log('res for getUserParksbyId', res))
}

// ADD PARK

async function addPark (newPark, user, db = connection) {
  const park = {
    // username: user.username,
    name: newPark.name,
    owner_id: user.id,
    address: newPark.address,
    lat: newPark.lat,
    lng: newPark.lng,
    price: newPark.price,
    occupied: false
  }

  console.log('inside addPark dbHelper', park)
  return db('parks')
    .insert(park)
    .then(() => db)
    .then(getUserParksbyId(user.id))
}

// EDIT PARK

async function editPark (updatePark, user, db = connection) {
  return db('parks')
    .where('id', updatePark.id)
    .first()
    .then(park => authorizeUpdate(park, user))
    .then(() => {
      return db('parks')
        .where('id', updatePark.id)
        .update(updatePark)
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

// GET ACCOUNT BALANCE

async function getBalance (db = connection) {
  return db('users')
    .select('balance')
}

// AUTHORIZE FUNCTION

function authorizeUpdate (park, user) {
  if (park.added_by_user !== user.id) {
    throw new Error('Unauthorized')
  }
}

function startPark (parkId, userId, db = connection) {
  return db('park_history').insert({
    park_id: parkId,
    user_id: userId,
    start_time: Date.now()
  })
}

function endPark (parkId, userId, db = connection) {
  return db('park_history')
    .where({
      park_id: parkId,
      user_id: userId
    })
    .update({ end_time: Date.now(), finished: true })
}

function getHistoryByParkerId (userId, db = connection) {
  return db('park_history')
    .where({ user_id: userId })
    .join('parks', 'park_history.id', 'parks.id')
    .select(
      'park_history.id as historyId',
      'park_history.park_id as parkId',
      'park_history.user_id as parkerId',
      'park_history.start_time as startTime',
      'park_history.end_time as endTime',
      'park_history.cost as cost',
      'park_history.finished as finished',
      'parks.name as parkName',
      'parks.address as parkAddress'
    )
}

function getHistoryByOwnerId (ownerId, db = connection) {
  return db('park_history')
    .join('parks', 'park_history.id', 'parks.id')
    // .where('parks.owner_id', ownerId)
    .select(
      'park_history.id as historyId',
      'park_history.park_id as parkId',
      'park_history.user_id as parkerId',
      'park_history.start_time as startTime',
      'park_history.end_time as endTime',
      'park_history.cost as cost',
      'park_history.finished as finished',
      'parks.name as parkName',
      'parks.address as parkAddress',
      'parks.owner_id as ownerId'
    )
}
