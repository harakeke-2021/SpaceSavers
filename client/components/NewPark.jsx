import React, { useState } from 'react'
import NewParkPlaceholder from './NewParkPlaceholder'
import NewParkForm from './NewParkForm'
import { IfAuthenticated } from './Authenticated'

function NewPark () {
  const [showForm, setShowForm] = useState(false)
  return (
    // <div
    //   onClick={() => {
    //     setShowForm(true)
    //   }}
    //   className='owner-parks'>
    <IfAuthenticated>
      {
        showForm ? (
          <NewParkForm closeForm={() => setShowForm(false)} />
        ) : (
          <NewParkPlaceholder showForm={() => setShowForm(true)} />
        )}
    </IfAuthenticated>
    // </div>
  )
}

export default NewPark
