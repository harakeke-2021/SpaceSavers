import React from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'
import OwnerHistory from './OwnerHistory'

function Owner (props) {
  return (
    <div className='px-20 xl:mx-26'>
      <Route exact path='/owner/' component={OwnerDashboard} />
      <Route exact path='/owner/history' component={OwnerHistory} />
    </div>
  )
}

export default Owner
