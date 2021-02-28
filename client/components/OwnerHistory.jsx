import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHistoryByOwnerId } from '../actions/owner'

function OwnerHistory (props) {
  const { history } = props.owner
  useEffect(() => {
    // user id 3 hardcoded in for now
    getHistoryByOwnerId(3)
  }, [])

  const tempStyle = {
    border: '1px solid black'
  }
  return (<div>
    {history.map((transaction) => {
      return <div style={tempStyle} key={transaction.historyId}>
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
    })}
  </div>)
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerHistory)
