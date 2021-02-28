import { getAllParksApi } from '../api/addressBarHelper'
import { dispatch } from '../store'

export const GET_ALL_PARKS = 'GET_ALL_PARKS'
export const GET_PARKER_HISTORY = 'GET_PARKER_HISTORY'

export function getAllParks (parks) {
  getAllParksApi()
    .then(res => {
      const { parks } = res.body
      dispatch({
        type: GET_ALL_PARKS,
        parks
      })
      return null
    })
    .catch(err => console.error(err))
}

export function getHistoryByParkerId () {
  // p
export function setParks (parks) {
  return {
    type: SET_ALL_PARKS,
    parks
  }
}
