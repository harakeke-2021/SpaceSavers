import React, { useState } from 'react'
import NewParkButton from './NewParkButton'
import NewParkForm from './NewParkForm'
import { IfAuthenticated } from './Authenticated'

function NewPark () {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <IfAuthenticated>
        {
          showForm ? (
            <NewParkForm closeForm={() => setShowForm(false)} />
          ) : (
            <NewParkButton showForm={() => setShowForm(true)} />
          )}
      </IfAuthenticated>
    </>
  )
}

export default NewPark
