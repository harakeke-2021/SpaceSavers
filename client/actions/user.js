import { dispatch } from '../store'
import { getUserHistoryApi } from '../api/userHelper'

export const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION'
export const GET_USER_HISTORY = 'GET_USER_HISTORY'

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
