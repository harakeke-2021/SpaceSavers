import React from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'

function Owner (props) {
  return (
    <div className='lg:mx-20 xl:mx-26 2xl:mx-36'>
      <Route exact path='/owner' component={OwnerDashboard} />
    </div>
  )
}

export default Owner
