import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateOwnerBalance } from '../actions/owner'
import { IfAuthenticated } from './Authenticated'

function OwnerDashboard (props) {
  const { owner } = props

  useEffect(() => {
    updateOwnerBalance(props.dispatch)
  }, [])

  return (
    <IfAuthenticated>
      <div className='owner-dashboard'>
        <div>dashboard component</div>
        <div>Account Balance: ${owner.balance} </div>
      </div>
    </IfAuthenticated>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerDashboard)
