import requestor from '../consume'

export function startParking (parkId, consume = requestor) {
  return consume('/parker/start', 'post', parkId)
}
