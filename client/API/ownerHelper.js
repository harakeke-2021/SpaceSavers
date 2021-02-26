import requestor from '../consume'

export function getOwnerBalance(consume = requestor) {
  return consume('/owner/balance', 'get')
}
