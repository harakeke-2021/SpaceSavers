import React from 'react'

import NavBar from './NavBar'

function Header () {
  return (
    <header className='grid md:grid-cols-12 bg-blue-600 py-3'>
      <div className='md:col-start-2 md:col-span-5'>
        <h1 className=' text-white text-3xl p-5 font-black uppercase'>Space Saver</h1>
      </div>
      <div className='col-span-3 col-start-9'>
        <NavBar/>
      </div>

    </header>

  )
}

export default Header
