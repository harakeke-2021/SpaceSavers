const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const db = require('./dbHelpers')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

// tests to do:
// setOccupied
// setUnoccupied

describe('getAllParks', () => {
  it('returns all parks', () => {
    return db.getAllParks(testDb)
      .then(parks => {
        expect(parks).toHaveLength(2)
        return null
      })
  })
})

describe('getParkById', () => {
  it('returns correct park', () => {
    return db.getParkById(2, testDb)
      .then(park => {
        expect(park.id).toBe(2)
        expect(park.name).toBe('Test park 2')
        expect(park.price).toBe(2)
        return null
      })
  })
})

describe('getParksByOwnerId', () => {
  it('returns correct number of parks that match ownerId', () => {
    return db.getParksByOwnerId(2, testDb)
      .then(parks => {
        expect(parks).toHaveLength(2)
        expect(parks[1].id).toBe(2)
        expect(parks[0].ownerId).toBe(2)
        return null
      })
  })
})

describe('getUserById', () => {
  it('returns correct user', () => {
    return db.getUserById(3, testDb)
      .then(user => {
        expect(user.id).toBe(3)
        expect(user.name).toBe('Paul')
        expect(user.email).toBe('paul@example.com')
        return null
      })
  })
})

describe('addPark', () => {
  it('adds a new park', () => {
    const newPark = {
      name: 'Test park 5',
      address: '5 test address',
      lat: -36.8646253,
      lng: 174.7672811,
      price: 5,
      occupied: false,
      occupantId: null
    }

    return db.addPark(newPark, 3, testDb)
      .then((ids) => {
        expect(ids[0]).toBe(3)
        return null
      })
  })
})

describe('editPark', () => {
  it('edit correct park', () => {
    const updatePark = {
      id: 1,
      name: 'Test park changed',
      price: 5
    }

    return db.editPark(updatePark, 1, testDb)
      .then((park) => {
        expect(park.id).toBe(1)
        expect(park.name).toBe('Test park changed')
        expect(park.price).toBe(5)
        return null
      })
  })
})

describe('deletePark', () => {
  it('deletePark db function', () => {
    const user = { id: 2, name: 'Freya', email: 'freya@example.com' }

    return db.deletePark(1, user, testDb)
      .then(() => {
        return db.getAllParks(testDb)
          .then((parks) => {
            expect(parks).toHaveLength(1)
          })
      })
  })
})


