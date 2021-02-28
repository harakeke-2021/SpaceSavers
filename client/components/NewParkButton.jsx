import React from 'react'

function NewParkButton (props) {
  const { showForm } = props
  return (
    <button
      onClick={showForm}
      className="w-72 h-72 m-10 hover:border-transparent hover:shadow-xs rounded-lg hover:shadow-lg border-2 border-dashed border-blue-400 py-4"
      // className="w-72 h-72 m-20 border-4 rounded-md border-black text-black text-9xl text-center"
    >
        +
    </button>
  )
}

export default NewParkButton
