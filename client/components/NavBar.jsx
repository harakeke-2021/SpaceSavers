import React from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <div>
      <Link to='/login'>Log in </Link>
      <Link to='/register'>Register </Link>
    </div>
  )
}

export default NavBar
