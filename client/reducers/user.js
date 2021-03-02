import { UPDATE_USER_POSITION, GET_USER_HISTORY, GET_ACTIVE_PARKS } from '../actions/user'

const initialState = { id: null, name: '', position: null, history: [], activeParks: [] }

export default function owner (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_POSITION:
      return {
        ...state,
        position: action.position
      }
    case GET_USER_HISTORY:
      return {
        ...state,
        history: action.history
      }
    case GET_ACTIVE_PARKS:
      return {
        ...state,
        activeParks: action.activeParks
      }
    default:
      return state
  }
}
