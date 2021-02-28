import { UPDATE_USER_POSITION } from '../actions/user'

const initialState = { id: null, name: '', position: null }

export default function owner (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_POSITION:
      return {
        ...state,
        position: action.position
      }
    default:
      return state
  }
}
