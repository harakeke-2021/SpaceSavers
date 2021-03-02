import React from 'react'

import { startParking } from '../api/markerHoverHelper'

function MarkerHover (props) {
  const { id, address, price, name } = props

  // const style = {
  //   position: 'relative',
  //   left: '-87.5px',
  //   top: '30px',
  //   border: '1.5px solid black',
  //   borderRadius: '7.5px',
  //   width: '175px',
  //   height: '185px',
  //   backgroundColor: '#FFFFFF',
  //   textAlign: 'center',
  //   boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
  // }

  function onClick () {
    startParking(id)
  }

  return (
    <div className="relative right-20 top-7 w-44 h-auto text-center bg-white border rounded-lg border-blue-500 p-1">
      <ul className='text-sm m-auto'>
        <li>
          <img src='./images/park.png' alt='carpark symbol' className='h-8 block mx-auto my-3'/>
        </li>
        <li className='capitalize'>{name}</li>
        <li className='capitalize'>{address}</li>
        <li className=''>{`$ ${price}`}/hr</li>

        <button onClick={onClick} className='w-3/4 hover:shadow-lg hover:bg-blue-500 block mx-auto mt-1 mb-2 rounded-lg hover:text-white'>
          Start Parking
        </button>
      </ul>
    </div>
  )
}

export default MarkerHover
