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
    <div className='w-96 m-10 shadow-lg rounded-lg  py-4 block m-auto p-5 my-20'>
      <form className="border-">
        {/* <label htmlFor='username'>Username:</label> */}
        <input
          id='username'
          name='username'
          type='text'
          value={form.username}
          onChange={handleChange}
          placeholder='username'
          className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 my-5 rounded-lg'/>

        {/* <label htmlFor='password'>Password:</label> */}
        <input
          id='password'
          name='password'
          type='password'
          value={form.password}
          onChange={handleChange}
          placeHolder='password'
          className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg'
        />

        <button type ='button' onClick={handleSubmit} className='w-full hover:shadow-lg hover:bg-blue-500 block mx-auto mt-4 px-5 py-2 rounded-lg my-2'>
          Sign In
        </button>
      </form>

    </div>
  )
}
