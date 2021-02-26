import React from 'react'

import NavBar from './NavBar'

function Header () {
  return (
    <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <h1 className="text-blue-500 text-8xl p-5 font-black uppercase">Space Saver</h1>
      </div>
      <div className=" md:flex md:items-center md:w-auto w-full" id="menu">
        <NavBar/>
      </div>

    </header>

  )
}

export default Header
