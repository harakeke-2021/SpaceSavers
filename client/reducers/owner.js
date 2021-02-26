import { GET_BALANCE } from '../actions/owner'

const initialState = { id: null, name: '', balance: 0, parks: [] }

export default function owner(state = initialState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
    default:
      return state
  }
}
