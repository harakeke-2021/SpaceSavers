import React, { useState } from 'react'

import MapContainer from './MapContainer'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  console.log(searchArea)
  return (
    <div>
      <AddressBar setSearchArea={setSearchArea}/>
      <MapContainer searchArea={searchArea} />
    </div>
  )
}

export default Home
