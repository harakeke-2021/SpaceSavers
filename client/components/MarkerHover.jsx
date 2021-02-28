import React from 'react'

function MarkerHover (props) {
  const style = {
    position: 'relative',
    left: '-87.5px',
    top: '30px',
    border: '1.5px solid black',
    borderRadius: '7.5px',
    width: '175px',
    height: '185px',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
  }

  function onClick () {
    
  }

  return (
    <div style={style}>
      <h1>{props.name}</h1>
      <p>The price of this parking is {props.price}</p>
      <p>Address: {props.address}</p>
      <div>
        <button onClick={onClick} >Book Parking</button>
      </div>
    </div>
  )
}

export default MarkerHover
