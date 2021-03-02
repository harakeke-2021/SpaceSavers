import React from 'react'

function NewParkButton (props) {
  const { showForm } = props
  return (
    <button
      onClick={showForm}
      className='w-80 h-80 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-500 py-6 text-blue-500 text-9xl text-center block m-auto'
    >
        +
    </button>
  )
}

export default NewParkButton
