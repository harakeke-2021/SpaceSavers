import { isAuthenticated, getDecodedToken } from './components'

const emptyUser = {
  id: null,
  username: '',
  isAdmin: false,
  gardenId: null
}

export function getUser () {
  if (isAuthenticated()) {
    const { username, isAdmin, gardenId, id } = getDecodedToken()
    return {
      username,
      isAdmin,
      gardenId,
      id
    }
  }
  return emptyUser
}
