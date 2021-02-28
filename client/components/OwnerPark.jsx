import React from 'react'

function OwnerPark (props) {
  const { name, address, price, occupied } = props.park

  return (
    <ul className="text-center object-center grid-span-3 w-72 h-72 m-10 hover:bg-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-blue-400"
    // "w-72 h-72 m-20 border-4 rounded-md border-black capitalize"
    >
      <li>
        <img src="./images/park.png" alt="carpark symbol" className="h-12"/>
      </li>
      <li className="text-xl">{name}</li>
      <li className="">{address}</li>
      <li className="">{`$ ${price}`}</li>
      <li className="">{`${occupied ? 'Occupied' : 'Unoccupied'}`}</li>
    </ul>
  )
}

export default OwnerPark
