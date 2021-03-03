import React from 'react'
import { screen, render } from '@testing-library/react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.jsx'
import { isAuthenticated } from 'authenticare/client'

jest.mock('authenticare/client')

describe('IfAuthenticated', () => {
  it('does not display children if isAuthenticated returns false', () => {
    isAuthenticated.mockImplementation(() => false)
    render(
      <IfAuthenticated>
        <p>child</p>
      </IfAuthenticated>
    )
    const children = screen.queryByText('child')
    expect(children).toBeNull()
  })
})

describe('IfNotAuthenticated', () => {
  it('does not display children if isAuthenticated returns true', () => {
    isAuthenticated.mockImplementation(() => true)
    render(
      <IfNotAuthenticated>
        <p>child</p>
      </IfNotAuthenticated>
    )
    const children = screen.queryByText('child')
    expect(children).toBeNull()
  })
})
