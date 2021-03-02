import { getAllParksApi, getGeoCode } from '../api/mapsHelper'
import { dispatch } from '../store'

export const GET_ALL_PARKS = 'GET_ALL_PARKS'
// export const SET_ALL_PARKS = 'SET_ALL_PARKS'
export const SET_SEARCH_AREA = 'SET_SEARCH_AREA'

export function getAllParks () {
  getAllParksApi()
    .then(res => {
      const { parks } = res.body
      dispatch({
        type: GET_ALL_PARKS,
        parks
      })
      return null
    })
    .catch(err => console.error(err))
}

export function setSearchAreaByLatlng (latlng) {
  dispatch({
    type: SET_SEARCH_AREA,
    searchArea: latlng
  })
  return null
}

export function setSearchAreaByAddress (address) {
  getGeoCode({ address })
    .then((res) => {
      const { location } = res.body
      const latlng = { lat: location.lat, lng: location.lng }
      dispatch({
        type: SET_SEARCH_AREA,
        searchArea: latlng
      })
      return null
    })
    .catch(err => console.error(err))
}

// export function setParks (parks) {
//   return {
//     type: SET_ALL_PARKS,
//     parks
//   }
// }
