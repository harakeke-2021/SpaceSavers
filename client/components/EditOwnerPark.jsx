import React, { useState } from 'react'

import { updateParkApi, deleteParkApi } from '../api/ownerHelper'

export default function EditOwnerPark (props) {
  const { closeEditForm, id, render, setRender, parkName, price } = props
  const [editing, setEditing] = useState({
    id,
    name: parkName,
    price: price
  })
  console.log('park name', parkName)

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
      .then(closeEditForm)
      .then(setRender(render + 1))
      .catch(err => console.log(err.message))
  }

  function handleDelete () {
    console.log(editing.id)
    deleteParkApi(editing.id)
      .then(closeEditForm)
      .then(setRender(render + 1))
      .catch(err => console.log(err.message))
  }

  return (
    <div className='w-80 h-80 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-500 py-4 block m-auto'>
      <div className='px-3'>
        <button className='relative left-64 bottom-2' onClick={closeEditForm}>
          <img src='images/cancel.png' alt='cross symbol' className='w-3 h-3 m-2'/>
        </button>
        <div className='divide-y divide-gray-200'>
          <form>
            <label name='name'>Name</label>
            <input type='text'
              key='name'
              name='name'
              placeholder={parkName}
              onChange={handleEditChange}
              className='w-full border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
            />

            <label name='price'>Price per hour</label>
            <input
              type='number'
              step='1'
              min='0'
              key='price'
              name='price'
              placeHolder={price}
              onChange={handleEditChange}
              className='w-full border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
            />
            <button type='button'
              data-testid='update-button'
              onClick={handleUpdate}
              className='w-full hover:shadow-lg hover:bg-blue-500 block mx-auto my-4 p-1 rounded-lg hover:text-white'>
              Update Park
            </button>
          </form>
          <div className='my-5'>
            <button type='button'
              data-testid='delete-button'
              onClick={handleDelete}
              className='w-full hover:shadow-lg hover:bg-red-500 block mx-auto my-4 p-1 rounded-lg hover:text-white'>
              Delete Park
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
