import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addPark } from '../actions/owner'
import { getGeoCode } from '../api/mapsHelper'
import { addParkApi } from '../api/ownerHelper'

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
    addParkApi(newForm)
      .then(closeForm())
      .catch(err => { throw Error(err.message) })
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

    <div className="w-72 h-72 m-10 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-400 py-4"
    // "w-72 h-72 m-10 border-4 rounded-md border-black"
    >
      <div className="p-5">
        <button className="" onClick={closeForm}>
          <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
          </svg>
        </button>
        <form onSubmit={handleSubmit}>
          <label name='parkName'>Name</label>
          <input
            type='text'
            key='name'
            value={form?.name || ''}
            onChange={(e) => handleChange(e, 'name')}
            // placeholder='Name'
            className="w-full bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />

          <label name='address'>Address</label>
          <input
            type='text'
            key='address'
            value={form?.address || ''}
            onChange={(e) => handleChange(e, 'address')}
            // placeholder="Address"
            className="w-full bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />

          <label name='price'>Price per hour</label>
          <input
            type='number'
            step='1'
            min='0'
            key='price'
            value={form?.price || 0}
            onChange={(e) => handleChange(e, 'price')}
            // placeholder="Price per hour"
            className="w-full bg-gray-100 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0"
          />
          <label name='lat'></label>
          <input
            type="hidden"
            value={geoCode.lat}
            key="lat"
          />

          <label name='lng'></label>
          <input
            type="hidden"
            value={geoCode.lng}
            key="lng"
          />

          <div>
            <button className="w-full">
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
