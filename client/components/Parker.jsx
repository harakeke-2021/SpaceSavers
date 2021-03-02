import React from 'react'

import ParkerHistory from './ParkerHistory'
import CurrentParks from './CurrentParks'

function Parker (props) {
  return (
    <div className='xl:m-26'>
      <h2 className='pt-20 pb-10 text-center text-4xl font-bold uppercase font-roboto border-b-2 border-gray-200'>
         Parker Dashboard
        </h2>
      <CurrentParks />
      <ParkerHistory />
    </div>
  )
}

export default Parker
