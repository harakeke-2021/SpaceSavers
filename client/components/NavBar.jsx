import React from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <ul className="grid grid-cols-2 text-base text-center text-white pt-4 lg:pt-0">
      <li className="grid-start-1 p-4 border-b-2 border-transparent gap-x-3 hover:border-white">
        <Link to='/login'>Log in </Link>
      </li>
      <li className="grid-start-2 lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-blue-400">
        <Link to='/register'>Register </Link>
      </li>
    </ul>
  )
}

export default NavBar
