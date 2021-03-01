import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'

export default function Register (props) {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    rego: ''
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

    const { username, name, email, password, rego } = form
    register({ username, name, email, password, rego }, { baseUrl })
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
      <div onClick={hideError}>
        { error && `Error: ${error}` }
      </div>
      <div className='w-96 shadow-lg rounded-lg py-4 block m-auto p-5 my-20 divide-y divide-light-blue-400'>
        <form>
          <input
            id='name'
            name='name'
            type='text'
            value={form.name}
            onChange={handleChange}
            placeholder='name'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg my-2'
          />

          <input
            id='username'
            name='username'
            type='text'
            value={form.username}
            onChange={handleChange}
            placeholder='username'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg my-2'
          />

          <input
            id='rego'
            name='rego'
            type='text'
            value={form.rego}
            onChange={handleChange}
            placeholder='car registration'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg my-2'
          />

          <input
            id='email'
            name='email'
            type='text'
            value={form.email}
            onChange={handleChange}
            placeholder='email'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg my-2'
          />

          <input
            id='password'
            name='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            placeholder='password'
            className='w-full border-b-1 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-0 rounded-lg my-2'
          />

          <button type='button' onClick={handleSubmit} className='w-full hover:shadow-lg hover:bg-blue-500 hover:text-white block mx-auto mt-4 px-5 py-2 rounded-lg my-2'>
            Register
          </button>
        </form>
      </div>
    </>
  )
}
