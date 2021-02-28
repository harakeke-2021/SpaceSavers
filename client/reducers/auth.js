import { getUser } from '../auth-utils'
import { SET_USER, CLEAR_USER } from '../actions/user'

const emptyUser = {
  id: null,
  username: '',
  name: '',
  email: ''
}

export default function user (state = getUser(), action) {
  switch (action.type) {
    case SET_USER:
      return getUser()

    case CLEAR_USER:
      return emptyUser

    default:
      return state
  }
}
