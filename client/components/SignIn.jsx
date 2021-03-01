import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'
import { baseApiUrl as baseUrl } from '../config'

export default function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
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

    const { username, password } = form
    signIn({ username, password }, { baseUrl })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
      .catch((e) => { console.log(e.message) })
  }

  return (
    <div className='w-72 h-72 m-10 shadow-lg rounded-lg  py-4 block m-auto'>
      <form>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" type="text" value={form.username} onChange={handleChange}/>

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" value={form.password} onChange={handleChange}/>

        <button type ="button" onClick={handleSubmit} >Sign In</button>
      </form>
    </div>
  )
}
