const connection = require('./connection')

const { generateHash } = require('authenticare/server')
const { falseDependencies } = require('mathjs')

module.exports = {
  getAllParks,
  setOccupied,
  setUnoccupied,
  getParkById,
  createUser,
  userExists,
  getUserById,
  getUserByName,
  // getUserParksbyId,
  getParksByOwnerId,
  addPark,
  updatePark,
  deletePark,
  getFullUser,
  authorizeUpdate,
  getOwnerBalance,
  startPark,
  endPark,
  getHistoryByParkerId,
  getHistoryByOwnerId
  // getOpenBookingsByUserId,
  // newEndPark
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
    .select('id', 'username', 'name', 'email', 'registration')
    .then((result) => {
      const user = result[0]
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        registration: user.registration
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
    .then((exists) => {
      if (exists) {
        throw new Error('User exists')
      }
      return null
    })
    .then(() => generateHash(password))
    .then((passwordHash) => {
      return db('users').insert({ username, name, email, hash: passwordHash })
    })
}

// USER EXISTS

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
}

// GET USER BY NAME

function getUserByName (username, db = connection) {
  return db('users')
    .select('username', 'name', 'email', 'id', 'hash', 'registration')
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
      'lat',
      'lng',
      'price',
      'occupied',
      'occupant_id as occupantId'
    )
}

// ADD PARK

async function addPark (newPark, user, db = connection) {
  const park = {
    name: newPark.name,
    owner_id: user.id,
    address: newPark.address,
    lat: newPark.lat,
    lng: newPark.lng,
    price: newPark.price,
    occupied: false
  }
  return db('parks')
    .insert(park)
    .then(() => db)
    .then(getParksByOwnerId(user.id))
}

// UPDATE PARK

async function updatePark (updatePark, user, db = connection) {
  return db('parks')
    .where('id', updatePark.id)
    .first()
    .then((park) => authorizeUpdate(park, user))
    .then(() => {
      return db('parks').where('id', updatePark.id).update(updatePark)
    })
    .then(() => db)
    .then(getParksByOwnerId(user.id))
}

// DELETE PARK

async function deletePark (parkId, user, db = connection) {
  return db('parks')
    .where('id', parkId)
    .first()
    .then((park) => authorizeUpdate(park, user))
    .then(() => {
      return db('parks').where('id', parkId).delete()
    })
    .then(() => db)
    .then(getParksByOwnerId(user.id))
}

// RETURN FULL USER PARK

async function getFullUser (userId, db = connection) {
  return db('users')
    .join('parks', 'users.id', 'parks.owner_id')
    .where('users.id', userId)
    .select(
      'users.id as id',
      'username',
      'name',
      'email',
      'balance',
      'registration',
      'parks.id as parkId',
      'address',
      'parks.id as parkId',
      'lat',
      'lng',
      'price',
      'occupied'
    )
}

// GET ACCOUNT BALANCE

async function getOwnerBalance (id, db = connection) {
  return db('users')
    .first({ id })
    .select('balance')
    .then((result) => {
      return result.balance
    })
}

// AUTHORIZE FUNCTION

function authorizeUpdate (park, user) {
  if (park.owner_id !== user.id) {
    throw new Error('Unauthorized')
  }
}

function checkIfParkOccupied (parkId, db = connection) {
  return db('parks')
    .where({ id: parkId })
    .first()
    .select('occupied')
    .then((result) => {
      if (!result) {
        throw new Error('No Park with that ID Found')
      } else if (result.occupied) {
        throw new Error(`Park with ID ${parkId} is already occupied`)
      } else {
        return result
      }
    })
}

async function startPark (parkId, userId, db = connection) {
  // try {
  await db.transaction(async trx => {
    await checkIfParkOccupied(parkId, trx)
    await setOccupied(parkId, userId, trx)
    await trx('park_history').insert({
      park_id: parkId,
      user_id: userId,
      start_time: Math.floor(Date.now() / 1000),
      finished: false
    })
  })
  return 'Parking Started'
  // } catch (error) {
  //   console.log('DB Error:', error.message)
  // }

  // return checkIfParkOccupied(parkId)
  //   .then(() => {
  //     return setOccupied(parkId, userId)
  //   })
  //   .then(() => {
  //     return db('park_history').insert({
  //       park_id: parkId,
  //       user_id: userId,
  //       start_time: Math.floor(Date.now() / 1000),
  //       finished: false
  //     })
  //   })
}

