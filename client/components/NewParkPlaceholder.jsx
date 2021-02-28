import React from 'react'
import { IfAuthenticated } from './Authenticated'

function NewParkPlaceholder (props) {
  const { showForm } = props
  return (
    <IfAuthenticated>
      <div
        onClick={showForm}
        className='newpark-placeholder'
        style={{ height: '300px', width: '300px', backgroundColor: 'blue' }}>
      New Park Placeholder
      </div>
    </IfAuthenticated>
  )
}

export default NewParkPlaceholder
