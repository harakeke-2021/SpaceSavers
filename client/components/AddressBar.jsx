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
    <div className="grid grid-cols-12 p-10 h-90">
      <div className="col-start-5 col-span-4">
        <div className="flex flex-row">
          <input
            type='text'
            onChange={handleChange}
            placeholder='Search here'
            className="w-full bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />
          <button
            onClick={handleClick}
            className="w-44 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
        Find My Park
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddressBar
