import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { updateOwnerBalance } from '../actions/owner'
import OwnerParks from './OwnerParks'
import { IfAuthenticated } from './Authenticated'
import OwnerHistory from './OwnerHistory'

function OwnerDashboard (props) {
  // const [balance, setBalance] = useState(0)
  const { owner } = props

  useEffect(() => {
    updateOwnerBalance(props.dispatch)
  }, [])

  return (
    <IfAuthenticated>
      <div>
        <div className='border-b-2 border-gray-200'>
          <h2 className='pt-16 pb-5 text-center text-5xl font-black uppercase font-work text-blue-600'>
         Owner Dashboard
          </h2>
          <p className='uppercase text-center w-52 border-b-2 border-transparent hover:border-blue-500 p-2 mx-auto mt-3 mb-2 font-semibold font-work'>
          Account Balance: ${owner.balance}
          </p>
        </div>
        <OwnerParks />
      </div>
      <OwnerHistory/>
    </IfAuthenticated>

  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerDashboard)
