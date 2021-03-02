import request from 'superagent'
import requestor from '../consume'
import { getAuthorizationHeader } from 'authenticare/client'

const acceptJsonHeader = { Accept: 'application/json' }
const rootURL = '/api/v1/parker'

export function getActiveParksApi () {
  return request.get(rootURL + '/bookings')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
}

export function endParking (historyId, consume = requestor) {
  return request.patch(rootURL + '/parking/end')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send({ historyId })
    .then(transactionId => transactionId.body)
    .catch(err => console.error(err))
}
