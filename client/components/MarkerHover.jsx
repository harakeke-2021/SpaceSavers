import React from 'react'

function MarkerHover(props) {
  const { offset } = props
  const style = {
    height: '25px',
    width: '25px',
    position: 'relative',
    backgroundColor: 'blue',
    left: 20,
    top: -20
  }
  return <div clasName='markerrrr' style={style}></div>
}

export default MarkerHover
