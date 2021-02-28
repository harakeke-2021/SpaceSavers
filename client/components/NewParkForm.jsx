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
  }

  return (
    <div className='new-park-form'>
      <button onClick={closeForm}>
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
          onChange={(e) => handleChange(e, 'name')}></input>
        <label name='address'>Address</label>
        <input
          type='text'
          key='address'
          value={form?.address || ''}
          onChange={(e) => handleChange(e, 'address')}></input>
        <label name='price'>Price per hour</label>
        <input
          type='number'
          step='2'
          key='price'
          value={form?.price || 0}
          onChange={(e) => handleChange(e, 'price')}></input>
        <button>Add Park</button>
      </form>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(NewParkForm)
