import { dispatch } from '../store'
import { getUserHistoryApi } from '../api/userHelper'
import { getActiveParksApi } from '../api/currenParksHelper'

export const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION'
export const GET_USER_HISTORY = 'GET_USER_HISTORY'
export const GET_ACTIVE_PARKS = 'GET_ACTIVE_PARKS'

export function updateUserPosition (position, dispatch) {
  return dispatch({
    type: UPDATE_USER_POSITION,
    position
  })
}

export function getUserHistory () {
  getUserHistoryApi().then((result) => {
    const history = result.body
    dispatch({
      type: GET_USER_HISTORY,
      history
    })
    return null
  })
    .catch((error) => console.log(error.message))
}

export function getActiveParks (parks) {
  getActiveParksApi()
    .then(res => {
      const activeParks = res.body
      dispatch({
        type: GET_ACTIVE_PARKS,
        activeParks
      })
      return null
    })
    .catch(err => console.error(err))
}
