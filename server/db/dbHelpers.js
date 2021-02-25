const connection = require('./connection')

module.exports = { getAllParks, setOccupied, setUnoccupied }

function getAllParks(db = connection) {
  return db('parks').select()
}

function setOccupied(userId, parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: true, occupant_id: userId })
}

function setUnoccupied(parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: false, occupant_id: null })
}

// function getAllUsers() {}

// function getUserById() {}

// function getParkById() {}
