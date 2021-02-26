import React, { useState } from 'react'

function NewParkForm(props) {
  const [form, setForm] = useState({})
  const { closeForm } = props

  function handleChange(e, field) {
    setForm({ ...form, [field]: e.target.value })
    console.log(form)
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('submitting', form)
  }

  return (
    <>
      <button onClick={closeForm}>close</button>
      <form onSubmit={handleSubmit}>
        <label name='parkName'></label>
        <input
          type='text'
          key='name'
          value={form?.name || ''}
          onChange={(e) => handleChange(e, 'name')}></input>
        <label name='address'></label>
        <input
          type='text'
          key='address'
          value={form?.address || ''}
          onChange={(e) => handleChange(e, 'address')}></input>
        <label name='price'></label>
        <input
          type='number'
          step='2'
          key='price'
          value={form?.price || 0}
          onChange={(e) => handleChange(e, 'price')}></input>
        <button>Submit</button>
      </form>
    </>
  )
}

export default NewParkForm
