import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import OwnerNav from './OwnerNav'
import OwnerDashboard from './OwnerDashboard'
import OwnerParks from './OwnerParks'

function Owner(props) {
  return (
    <>
      <div className='owner'>
        <OwnerNav></OwnerNav>
        <Route exact path='/owner/parks' component={OwnerParks} />
        <Route exact path='/owner' component={OwnerDashboard} />
      </div>
    </>
  )
}

export default Owner
