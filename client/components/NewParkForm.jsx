import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPark } from '../actions/owner'

function NewParkForm (props) {
  const [form, setForm] = useState({})
  const { closeForm } = props

  function handleChange (e, field) {
    setForm({ ...form, [field]: e.target.value })
    console.log(form)
  }

  function handleSubmit (e) {
    e.preventDefault()
    addPark(form, props.dispatch)
    setForm({})
    closeForm()
  }

  return (
    <div className=' w-72 h-72 m-10 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-500 py-4 block m-auto'>
      <div className='px-3'>
        <button className='' onClick={closeForm}>
          <img src='images/cancel.png' alt='cross symbol' className="w-3 h-3 object-right"/>
          {/* <svg className='h-6 w-6 text-black' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6'/>
          </svg> */}
        </button>
        <form onSubmit={handleSubmit}>
          <label name='parkName'>Name</label>
          <input
            type='text'
            key='name'
            value={form?.name || ''}
            onChange={(e) => handleChange(e, 'name')}
            // placeholder='Name'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
          />

          <label name='address'>Address</label>
          <input
            type='text'
            key='address'
            value={form?.address || ''}
            onChange={(e) => handleChange(e, 'address')}
            // placeholder='Address'
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
            // placeholder='Price per hour'
            className='w-full border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
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
