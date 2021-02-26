import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

export default function Register (props) {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const hideError = () => {
    setError('')
  }

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    const { username, password } = form
    register({ username, password })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
      .catch(err => {
        if (err.message === 'USERNAME_UNAVAILABLE') {
          setError('Username is not available')
        }
      })
  }

  return (
    <>
        <div style={{'color: red; cursor: pointer;'}} onClick={hideError}>
        { error && `Error: ${error}` }
        </div>
      <form>
        <label>Choose a Username:</label>
        <input type="text" onChange={handleChange}/>

        <label>Choose a Password:</label>
        <input type="text" onChange={handleChange}/>

        <button onSubmit={handleSubmit}>Register</button>
      </form>
    </>
  )
}
