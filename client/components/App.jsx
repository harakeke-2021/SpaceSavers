import React from 'react'
import { Route } from 'react-router-dom'
import MapContainer from './MapContainer'
import Home from './Home'

const App = () => {
  return (
    <div>
      <MapContainer />
      <Route path='/' component={Home} />
    </div>
  )
}

export default App
