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
    <>
      {/* <div className='grid grid-cols-12 py-10 h-90 mx-auto'>
        <div className='col-start-2 col-span-8 shadow-lg'>
          <form onSubmit={handleSubmit} className='flex flex-row col-span-6'>
            <input
              type='text'
              onChange={handleChange}
              placeholder='Search here'
              className='w-full h-full border-transparent focus:border-blue-500 focus:bg-white focus:ring-0'
            />
            <button
              className='h-full w-52 py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Find My Park
            </button>
          </form>
        </div>
        <div className='w-full col-start-10 col-span-2 shadow-lg'>
          <button
            onClick={handleUseLocation}
            className='w-full py-2 px-4 border shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Use My Location
          </button>
        </div>
        {showGeoWarning ? <GeolocationWarning/> : null }
      </div> */}

      <div className=''>
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

    </>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks })

export default connect(mapStateToProps)(AddressBar)
