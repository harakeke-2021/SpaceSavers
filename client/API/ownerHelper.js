import requestor from '../consume'

export function getOwnerBalance(consume = requestor) {
  return consume('/owner/balance', 'get')
}

export function addNewPark(newPark, consume = requestor) {
  return consume('/owner/addpark', 'post', newPark)
}
