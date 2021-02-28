import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  return (
    <div className="px-32 py-20">
      <div className="pt-32 pb-36">
        <h1 className="p-5 text-center text-blue-600 text-6xl font-black uppercase">
          Insert TAGLINE HERE
        </h1>
        <p className="text-center">
            Description of app
        </p>
      </div>
      <AddressBar setSearchArea={setSearchArea}/>
      <MapContainer searchArea={searchArea} />
    </div>
  )
}

export default Home
