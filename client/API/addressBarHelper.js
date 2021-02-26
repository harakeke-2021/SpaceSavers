import { dispatch } from '../store'
import { setParks } from '../actions/parks'
import requestor from '../consume'

export default function getAllParking (consume = requestor) {
  return consume('/parker')
    .then(res => {
      const { parks } = res.body
      dispatch(setParks(parks))
      return null
    })
    .catch(err => console.error(err))
}
