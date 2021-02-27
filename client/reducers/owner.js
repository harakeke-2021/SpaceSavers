import { GET_BALANCE, GET_PARKS_BY_OWNER_ID, ADD_PARK } from '../actions/owner'

const initialState = { id: null, name: '', balance: 0, parks: [] }

export default function owner (state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
    case GET_PARKS_BY_OWNER_ID:
      return {
        ...state,
        parks: action.parks
      }
    case ADD_PARK:
      state.parks.push(action.park)
      return {
        ...state
      }
    default:
      return state
  }
}
