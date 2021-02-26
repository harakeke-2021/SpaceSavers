import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

export default function SignIn (props) {
  const [form, setForm] = useState({
    name: '',
    password: ''
  })

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    const { name, password } = form
    signIn({ name, password }, { baseUrl })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
      .catch((e) => { console.log(e.message) })
  }

  return (
    <>
      <h2>Sign In</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange}/>

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange}/>

        <button type ="button" onSubmit={handleSubmit} >Sign In</button>
      </form>
    </>
  )
}
