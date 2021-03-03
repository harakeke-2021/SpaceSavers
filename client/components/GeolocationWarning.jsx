import React from 'react'

function GeolocationWarning () {
  const message = 'Please enable Geolocation'
  return <div className='pt-2 text-red-500 w-56  text-center capitalize'>{message}</div>
}

export default GeolocationWarning
