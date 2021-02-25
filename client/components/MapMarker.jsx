import React, { useState } from 'react'

function MapMarker(props) {
  // console.log(props)
  const K_SIZE = 40
  const hover = props.$hover
  if (hover) {
    console.log('hovering!')
  }
  const style = {
    position: 'absolute',
    borderRadius: '50%',
    backgroundColor: 'black',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2,
    textAlign: 'center'
  }
  const style2 = {
    ...style,
    width: K_SIZE * 1.5,
    height: K_SIZE * 1.5,
    left: (-K_SIZE * 1.5) / 2,
    top: (-K_SIZE * 1.5) / 2,
    backgroundColor: 'yellow'
  }

  return (
    <div
      // className={hover ? 'marker marker-hover' : 'marker'}
      style={hover ? style2 : style}
      onClick={(e) => {
        e.preventDefault()
        console.log('hovering!!!')
      }}></div>
  )
}

export default MapMarker
