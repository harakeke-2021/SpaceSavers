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
        <div>
          <h2 className='pt-20 pb-10 text-center text-4xl font-black uppercase font-work'>
         My Parks
          </h2>
          <div className='grid grid-cols-12 text-center'>
            <p className='col-start-4 col-span-2 border-b-2 border-transparent hover:border-blue-600 p-2 mt-3 mb-2'>
          Account Balance: ${owner.balance}
            </p>
          </div>
          <OwnerParks />
        </div>
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
