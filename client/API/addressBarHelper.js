import requestor from '../consume'

export function getAllParksApi (consume = requestor) {
  return consume('/parker', 'get')
}
