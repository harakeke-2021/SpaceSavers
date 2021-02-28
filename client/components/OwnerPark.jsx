import React from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
function OwnerPark (props) {
  const { name, address, price, occupied } = props.park

  const style = {
    height: '200px',
    width: '160px',
    backgroundColor: 'red',
    border: 'solid black 2px'
  }
  return (
    <>
      <IfAuthenticated>
        <div className='owner-park' style={style}>
          <div>{`name: ${name}`}</div>
          <div>{`address: ${address}`}</div>
          <div>{`price: ${price}`}</div>
          <div>{`occupied: ${occupied ? 'Yes' : 'No'}`}</div>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
      </IfNotAuthenticated>
    </>
  )
}

export default OwnerPark
