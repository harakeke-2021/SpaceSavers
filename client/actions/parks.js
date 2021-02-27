export const SET_ALL_PARKS = 'SET_ALL_PARKS'

export function setParks (parks) {
  return {
    type: SET_ALL_PARKS,
    parks
  }
}
