import React from 'react'

function OwnerPark(props) {
  const { name, address, price, occupied } = props.park

  const style = {
    height: '200px',
    width: '160px',
    backgroundColor: 'red',
    border: 'solid black 2px'
  }
  return (
    <div className='owner-park' style={style}>
      <div>{`name: ${name}`}</div>
      <div>{`address: ${address}`}</div>
      <div>{`price: ${price}`}</div>
      <div>{`occupied: ${occupied ? 'Yes' : 'No'}`}</div>
    </div>
  )
}

export default OwnerPark
