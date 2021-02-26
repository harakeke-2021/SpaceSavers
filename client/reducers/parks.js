import { SET_ALL_PARKS } from '../actions/parks'

export default function parks (state = [], action) {
  switch (action.type) {
    case SET_ALL_PARKS:
      return action.parks
    default:
      return state
  }
}
