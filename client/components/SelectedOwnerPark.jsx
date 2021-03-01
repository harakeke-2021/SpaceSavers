import React, { useState } from 'react'

import { updateParkApi, deleteParkApi } from '../api/ownerHelper'

export default function SelectedOwnerPark (props) {
  const { currentName, currentPrice, closeAddForm } = props
  const [editing, setEditing] = useState({
    name: currentName,
    price: currentPrice
  })

  function handleEditChange (e) {
    const { name, value } = e.target
    console.log('name', name)
    console.log('target', value)
    setEditing({
      ...editing,
      [name]: value
    })
  }

  function handleUpdate () {
    updateParkApi(editing)
      .then(closeAddForm)
      .catch(err => console.log(err.message))
  }

  function handleDelete () {
    deleteParkApi(editing.id)
      .then(closeAddForm)
      .catch(err => console.log(err.message))
  }

  return (
    <>
      <h2>Selected</h2>
      <form>
        <label>Name:</label>
        <input type='text'
          key='name'

          value={editing.name || ''}
          onChange={handleEditChange} />

        <label>Price per hour:</label>
        <input type='number'
          step='1'
          min='0'
          key='price'

          value={editing.price || ''}
          onChange={handleEditChange} />

        <button type='button'
          data-testid='update-button'
          onClick={handleUpdate}>Update Park</button>
        <button type='button'
          data-testid='delete-button'
          onClick={handleDelete}>Delete Park</button>
        <button type='button'
          data-testid='clear-button'
          onClick={closeAddForm}>Close Form</button>
      </form>
    </>
  )
}
