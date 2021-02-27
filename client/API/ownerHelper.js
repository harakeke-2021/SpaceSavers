import request from 'superagent'
import requestor from '../consume'
import { getEncodedToken } from 'authenticare/client'

const rootURL = '/api/v1/owner'

export function getOwnerBalance (consume = requestor) {
  return consume('/owner/balance', 'get')
}



// POTENTIAL REFACTOR WITH CONSUME

export function addPark (park, url = rootURL) {
  return request.post(url)
    .set({'Accept': 'application/json'})
    .set({ 'Authorization': `Bearer ${getEncodedToken}` })
    .send(park)
    .then(res => res.body.parks)
    .catch(err => console.error(err))
}


export function getParksByOwnerIdApi(id, consume = requestor) {
  return consume(`/owner/${id}`, 'get')
}

