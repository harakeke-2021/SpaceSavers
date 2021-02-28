export const UPDATE_USER_POSITION = 'UPDATE_USER_POSITION'

export function updateUserPosition (position, dispatch) {
  return dispatch({
    type: UPDATE_USER_POSITION,
    position
  })
}
