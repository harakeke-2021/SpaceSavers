import { combineReducers } from 'redux'
import owner from './owner'

import parks from './parks'

// export object of reducers
export default combineReducers({
  parks,
  owner
})
