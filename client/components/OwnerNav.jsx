import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function OwnerNav() {
  return (
    <div className='owner-nav'>
      <Link to='/owner' className='owner-nav button'>
        Dashboard
      </Link>
      <Link to='/owner/parks' className='owner-nav button'>
        Parks
      </Link>
    </div>
  )
}

export default OwnerNav
