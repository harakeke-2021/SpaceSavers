import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  return (
    <div className="px-32 py-20">
      <div>
        <h2 className="pt-32 pb-36 text-center text-blue-600 text-6xl p-5 font-black uppercase">Insert TAGLINE HERE</h2>
      </div>
      <AddressBar setSearchArea={setSearchArea}/>
      <MapContainer searchArea={searchArea} />
    </div>
  )
}

export default Home
