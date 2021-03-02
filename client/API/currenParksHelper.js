import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'
// import { getAuthorizationHeader, getEncodedToken } from 'authenticare/client'
// const acceptJsonHeader = { Accept: 'application/json' }

const acceptJsonHeader = { Accept: 'application/json' }
const rootURL = '/api/v1/parker'

export function getActiveParksApi () {
  return request.get(rootURL + '/bookings')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
}
