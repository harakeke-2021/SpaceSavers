import React, { useState } from 'react'

import getAllParking from '../API/addressBarHelper'

function AddressBar (props) {
  const { setSearchArea } = props
  const [address, setAddress] = useState('')

  function handleChange (e) {
    setAddress(e.target.value)
  }

  function handleClick () {
    setSearchArea(address)
    getAllParking()
  }

  return (
    <div className="bg-gray-300 p-10 flex flex-row items-center justify-center h-90">
      <div className="w-1/4">
        <input
          type='text'
          onChange={handleChange}
          placeholder='Search here'
          className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 border-transparent"
        />
        <button
          onClick={handleClick}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        Find My Park
        </button>
      </div>
    </div>
  )
}

export default AddressBar
