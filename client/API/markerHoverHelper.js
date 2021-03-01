import requestor from '../consume'
import { getAuthorizationHeader } from 'authenticare/client'
import request from 'authenticare/client/request'
const acceptJsonHeader = { Accept: 'application/json' }

export function startParking (parkId, consume = requestor) {
  return request.post('/api/v1/parker/parking/start')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send({ parkId })
    .then(transactionId => transactionId.body)
    .catch(err => console.error(err))
}
