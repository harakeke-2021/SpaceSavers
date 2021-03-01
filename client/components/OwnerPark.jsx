import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
function OwnerPark (props) {
  const { name, address, price, occupied } = props.park

  return (
    <>
      <IfAuthenticated>
        <ul className='text-center object-center grid-span-3 w-72 h-72 hover:bg-blue-500 hover:border-transparent hover:shadow-lg rounded-lg px-4 pt-10 border border-blue-500 block mx-auto hover:text-white'>
          <li>
            <img src='./images/park.png' alt='carpark symbol' className='h-14 block mx-auto my-2'/>
          </li>
          <li className='text-l capitalize'>{name}</li>
          <li className='text-2xl capitalize'>{address}</li>
          <li className='text-l'>{`$ ${price}`} /hr</li>
          { occupied
            ? <li className='text-l py-1'>Status: Occupied</li>
            : <li className='text-l py-1'>Status: Unoccupied</li>
          // <li className='text-l py-1'>Status: {`${occupied ? 'Occupied' : 'Unoccupied'}`}</li>
          }
        </ul>
      </IfAuthenticated>
      <IfNotAuthenticated>
      </IfNotAuthenticated>
    </>
  )
}

export default OwnerPark
