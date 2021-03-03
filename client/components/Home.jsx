import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  const [userPosition, setUserPosition] = useState('')
  return (
    <div className='px-36 lg:mx-10 xl:mx-24 2xl:mx-36 pb-20'>
      <div className='border-b-2 border-gray-200 pb-10 mt-20'>
        <h1 className='pt-5 pb-2 text-center text-blue-600 text-9xl font-black uppercase font-work'>
          Space Saver
        </h1>
        <p className='text-center font-work uppercase text-xl'>
            Where my carpark is your carpark
        </p>
      </div>
      <div className='max-w-screen-xl min-w-screen-lg mx-auto'>
        <AddressBar setSearchArea={setSearchArea} setUserPosition={setUserPosition}/>
        <MapContainer searchArea={searchArea} userPosition={userPosition} />
      </div>
    </div>
  )
}

export default Home
