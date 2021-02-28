import React, { useState, useEffect, useRef } from 'react'
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
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (toggle) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggle])

  const node = useRef()

  function handleClickOutside (e) {
    if (node.current && node.current.contains(e.target)) {
      return
    }
    setToggle(!toggle)
  }

  function mouseEnter (e) {
    setStyle(style2)
  }

  function mouseLeave (e) {
    setStyle(style1)
  }

  function onClick (e) {
    setToggle(!toggle)
  }

  return (
    <div>
      <div ref={node}>
        <img style={style} onClick={onClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} src='./images/pin.png' />
        {toggle === true ? <MarkerHover price={props.price} address={props.address}/> : null}
      </div>
    </div>
  )
}

export default MapMarker
