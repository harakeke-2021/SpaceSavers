import React, { useState } from 'react'
import { connect } from 'react-redux'
import GeolocationWarning from './GeolocationWarning'

import { setSearchAreaByAddress, setSearchAreaByLatlng } from '../actions/parks'

function AddressBar (props) {
  const [address, setAddress] = useState('')
  const [showGeoWarning, setShowGeoWarning] = useState(false)

  function handleChange (e) {
    setAddress(e.target.value)
  }

  function handleSubmit () {
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
      (err) => {
        setShowGeoWarning(true)
        console.log('Error:', err.message)
      }
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-wrap flex-auto my-10 gap-5 mx-auto md:px-10 lg:px-20 2xl:px-32'>
        <input
          type='text'
          onChange={handleChange}
          placeholder='Search here'
          className='border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 shadow-sm rounded-lg w-72 flex-1'
        />
        <button
          className=' py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
              Find My Park
        </button>
        <button
          onClick={handleUseLocation}
          className=' py-2 px-4 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Use My Location
        </button>
        {showGeoWarning ? <GeolocationWarning/> : null }
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks })

export default connect(mapStateToProps)(AddressBar)
