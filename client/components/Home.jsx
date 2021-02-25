import React, { useState } from 'react'

import MapContainer from './MapContainer'
import NavBar from './NavBar'
import AddressBar from './AddressBar'

function Home () {
  const [searchArea, setSearchArea] = useState('')
  // console.log(searchArea)
  return (
    <div>
      <NavBar />
      <AddressBar setSearchArea={setSearchArea}/>
      <MapContainer searchArea={searchArea} />
    </div>
  )
}

export default Home
