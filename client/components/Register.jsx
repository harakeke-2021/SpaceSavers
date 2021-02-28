import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'

export default function Register (props) {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    name: '',
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

    const { username, name, email, password } = form
    register({ username, name, email, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
      .catch(err => {
        if (err.message === 'NAME_UNAVAILABLE') {
          setError('Name is not available')
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
        <label htmlFor="name">Enter your Name:</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange}/>

        <label htmlFor="username">Enter your UserName:</label>
        <input id="username" name="username" type="text" value={form.username} onChange={handleChange}/>

        <label htmlFor="email">Enter Your Email:</label>
        <input id="email" name="email" type="text" value={form.email} onChange={handleChange}/>

        <label htmlFor="password">Choose a Password:</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange}/>

        <button type="button" onClick={handleSubmit}>Register</button>
      </form>
    </>
  )
}
