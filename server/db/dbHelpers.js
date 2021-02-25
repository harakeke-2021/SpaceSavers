const connection = require('./connection')

module.exports = { getAllParks, setOccupied, setUnoccupied, getParkById, getAllUsers }

function getAllParks (db = connection) {
  return db('parks').select()
}

function setOccupied (userId, parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: true, occupant_id: userId })
}

function setUnoccupied (parkId, db = connection) {
  return db('parks')
    .where('id', parkId)
    .update({ occupied: false, occupant_id: null })
}

function getAllUsers(db = connection) {
  return db('users')
    .select()
}

function getUserById(userId, db = connection) {
  return 
}

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