async function endPark (historyId, userId, db = connection) {
  const trxProvider = db.transactionProvider()
  const trx1 = await trxProvider()
  const trx2 = await trxProvider()
  const trx3 = await trxProvider()
  const trx4 = await trxProvider()
  // const trx5 = await trxProvider()
  // const trx6 = await trxProvider()
  // const trx7 = await trxProvider()
  try {
    const endTime = Math.floor(Date.now() / 1000)
    const { parkId, ownerBalance, price, startTime } = await endParkHelper(historyId, trx1)
    const secondsElapsed = endTime - startTime
    const hours = secondsElapsed / (60 * 60)
    const cost = Math.round(hours * price * 100) / 100

    // const cost = await calculateCost(historyId, userId, endTime, trx1)
    await updateParkHistory(historyId, userId, endTime, cost, trx2)
    console.log(parkId)
    await setUnoccupied(parkId, trx3)
    const newBalance = ownerBalance + cost
    await updateUserBalance(userId, newBalance, trx4)

    trx1.commit()
    trx2.commit()
    trx3.commit()
    trx4.commit()
    // trx5.commit()
    // trx6.commit()
    // trx7.commit()
    return 'Parking Ended'
  } catch (error) {
    trx1.rollback()
    trx2.rollback()
    trx3.rollback()
    trx4.rollback()
    // trx5.rollback()
    // trx6.rollback()
    // trx7.rollback()
    throw new Error('hello')
  }
}

function updateUserBalance (userId, newBalance, db = connection) {
  return db('users')
    .where({ id: userId })
    .update({ balance: newBalance })
}

function endParkHelper (historyId, db = connection) {
  return db('park_history')
    .where({ 'park_history.id': historyId }).first()
    .leftJoin('parks', 'park_history.park_id', 'parks.id')
    .leftJoin('users', 'parks.owner_id', 'users.id')
    .select('park_id as parkId',
      'users.balance as ownerBalance',
      'parks.price as price',
      'park_history.start_time as startTime'
    )
    .then(res => {
      console.log(res)
      return res
    })
}

function updateParkHistory (historyId, userId, endTime, cost, db = connection) {
  return db('park_history')
    .where({
      id: historyId,
      user_id: userId
    })
    .first()
    .update({ end_time: endTime, cost: cost, finished: true })
}

// function endPark (historyId, userId, db = connection) {
//   return calculateCost(historyId, userId)
//     .then(([endTime, cost]) => {
//       return db('park_history')
//         .where({
//           id: historyId,
//           user_id: userId
//         })
//         .first()
//         .update({ end_time: endTime, cost: cost, finished: true })
//     })
// }

async function calculateCost (historyId, userId, endTime, db = connection) {
  return db('park_history')
    .join('parks', 'park_history.park_id', 'parks.id')
    .where({
      'park_history.id': historyId,
      'park_history.user_id': userId
    })
    .first()
    .select('park_history.start_time as startTime', 'parks.price as price')
    .then((res) => {
      const { startTime, price } = res
      // const endTime = Math.floor(Date.now() / 1000)
      const secondsElapsed = endTime - startTime
      const hours = secondsElapsed / (60 * 60)
      const cost = Math.round(hours * price * 100) / 100
      return cost
    })
}

function getHistoryByParkerId (userId, isFinished, db = connection) {
  return db('park_history')
    .join('parks', 'park_history.park_id', 'parks.id')
    .where({
      'park_history.user_id': userId,
      'park_history.finished': isFinished
    })
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
    .join('parks', 'park_history.park_id', 'parks.id')
    .where({ 'parks.owner_id': ownerId, 'park_history.finished': true })
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

// below function is the basically the same as getHistoryByParkerId so resuing that and passed in isFinished as an arg from the route
// function getOpenBookingsByUserId (userId, db = connection) {
//   console.log(userId)
//   return db('park_history')
//     .join('parks', 'park_history.park_id', 'parks.id')
//     .where({ 'park_history.user_id': userId, 'park_history.finished': false })
//     .select(
//       'park_history.user_id as userId',
//       'park_history.park_id as parkId',
//       'park_history.start_time as startTime',
//       'parks.name as parkName',
//       'parks.address as parkAddress',
//       'park_history.finished as finished'
//     )
// }
