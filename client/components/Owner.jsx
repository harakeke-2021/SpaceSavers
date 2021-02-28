import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'

function Owner (props) {
  return (
    <div className="bg-gray-400 p-20">
      <Route exact path='/owner/' component={OwnerDashboard} />
    </div>
  )
}

export default Owner
