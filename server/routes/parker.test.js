const request = require('supertest')

const server = require('../server')
const db = require('../db/dbHelpers')

jest.mock('../db/dbHelpers', () => {
  return {
    getAllParks: jest.fn(),
    getParkById: jest.fn()
  }
})

const mockParks = [
  {
    id: 1,
    name: 'Test park 1',
    ownerId: 1,
    address: '1 test address',
    lat: -36.8646253,
    lng: 174.7672811,
    price: 10,
    occupied: 0,
    occupantId: null
  },
  {
    id: 2,
    name: 'Test park 2',
    ownerId: 2,
    address: '2 test address',
    lat: -36.853105,
    lng: 174.7693262,
    price: 2,
    occupied: 0,
    occupantId: null
  },
  {
    id: 3,
    name: 'Test park 3',
    ownerId: 3,
    address: '3 test address',
    lat: -36.853101,
    lng: 174.7693262,
    price: 4,
    occupied: 0,
    occupantId: null
  }
]

describe('GET api/v1/parker', () => {
  it('responds with all parks', () => {
    db.getAllParks.mockImplementation(() => {
      return Promise.resolve(mockParks)
    })
    return request(server)
      .get('/api/v1/parker')
      .then(res => {
        expect(res.body.parks).toHaveLength(3)
        expect(res.body.parks[0].id).toBe(1)
        expect(res.body.parks[2].name).toBe('Test park 3')
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getAllParks.mockImplementation(() => Promise.reject(
      new Error('mock getAllParks error')
    ))
    return request(server)
      .get('/api/v1/parker')
      .expect(500)
      .then(res => {
        expect(res.body.error.title).toBe('Unable to retrieve parks')
        return null
      })
  })
})

describe('GET api/v1/parker/:id', () => {
  it('responds with correct park', () => {
    db.getParkById.mockImplementation(() => {
      return Promise.resolve(mockParks[0])
    })
    return request(server)
      .get('/api/v1/parker/1')
      .then(res => {
        expect(res.body.park.id).toBe(1)
        expect(res.body.park.name).toBe('Test park 1')
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getParkById.mockImplementation(() => Promise.reject(
      new Error('mock getParksByOwnerId error')
    ))
    return request(server)
      .get('/api/v1/parker/99')
      .expect(500)
      .then(res => {
        expect(res.body.error.title).toBe('Unable to retrieve park')
        return null
      })
  })
})
