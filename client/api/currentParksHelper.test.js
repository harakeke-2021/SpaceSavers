const config = require('../../server/db/knexfile').test
const testDb = require('knex')(config)

const db = require('../../server/db/dbHelpers')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('owners database functions', () => {
  it('getAllParks to return correct amount of parks', () => {
    return db.getAllParks(testDb)
      .then((parks) => {
        expect(parks).toHaveLength(2)
      })
  })


  it('')
})
