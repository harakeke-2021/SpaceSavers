import { GET_ALL_PARKS, SET_SEARCH_AREA } from '../actions/parks'

const initialState = { parks: [], searchArea: null }

export default function parks (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PARKS:
      return {
        ...state,
        parks: action.parks
      }
    case SET_SEARCH_AREA:
      return {
        ...state,
        searchArea: action.searchArea
      }
    default:
      return state
  }
}
