import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateOwnerBalance } from '../actions/owner'
import OwnerParks from './OwnerParks'
import { Link } from 'react-router-dom'

function OwnerDashboard (props) {
  // const [balance, setBalance] = useState(0)
  const { owner } = props

  useEffect(() => {
    console.log('effect running')
    updateOwnerBalance(props.dispatch)
  }, [])

  return (
    <div className="bg-gray-100">
      <div>
        <h2 className="text-4xl uppercase text-center p-10">
          Owner Dashboard
        </h2>
        <div className="grid grid-cols-12 bg-gray-300">
          <p className="col-start-4 col-span-2 text-center">
          Account Balance: ${owner.balance}
          </p>
          <Link to='/owner/history' className="col-start-8 col-span-2 text-center">
          History
          </Link>
        </div>
        <OwnerParks />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerDashboard)
