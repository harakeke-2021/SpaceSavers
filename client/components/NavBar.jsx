import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import OwnerNav from './OwnerNav'

function NavBar () {
  return (
    <div className="grid grid-cols-3 text-center text-white">
      <Link to='/' className="grid-start-1 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">Home</Link>
      <IfAuthenticated>
        <OwnerNav/> 
        {/* move owner nav in here */}
        <Link to='#' onClick={logOff} className="grid-start-2 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">Log Off</Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to='/signin' className="grid-start-2 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">Sign In</Link>
        <Link to='/register' className="grid-start-3 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">Register </Link>
      </IfNotAuthenticated>
    </div>
  )
}

export default NavBar
