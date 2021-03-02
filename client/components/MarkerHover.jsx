import React from 'react'
import { Link } from 'react-router-dom'

import { startParking } from '../api/markerHoverHelper'

function MarkerHover (props) {
  const { id, address, price, name } = props

  function onClick () {
    startParking(id)
  }

  return (
    <div className='relative right-24 top-7 w-44 h-auto text-center bg-white border rounded-lg border-blue-500 p-1'>
      <ul className='text-sm m-auto'>
        <li>
          <img src='./images/park.png' alt='carpark symbol' className='h-8 block mx-auto my-3'/>
        </li>
        <li className='capitalize'>{name}</li>
        <li className='capitalize'>{address}</li>
        <li className=''>{`$ ${price}`}/hr</li>
        
        <button onClick={onClick} className='w-3/4 hover:shadow-lg bg-blue-400 hover:bg-blue-500 block mx-auto mt-1 mb-2 rounded-lg text-white'>
          <Link to='/parker'>Start Parking</Link>
        </button>
      </ul>
    </div>
  )
}

export default MarkerHover
