import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Header from './Header'

const App = () => {
  return (
    <div>
      <Route path='/' component={Header} />
      <Route exact path='/' component={Home} />
    </div>
  )
}

export default App
