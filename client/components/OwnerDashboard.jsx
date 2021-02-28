import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateOwnerBalance } from '../actions/owner'
import OwnerParks from './OwnerParks'
import { Link } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'

function OwnerDashboard (props) {
  // const [balance, setBalance] = useState(0)
  const { owner } = props

  useEffect(() => {
    updateOwnerBalance(props.dispatch)
  }, [])

  return (
    <IfAuthenticated>
      <div>
        <div>
          <h2 className='pt-20 pb-10 text-center text-blue-600 text-4xl font-black uppercase'>
         Dashboard
          </h2>
          <div className='grid grid-cols-12 text-center'>
            <p className='col-start-4 col-span-2 border-b-2 border-transparent hover:border-blue-600 p-2 mt-3 mb-2'>
          Account Balance: ${owner.balance}
            </p>
            <Link to='/owner/history' className='col-start-8 col-span-1 border-b-2 border-transparent hover:border-blue-600 p-2 mt-3 mb-2'>
          History
            </Link>
          </div>
          <OwnerParks />
        </div>
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
