import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

export default function Register (props) {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
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
      <h2>Register</h2>
      <div onClick={hideError}>
        { error && `Error: ${error}` }
      </div>
      <form>
        <label htmlFor="username">Choose a Username:</label>
        <input id="username" name="username" type="text" value={form.username} onChange={handleChange}/>

        <label htmlFor="email">Enter Your Email:</label>
        <input id="email" name="email" type="text" value={form.email} onChange={handleChange}/>

        <label htmlFor="password">Choose a Password:</label>
        <input id="password" name="password" type="text" value={form.password} onChange={handleChange}/>

        <button type="button" onSubmit={handleSubmit}>Register</button>
      </form>
    </>
  )
}
