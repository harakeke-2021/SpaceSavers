export const SET_ALL_PARKS = 'SET_ALL_PARKS'
export const ADD_PARK = 'ADD_PARK'

export function setParks(parks) {
  return {
    type: SET_ALL_PARKS,
    parks
  }
}

export function addPark(park) {
  return {
    type: ADD_PARK,
    park
  }
}
