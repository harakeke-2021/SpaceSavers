import React from 'react'

import ParkerHistory from './ParkerHistory'
import CurrentParks from './CurrentParks'

function Parker (props) {
  return (
    <div className='xl:m-26'>
      <CurrentParks />
      <ParkerHistory />
    </div>
  )
}

export default Parker
