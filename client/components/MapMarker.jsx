import React, { useState } from 'react'
import MarkerHover from './MarkerHover'

function MapMarker (props) {
  const K_SIZE = 40

  const style1 = {
    position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2
  }

  const style2 = {
    position: 'absolute',
    width: K_SIZE * 1.125,
    height: K_SIZE * 1.125,
    left: (-K_SIZE * 1.125) / 2,
    top: (-K_SIZE * 1.125) / 2
  }

  const [style, setStyle] = useState(style1)

  function mouseEnter (e) {
    setStyle(style2)
  }

  function mouseLeave (e) {
    setStyle(style1)
  }

  function onClick (e) {

  }

  return (
    <div>

      <div className='testing'>
        <img style={style} onClick={onClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} src='./images/pin.png' />
      </div>

    </div>
  )
}

export default MapMarker
