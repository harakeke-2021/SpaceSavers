import React from 'react'

import ParkerHistory from './ParkerHistory'
import CurrentParks from './CurrentParks'

function Parker (props) {
  return <div>
    <CurrentParks />
    <ParkerHistory />
  </div>
}

export default Parker
