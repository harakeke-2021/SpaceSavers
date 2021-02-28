import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHistoryByOwnerId } from '../actions/owner'

function OwnerHistory (props) {
  const { history } = props.owner
  useEffect(() => {
    getHistoryByOwnerId(3)
  }, [])
  return (<div>
    {history.map((transaction) => {
      return <div key={transaction.id}>{transaction.parkName}: {transaction.cost}</div>
    })}
  </div>)
}

function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerHistory)
