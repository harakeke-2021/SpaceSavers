import requestor from '../consume'

export function getGeoCode (address, consume = requestor) {
  return consume('/parker/geocode', 'post', address)
}

export function getAllParksApi (consume = requestor) {
  return consume('/parker', 'get')
}
