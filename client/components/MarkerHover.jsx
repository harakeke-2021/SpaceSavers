import React from 'react'

function MarkerHover () {
  const style = {
    position: 'abolute',
    left: '-1000px',
    top: '-1000000px',
    border: '1.5px solid black',
    borderRadius: '7.5px',
    width: '175px',
    height: '185px',
    backgroundColor: 'white',
    textAlign: 'center',
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
  }

  return (
    <div style={style}>
      <h1>This is a test render</h1>
    </div>
  )
}

export default MarkerHover
