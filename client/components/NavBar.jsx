import React from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <div className="grid grid-cols-2 text-center text-white">
      {/* <h4 className="grid-start-1 p-4 py-3 px-0 border-b-2 border-transparent gap-x-3 hover:border-white"> */}
      <Link to='/login' className="grid-start-1 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">
        Log in
      </Link>
      {/* <h4 className="bg-blue-100 object-center grid-start-2 m-2 border-b-2  border-transparent gap-x-3 hover:border-white"> */}
      <Link to='/register' className="grid-start-2 border-b-2 border-transparent hover:border-white p-2 mt-3 mb-2">
        Register
      </Link>
    </div>
  )
}

export default NavBar
