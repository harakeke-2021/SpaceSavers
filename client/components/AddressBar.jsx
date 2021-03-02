import React, { useState } from 'react'
import { connect } from 'react-redux'

import { getAllParks, setSearchAreaByAddress, setSearchAreaByLatlng } from '../actions/parks'

function AddressBar (props) {
  // const { setSearchArea, setUserPosition } = props
  const [address, setAddress] = useState('')
  const { searchArea } = props.parks

  function handleChange (e) {
    setAddress(e.target.value)
  }

  function handleClick () {
    setSearchAreaByAddress(address)
  }

  function handleUseLocation () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newUserPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setSearchAreaByLatlng(newUserPosition)
      },
      (err) => console.log('Error:', err.message)
    )
  }

  return (
    <div className='grid grid-cols-12 py-10 h-90'>
      <div className='col-start-3 col-span-8 shadow-lg'>
        <div className='flex flex-row'>
          <input
            type='text'
            onChange={handleChange}
            placeholder='Search here'
            className='w-full border-transparent focus:border-blue-500 focus:bg-white focus:ring-0'
          />
          <button
            onClick={handleClick}
            className='w-44 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
        Find My Park
          </button>
          <button
            onClick={handleUseLocation}
            className='w-52 py-2 px-4 border shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>

        Use My Location
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks })

export default connect(mapStateToProps)(AddressBar)
