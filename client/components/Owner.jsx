import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'
import OwnerHistory from './OwnerHistory'

function Owner (props) {
  return (
    <div className="bg-gray-400 p-20">
      <Route exact path='/owner/' component={OwnerDashboard} />
      <Route exact path='/owner/history' component={OwnerHistory} />
    </div>
  )
}

export default Owner
