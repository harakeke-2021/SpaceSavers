import request from 'superagent'
import requestor from '../consume'
// import { getEncodedToken } from 'authenticare/client'
import { getAuthorizationHeader } from 'authenticare/client'
const acceptJsonHeader = { Accept: 'application/json' }

const rootURL = '/api/v1/owner'

export function getOwnerBalance () {
  return request.get(rootURL + '/balance')
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
}

// POTENTIAL REFACTOR WITH CONSUME

export function addParkApi (park, url = rootURL) {
  return request.post(url)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(park)
    .then(res => res.body.parks)
    .catch(err => console.error(err))
}

export function getParksByOwnerIdApi (url = rootURL) {
  return request.get(`${url}/parks`)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .then(res => {
      return res.body.parks
    })
    .catch(err => console.error(err))
}

export function getHistoryByOwnerIdApi (url = rootURL) {
  return request.get(`${url}/history`)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .then(res => {
      return res.body.history
    })
    .catch(err => console.error(err))
}
