import requestor from '../consume'

export function getOwnerBalance(consume = requestor) {
  return consume('/owner/balance', 'get')
}

export function addParkApi(newPark, consume = requestor) {
  return consume('/owner/addpark', 'post', newPark)
}

export function getParksByOwnerIdApi(id, consume = requestor) {
  return consume(`/owner/${id}`, 'get')
}
