import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function NavBar () {
  return (
    <div className='grid grid-cols-4 text-center text-white'>
      <Link to='/' className='col-start-1 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>
        Home
      </Link>
      <IfAuthenticated>
        <Link to={'/parker'} className='col-start-2 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>
        My Parking
        </Link>
        <Link to={'/owner'} className='col-start-3 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>
        My Parks
        </Link>
        <Link to='#' onClick={logOff} className='col-start-4 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>
          Log Off
        </Link>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Link to='/signin' className='col-start-2 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>Sign In</Link>
        <Link to='/register' className='col-start-3 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2'>Register </Link>
      </IfNotAuthenticated>
    </div>
  )
}

export default NavBar
