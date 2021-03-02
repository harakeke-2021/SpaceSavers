import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getParksByOwnerId } from '../actions/owner'
import NewPark from './NewPark'
import OwnerPark from './OwnerPark'
// import { IfAuthenticated } from './Authenticated'

function OwnerParks (props) {
  const [render, setRender] = useState(0)
  const { parks } = props.owner
  useEffect(() => {
    getParksByOwnerId()
  }, [render])
  return (
    <div className='my-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row center-object gap-y-10'>
        {parks.map((park) => {
          return <OwnerPark setRender={setRender} render={render} key={park.id} park={park}/>
        })}
        <NewPark />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerParks)
