import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addPark } from '../actions/owner'
import { getGeoCode } from '../api/mapsHelper'

function NewParkForm (props) {
  const [form, setForm] = useState({})
  const [geoCode, setGeoCode] = useState({ lat: 0, lng: 0 })
  const { closeForm } = props

  function handleChange (e, field) {
    setForm({ ...form, [field]: e.target.value })
    console.log(form)
  }

  function handleSubmit (e) {
    e.preventDefault()
    const newForm = {
      ...form,
      ...geoCode
    }
    addPark(newForm, props.dispatch)
    setForm({})
    closeForm()
  }

  useEffect(() => {
    setForm({ ...form })
    getGeoCode({ address: form.address })
      .then((res) => {
        const { location } = res.body
        // console.log('location', location)
        setGeoCode({ lat: location.lat, lng: location.lng })
        // console.log('geocode', geoCode)
        return null
      })

      .catch((e) => {
        console.log(e.message)
      })
  }, [form.address])

  return (
    <div className='w-80 h-80 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-500 py-4 block m-auto'>
      <div className='px-3'>
        <button className='relative left-64 bottom-2' onClick={closeForm}>
          <img src='images/cancel.png' alt='cross symbol' className='w-3 h-3 m-2'/>
        </button>
        <form onSubmit={handleSubmit}>
          <label name='parkName'>Name</label>
          <input
            type='text'
            key='name'
            value={form?.name || ''}
            onChange={(e) => handleChange(e, 'name')}
            required
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
          />

          <label name='address'>Address</label>
          <input
            type='text'
            key='address'
            value={form?.address || ''}
            onChange={(e) => handleChange(e, 'address')}
            required
            className='w-full border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
          />

          <label name='price'>Price per hour</label>
          <input
            type='number'
            step='1'
            min='0'
            key='price'
            value={form?.price || 0}
            onChange={(e) => handleChange(e, 'price')}
            required
            className='w-full border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
          />
          <label name='lat'></label>
          <input
            type='hidden'
            value={geoCode.lat}
            key='lat'
          />

          <label name='lng'></label>
          <input
            type='hidden'
            value={geoCode.lng}
            key='lng'
          />

          <div>
            <button className='w-full hover:shadow-lg hover:bg-blue-500 block mx-auto my-2 p-1 rounded-lg hover:text-white'>
          Add Park
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(NewParkForm)
