import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function NavBar () {
  return (
    <div>
      <Link to='/'>Home</Link>
      <IfAuthenticated>
        <Link to='#' onClick={logOff}>Log Off</Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to='/register'>Register </Link>
        <Link to='/signin'>Sign In</Link>
      </IfNotAuthenticated>
    </div>
  )
}

export default NavBar
