import React from 'react'

import MapContainer from './MapContainer'
import NavBar from './NavBar'
import AddressBar from './AddressBar'

function Home () {
  return (
    <div>
      <NavBar />
      <AddressBar />
      <MapContainer />
    </div>
  )
}

export default Home
