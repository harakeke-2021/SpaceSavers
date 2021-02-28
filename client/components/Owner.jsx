import React, { useState } from 'react'
import { Route } from 'react-router-dom'

import OwnerDashboard from './OwnerDashboard'

function Owner (props) {
  return (
    <div className="bg-gray-400 px-32 py-20">
      <div className="bg-gray-200">
        <h2 className="text-blue-600 text-4xl uppercase text-center">
          Owner Dashboard
        </h2>
        <div>
          <Route exact path='/owner/:id' component={OwnerDashboard} />
        </div>
      </div>
    </div>
  )
}

export default Owner
