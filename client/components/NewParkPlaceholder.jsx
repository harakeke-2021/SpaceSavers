import React from 'react'

function NewParkPlaceholder (props) {
  const { showForm } = props
  return (
    <div
      onClick={showForm}
      className='w-72 h-72 bg-blue-200'>
      <svg className="h-52 w-52 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
      </svg>
    </div>
  )
}

export default NewParkPlaceholder
