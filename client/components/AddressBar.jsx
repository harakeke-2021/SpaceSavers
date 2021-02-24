import React, { useState } from 'react'

function AddressBar () {
  const [address, setAddress] = useState('')

  function onChange () {

  }

  return (
    <div>
      <label htmlFor='name'>Address</label>
      <input type='text' />
      <button>Find Parking</button>
    </div>
  )
}

export default AddressBar
