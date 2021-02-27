export const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION'
export const GET_USER_HISTORY = 'GET_USER_HISTORY'

export function updateUserPosition (position, dispatch) {
  return dispatch({
    type: UPDATE_USER_POSITION,
    position
  })
}
