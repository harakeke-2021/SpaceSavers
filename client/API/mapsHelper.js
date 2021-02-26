import requestor from '../consume'

export function getGeoCode(address, consume = requestor) {
  return consume('/parker', 'post', address)
}

export function getOwnerBalance(consume = requestor) {
  return consume('/owner/balance', 'get')
}
