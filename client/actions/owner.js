import {
  getParksByOwnerIdApi,
  getOwnerBalance,
  addParkApi,
  getHistoryByOwnerIdApi
} from '../api/ownerHelper'

import { dispatch } from '../store'

export const GET_BALANCE = 'GET_BALANCE'
export const GET_PARKS_BY_OWNER_ID = 'GET_PARKS_BY_OWNER_ID'
export const ADD_PARK = 'ADD_PARK'
export const GET_USERNAME = 'GET_USERNAME'
export const GET_OWNER_HISTORY = 'GET_OWNER_HISTORY'

export function updateOwnerBalance (dispatch) {
  getOwnerBalance()
    .then((result) => {
      const balance = result.body.balance
      dispatch({
        type: GET_BALANCE,
        balance
      })
      return null
    })
    .catch((error) => console.log(error.message))
}

export function getParksByOwnerId () {
  getParksByOwnerIdApi()
    .then((parks) => {
      return dispatch({
        type: GET_PARKS_BY_OWNER_ID,
        parks
      })
    })
    .catch((error) => console.log(error.message))
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

export function getHistoryByOwnerId () {
  getHistoryByOwnerIdApi().then(history => {
    console.log(history)
    dispatch({
      type: GET_OWNER_HISTORY,
      history
    })
    return null
  })
    .catch((error) => console.log(error.message))
}
