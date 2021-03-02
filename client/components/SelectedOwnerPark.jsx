import React, { useState } from 'react'

import { updateParkApi, deleteParkApi } from '../api/ownerHelper'

export default function SelectedOwnerPark (props) {
  const { closeAddForm, id, render, setRender } = props
  const [editing, setEditing] = useState({
    id,
    name: '',
    price: 0
  })

  function handleEditChange (e) {
    const { name, value } = e.target

    setEditing({
      ...editing,
      [name]: value
    })
  }

  function handleUpdate () {
    console.log('inside handleUpdate', editing)
    updateParkApi(editing)
      .then(closeAddForm)
      .then(setRender(render + 1))
      .catch(err => console.log(err.message))
  }

  function handleDelete () {
    deleteParkApi(editing.id)
      .then(closeAddForm)
      .catch(err => console.log(err.message))
  }

  return (
    <>

      <form>
        {/* <label htmlFor='id'></label>
        <input name='id' type='hidden' value={id}/> */}

        <label htmlFor='name'>Name:</label>
        <input type='text'
          key='name'
          name='name'
          onChange={handleEditChange} />

        <label htmlFor='price'>Price per hour:</label>
        <input type='number'
          step='1'
          min='0'
          key='price'
          name='price'
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
