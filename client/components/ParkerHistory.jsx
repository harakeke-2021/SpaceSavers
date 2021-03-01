import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserHistory } from '../actions/user'

function ParkerHistory (props) {
  const { history } = props.user

  useEffect(() => {
    // user id 1 hardcoded in for now
    getUserHistory(1)
  }, [])
  return (
    <div className="xl:mx-32">
      <h2 className='pt-20 pb-10 text-center text-4xl font-black uppercase'>Parking History</h2>
      {history.map((transaction) => {
        return <div key={transaction.historyId}>
          <div>History ID:{transaction.historyId}</div>
          <div>Park ID:{transaction.parkId}</div>
          <div>Parker ID:{transaction.parkerId}</div>
          <div>Start Time:{transaction.startTime}</div>
          <div>End Time:{transaction.endTime}</div>
          <div>Cost:{transaction.cost}</div>
          <div>Finished:{transaction.finished ? 'Yes' : 'No'}</div>
          <div>Park Name:{transaction.parkName}</div>
          <div>Park Address:{transaction.parkAddress}</div>
        </div>
      })}</div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ParkerHistory)
