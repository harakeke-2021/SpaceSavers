import React from 'react'

import NavBar from './NavBar'

function Header () {
  return (
    <header className="grid grid-cols-12 bg-blue-600 lg:py-3">
      <div className="col-start-2 col-span-6">
        <h1 className=" text-white text-3xl p-5 font-black uppercase">Space Saver</h1>
      </div>
      <div className="col-span-2 col-start-10">
        <NavBar/>
      </div>

    </header>

  )
}

export default Header
