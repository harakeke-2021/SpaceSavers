import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getActiveParks, endParking } from '../actions/user'

function CurrentParks (props) {
  useEffect(() => {
    getActiveParks()
  }, [])

  const { activeParks } = props.user

  function onClick (e) {
    const parkId = Number(e.target.value)
    endParking(parkId)
  }

  return (
    <div>
      <h2 className='pt-20 pb-10 text-center text-4xl font-black uppercase'>Current Parking</h2>
      <ul>
        {activeParks.map(park => {
          return <div key={park.startTime}>
            <li>{park.parkName}</li>
            <li>{park.parkAddress}</li>
            <button value={park.parkId} onClick={onClick}>Finish Parking</button>
          </div>
        })}
      </ul>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CurrentParks)
