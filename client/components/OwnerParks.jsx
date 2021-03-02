import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getParksByOwnerId } from '../actions/owner'
import NewPark from './NewPark'
import OwnerPark from './OwnerPark'

function OwnerParks (props) {
  const [render, setRender] = useState(0)
  const { parks } = props.owner
  useEffect(() => {
    getParksByOwnerId()
  }, [render])
  return (
    <div className='w-3/4 my-10 block m-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row center-object gap-y-10'>
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
