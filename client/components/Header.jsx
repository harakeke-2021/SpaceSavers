import React from 'react'

import NavBar from './NavBar'

function Header () {
  return (
    <header className="grid grid-cols-12 lg:px-16 px-6 bg-blue-600 lg:py-2">
      <div className="col-start-1 col-span-6">
        <h1 className=" text-white text-2xl p-5 font-black uppercase">Space Saver</h1>
      </div>
      <div className="col-span-2 col-start-10">
        <NavBar/>
      </div>

    </header>

  )
}

export default Header
