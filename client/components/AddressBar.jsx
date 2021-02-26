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
    <div>
      <label htmlFor='name'></label>
      <input
        type='text'
        onChange={handleChange}
        placeholder='Where do you want to park?'
      />
      <button onClick={handleClick}>Find Parking</button>
    </div>
  )
}

export default AddressBar
