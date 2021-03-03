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
    <div className='border-b-2 border-gray-200 pb-10'>
      <h3 className='pt-10 pb-5 text-center text-3xl font-semibold uppercase font-work'>My Parks</h3>
      <div className='flex flex-wrap flex-auto mx-5 gap-10 my-5'>
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
