import {
  getParksByOwnerIdApi,
  getOwnerBalance,
  addParkApi
} from '../API/ownerHelper'

export const GET_BALANCE = 'GET_BALANCE'
export const GET_PARKS_BY_OWNER_ID = 'GET_PARKS_BY_OWNER_ID'
export const ADD_PARK = 'ADD_PARK'

export function updateOwnerBalance (dispatch) {
  getOwnerBalance().then((result) => {
    const balance = result.body.balance
    dispatch({
      type: GET_BALANCE,
      balance
    })
    return null
  })
    .catch(error => console.log(error.message))
}

export function getParksByOwnerId (id = 1, dispatch) {
  getParksByOwnerIdApi(1).then((result) => {
    const parks = result.body
    console.log('actions', parks)
    return dispatch({
      type: GET_PARKS_BY_OWNER_ID,
      parks
    })
  })
    .catch(error => console.log(error.message))
}

export function addPark (park, dispatch) {
  addParkApi(park)
    .then((result) => {
      console.log(result)
      return dispatch({
        type: ADD_PARK,
        park
      })
    })
    .catch((error) => console.log(error.message))
}
