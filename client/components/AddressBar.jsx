import React, { useState } from 'react'

function AddressBar () {
  const [address, setAddress] = useState('')

  function onChange () {

  }

  return (
    <div>
      <label htmlFor='name'></label>
      <input type='text' placeholder='Where do you want to park?'/>
      <button>Find Parking</button>
    </div>
  )
}

export default AddressBar
