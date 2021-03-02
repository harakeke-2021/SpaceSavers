import request from 'superagent'
import requestor from '../consume'
import { getAuthorizationHeader, getEncodedToken } from 'authenticare/client'

const acceptJsonHeader = { Accept: 'application/json' }
const rootURL = '/api/v1/parker'

export function getActiveParksApi () {
  return request.get(rootURL + '/bookings')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
}

export function endParking (parkId, consume = requestor) {
  return request.post(rootURL)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send({ parkId })
    .then(transactionId => transactionId.body)
    .catch(err => console.error(err))
}
