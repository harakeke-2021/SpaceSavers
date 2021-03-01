import request from 'superagent'
import requestor from '../consume'
import { getEncodedToken } from 'authenticare/client'
const acceptJsonHeader = { Accept: 'application/json' }

const rootURL = '/api/v1/owner'

export function getOwnerBalance (consume = requestor) {
  return consume('/owner/balance', 'get')
}

// POTENTIAL REFACTOR WITH CONSUME

export function addParkApi (park, url = rootURL) {
  console.log(park)
  return request.post(url)
    .set(acceptJsonHeader)
    .set({ 'Authorization': `Bearer ${getEncodedToken}` })
    .send(park)
    .then(res =>{ 
      console.log(res)
      res.body.parks})
    .catch(err => console.error(err))
}

export function getParksByOwnerIdApi(url = rootURL) {
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
