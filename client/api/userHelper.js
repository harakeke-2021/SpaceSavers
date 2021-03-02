import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'
// import requestor from '../consume'

const acceptJsonHeader = { Accept: 'application/json' }
const rootURL = '/api/v1/parker'

export function getUserHistoryApi () {
  return request.get(rootURL + '/history')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
}
