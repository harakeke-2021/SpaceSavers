import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getParksByOwnerId } from '../actions/owner'
import NewPark from './NewPark'
import OwnerPark from './OwnerPark'

function OwnerParks (props) {
  const { parks } = props.owner
  useEffect(() => {
    getParksByOwnerId(1, props.dispatch)
  }, [])
  return (
    <div>
      Owner Parks
      {parks.map((park) => {
        return <OwnerPark park={park}></OwnerPark>
      })}
      <NewPark />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerParks)
