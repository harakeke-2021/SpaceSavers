import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  // console.log(searchArea)
  return (
    <div className="p-5 bg-gray-200">
      <AddressBar setSearchArea={setSearchArea}/>
      <MapContainer searchArea={searchArea} />
    </div>
  )
}

export default Home
