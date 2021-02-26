import React, { useState } from 'react'
import NewParkPlaceholder from './NewParkPlaceholder'
import NewParkForm from './NewParkForm'

function NewPark() {
  const [showForm, setShowForm] = useState(false)
  return (
    // <div
    //   onClick={() => {
    //     setShowForm(true)
    //   }}
    //   className='owner-parks'>
    showForm ? (
      <NewParkForm closeForm={() => setShowForm(false)} />
    ) : (
      <NewParkPlaceholder showForm={() => setShowForm(true)} />
    )
    // </div>
  )
}

export default NewPark
