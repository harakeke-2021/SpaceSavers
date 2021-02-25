const connection = require('./connection')

module.exports = {
  getAllParks,
  setOccupied,
  setUnoccupied,
  getParkById,
  getUserById,
  addPark,
  editPark
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
      'owner_id as ownerID',
      'address',
      'latlng',
      'price',
      'occupied',
      'occupant_id as occupantID'
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
