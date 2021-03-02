import React from 'react'

function GeolocationWarning () {
  const message = 'Please enable Geolocation'
  return <button className='text-red-500 relative w-40 left-10 text-center text-xs'>{message}</button>
}

export default GeolocationWarning
