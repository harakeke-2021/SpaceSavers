import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  const [userPosition, setUserPosition] = useState('')
  return (
    <div className='px-36 py-24 xl:mx-26'>
      <div className=''>
        <h1 className='p-5 text-center text-blue-600 text-6xl font-bold uppercase font-roboto'>
          Insert TAGLINE HERE
        </h1>
        <p className='text-center'>
            Description of app
        </p>
      </div>
      <AddressBar setSearchArea={setSearchArea} setUserPosition={setUserPosition}/>
      <MapContainer searchArea={searchArea} userPosition={userPosition} />
    </div>
  )
}

export default Home
