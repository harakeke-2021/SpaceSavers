import React, { useState, useEffect, useRef } from 'react'
import MarkerHover from './MarkerHover'

function MapMarker (props) {
  const K_SIZE = 40

  const style1 = {
    // position: 'absolute',
    width: K_SIZE,
    height: K_SIZE,
    left: -K_SIZE / 2,
    top: -K_SIZE / 2
  }

  const style2 = {
    // position: 'absolute',
    width: K_SIZE * 1.125,
    height: K_SIZE * 1.125,
    left: (-K_SIZE * 1.125) / 2,
    top: (-K_SIZE * 1.125) / 2
  }

  const [style, setStyle] = useState(style1)
  // const [toggle, setToggle] = useState(false)

  // useEffect(() => {
  //   if (toggle) {
  //     document.addEventListener('click', handleClickOutside)
  //   } else {
  //     document.removeEventListener('click', handleClickOutside)
  //   }
  // }, [toggle])

  const node = useRef()

  // function handleClickOutside (e) {
  //   if (node.current && node.current.contains(e.target)) {
  //     return
  //   }
  //   setToggle(!toggle)
  // }

  function mouseEnter (e) {
    setStyle(style2)
  }

  function mouseLeave (e) {
    setStyle(style1)
  }

  // function onClick (e) {
  //   setToggle(!toggle)
  //   props.toggleSelected()
  // }

  const { price, address, name, id } = props.obj

  return (
    <div>
      <div ref={node}>
        <img
          style={style}
          className='absolute'
          onClick={props.toggleSelected}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          src='./images/pin.png'
        />

        {props.selectedMarker === id
          ? <MarkerHover
            price={price}
            address={address}
            name={name}
            id={id}/>
          : null
        }

      </div>
    </div>
  )
}

export default MapMarker
