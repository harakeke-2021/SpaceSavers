import { combineReducers } from 'redux'
import owner from './owner'

import parks from './parks'
import user from './user'

// export object of reducers
export default combineReducers({
  parks,
  owner,
  user
})
