import React from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <nav>
      <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
        <li className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
          <Link to='/login'>Log in </Link>
        </li>
        <li className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
          <Link to='/register'>Register </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
