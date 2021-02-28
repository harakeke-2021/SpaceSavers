import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getParksByOwnerId } from '../actions/owner'
import NewPark from './NewPark'
import OwnerPark from './OwnerPark'
// import { IfAuthenticated } from './Authenticated'

function OwnerParks (props) {
  const { parks } = props.owner
  useEffect(() => {
    getParksByOwnerId(1, props.dispatch)
  }, [])
  return (
    <div className="bg-gray-300 m-10">
      <h3 className="text-2xl uppercase text-center">My Parks</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row">
        {parks.map((park) => {
          return <OwnerPark key={park.id} park={park}/>
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
