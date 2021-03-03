import React from 'react'

function GeolocationWarning () {
  const message = 'Please enable Geolocation'
  return <div className='text-red-500 relative w-40 left-10 text-center text-xs'>{message}</div>
}

export default GeolocationWarning
