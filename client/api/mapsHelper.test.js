import { test } from '../../server/db/knexfile'
import { getGeoCode } from './mapsHelper'

test('getGeoCode returns the correct the correct lat/lng', () => {
  // arrange
  const address = {
    address: '12 Morgan Place, Newmarket, Auckland'
  }
  // act

  const geoCode = getGeoCode(address)
  // assert
  expect(geoCode).toMatch({ lat: -36.8646253, lng: 174.7672811 })
})
