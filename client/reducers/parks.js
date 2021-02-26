import { SET_ALL_PARKS, ADD_PARK } from '../actions/parks'

export default function parks(state = [], action) {
  switch (action.type) {
    case SET_ALL_PARKS:
      return action.parks
    case ADD_PARK:
      return state.parks.push(action.park)
    default:
      return state
  }
}
