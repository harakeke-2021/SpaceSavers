import React from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'

function Owner (props) {
  return (
    <div className='px-20 xl:mx-26 mb-26'>
      <Route exact path='/owner' component={OwnerDashboard} />
    </div>
  )
}

export default Owner
