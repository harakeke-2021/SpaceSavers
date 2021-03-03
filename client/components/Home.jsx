import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  const [userPosition, setUserPosition] = useState('')
  return (
    <div className='px-36 py-24 xl:mx-26'>
      <div className='border-b-2 border-gray-200 pb-10'>
        <h1 className='pt-5 text-center text-blue-600 text-9xl font-black uppercase font-work'>
          Space Saver
        </h1>
        <p className='text-center font-work uppercase text-lg'>
            Where my carpark is your carpark
        </p>
      </div>
      <AddressBar setSearchArea={setSearchArea} setUserPosition={setUserPosition}/>
      <MapContainer searchArea={searchArea} userPosition={userPosition} />
    </div>
  )
}

export default Home
