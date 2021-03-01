import request from 'superagent'
import requestor from '../consume'
import { getAuthorizationHeader, getEncodedToken } from 'authenticare/client'
const acceptJsonHeader = { Accept: 'application/json' }

const rootURL = '/api/v1/owner'

export function getOwnerBalance (consume = requestor) {
  return consume('/owner/balance', 'get')
}

// POTENTIAL REFACTOR WITH CONSUME

export function addParkApi (park, url = rootURL) {
  return request.post(url)
  .set(acceptJsonHeader)
  .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
    .send(park)
    .then(res => {
      console.log('res', res)
      return res.body.parks
    })
    .catch(logError)
}

export function getParksByOwnerIdApi (url = rootURL) {
  return request.get(url)
    .set(acceptJsonHeader)
    .then(res => {
      return res.body.parks
    })
    .catch(err => console.error(err))
}

export function getHistoryByOwnerIdApi (id, consume = requestor) {
  return consume(`/owner/history/${id}`, 'get')
}

export function updateParkApi(park, url = rootURL) {
  return request.patch(url)
    .set(acceptJsonHeader)
    .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
    .send(park)
    .then(res => res.body.parks)
    .catch(logError)
}

export function deleteParkApi(id, url = rootURL) {
  return request.patch(`/${url}/${id}`)
    .set(acceptJsonHeader)
    .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
    .then(res => res.body.parks)
    .catch(logError)
}


function logError (err) {
  if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the fruit may update and delete it')
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'Error consuming the API (in client/api.js):',
      err.message
    )
    throw err
  }
}
