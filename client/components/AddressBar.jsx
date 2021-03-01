import React, { useState } from 'react'

import { getAllParks } from '../actions/parks'

function AddressBar (props) {
  const { setSearchArea } = props
  const [address, setAddress] = useState('')

  function handleChange (e) {
    setAddress(e.target.value)
  }

  function handleClick () {
    setSearchArea(address)
    getAllParks()
  }

  return (
    <div className='grid grid-cols-12 p-10 h-90'>
      <div className='col-start-4 col-span-6 shadow-lg'>
        <div className='flex flex-row'>
          <input
            type='text'
            onChange={handleChange}
            placeholder='Search here'
            className='w-full border-transparent focus:border-blue-500 focus:bg-white focus:ring-0'
          />
          <button
            onClick={handleClick}
            className='w-44 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
        Find My Park
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressBar
