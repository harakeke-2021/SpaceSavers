import React from 'react'

function NewParkPlaceholder(props) {
  const { showForm } = props
  return (
    <div
      onClick={showForm}
      className='newpark-placeholder'
      style={{ height: '300px', width: '300px', backgroundColor: 'blue' }}>
      New Park Placeholder
    </div>
  )
}

export default NewParkPlaceholder
