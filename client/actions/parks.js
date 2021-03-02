import { getAllParksApi } from '../api/addressBarHelper'
import { dispatch } from '../store'
import { getActiveParksApi } from '../api/currenParksHelper'

export const GET_ALL_PARKS = 'GET_ALL_PARKS'
export const GET_PARKER_HISTORY = 'GET_PARKER_HISTORY'
export const SET_ALL_PARKS = 'SET_ALL_PARKS'
export const GET_ACTIVE_PARKS = 'GET_ACTIVE_PARKS'

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

export function getActiveParks (parks) {
  getActiveParksApi()
    .then(res => {
      const active = res.body
      console.log('active', active)

      dispatch({
        type: GET_ACTIVE_PARKS,
        active
      })
      return null
    })
    .catch(err => console.error(err))
}

export function setParks (parks) {
  return {
    type: SET_ALL_PARKS,
    parks
  }
}
