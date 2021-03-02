import requestor from '../consume'

export function getGeoCode (address, consume = requestor) {
  return consume('/parker/geocode', 'post', address)
}
