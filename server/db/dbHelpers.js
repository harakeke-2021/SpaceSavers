const connection = require('./connection')

module.exports = {
  getAllParks,
  setOccupied,
  setUnoccupied,
  getParkById,
  getUserById,
  getParksByOwnerId,
  addPark,
  editPark,
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
    .select('id', 'name', 'email')
    .then((result) => {
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

// GET PARK BY OWNER ID

function getParksByOwnerId (ownerId, db = connection) {
  return db('parks')
    .where('owner_id', ownerId)
    .select(
      'id',
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

function addPark (newPark, ownerId = 1, db = connection) {
  console.warn(
    '!!!!!!!!!!!!!!!!!!!!!!!!!!!ownerId is 1 as a default for testing purposes'
  )
  return db('parks').insert({
    name: newPark.name,
    owner_id: ownerId,
    address: newPark.address,
    lat: newPark.lat,
    lng: newPark.lng,
    price: newPark.price,
    occupied: false,
    occupant_id: null
  })
}

// EDIT PARK

function editPark (updatePark, db = connection) {
  return db('parks').update({
    name: updatePark.name,
    price: updatePark.price
  })
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
