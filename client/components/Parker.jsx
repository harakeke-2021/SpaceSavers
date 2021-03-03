import React from 'react'

import ParkerHistory from './ParkerHistory'
import CurrentParks from './CurrentParks'

function Parker (props) {
  return (
    <div className='lg:mx-20 xl:mx-26 2xl:mx-36'>
      <h2 className='pt-16 pb-5 text-center text-5xl font-black uppercase font-work border-b-2 border-gray-200 text-blue-600'>
         Parker Dashboard
      </h2>
      <CurrentParks />
      <ParkerHistory />
    </div>
  )
}

export default Parker
