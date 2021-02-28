import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'

function OwnerNav (props) {
  // const { username } = props.owner

  return (
    <IfAuthenticated>
      <div className='owner-nav'>
        <Link to={'/owner'} className='owner-nav button'>
        Dashboard
        </Link>
        <Link to={'/owner/parks'} className='owner-nav button'>
        Parks
        </Link>
        <Link to='/owner/history' className='owner-nav button'>
        History
        </Link>
      </div>
    </IfAuthenticated>
  )
}

export default OwnerNav
