const request = require('supertest')

const server = require('../server')
const db = require('../db/dbHelpers')

jest.mock('../db/dbHelpers', () => {
  return {
    getParksByOwnerId: jest.fn(),
    addPark: jest.fn(),
    editPark: jest.fn()
  }
})

const mockParks = [
  {
    id: 1,
    name: 'Test park 1',
    ownerId: 2,
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
  }
]

describe('GET api/v1/owner/:id', () => {
  it('responds with correct parks that match ownerId on res body', () => {
    db.getParksByOwnerId.mockImplementation(() => {
      return Promise.resolve(mockParks)
    })
    return request(server)
      .get('/api/v1/owner/2')
      .expect(200)
      .then(res => {
        expect(res.body).toHaveLength(2)
        expect(res.body[0].id).toBe(1)
        expect(res.body[1].id).toBe(2)
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.getParksByOwnerId.mockImplementation(() => Promise.reject(
      new Error('mock getParksByOwnerId error')
    ))
    return request(server)
      .get('/api/v1/owner/99')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(res.body.error.title).toBe('Unable to retrieve parks')
        return null
      })
  })
})

const newPark = {
  name: 'test park',
  ownerId: 3,
  address: 'test address',
  lat: -36.853102,
  lng: 174.7693262,
  price: 5,
  occupied: 0,
  occupantId: null
}

describe('POST api/v1/owner/addpark', () => {
  it('responds with new park on res body', () => {
    db.addPark.mockImplementation(() => {
      return Promise.resolve({
        id: 4,
        name: 'test park',
        ownerId: 3,
        address: 'test address',
        lat: -36.853102,
        lng: 174.7693262,
        price: 5,
        occupied: 0,
        occupantId: null
      })
    })
    return request(server)
      .post('/api/v1/owner/addpark')
      .send(newPark)
      .expect(201)
      .then(res => {
        expect(res.body.id).toBe(4)
        expect(res.body.address).toBe('test address')
        return null
      })
  })

  it('responds with 500 and correct error object on DB error', () => {
    db.addPark.mockImplementation(() => Promise.reject(
      new Error('mock addEvent error')
    ))
    return request(server)
      .post('/api/v1/owner/addPark')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(res => {
        expect(res.body.error.title).toBe('Unable to add park')
        return null
      })
  })
})
