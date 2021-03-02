import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserHistory } from '../actions/user'

function ParkerHistory (props) {
  const { history } = props.user
  console.log(history)

  useEffect(() => {
    // user id 1 hardcoded in for now
    getUserHistory(4)
  }, [])
  return (
    <div>
      <h2 className='pt-10 pb-5 text-center text-4xl font-black uppercase font-work tracking-wider'>My Parking History</h2>
      {history.map((transaction) => {
        return <div key={transaction.historyId} className='w-96 shadow-lg rounded-lg py-4 block m-auto p-5 my-20 divide-y divide-gray-200'>
          <div>History ID: {transaction.historyId}</div>
          <div>Park ID: {transaction.parkId}</div>
          <div>Parker ID: {transaction.parkerId}</div>
          <div>Start Time: {transaction.startTime}</div>
          <div>End Time: {transaction.endTime}</div>
          <div>Cost: ${transaction.cost}</div>
          <div>Finished: {transaction.finished ? 'Yes' : 'No'}</div>
          <div>Park Name: {transaction.parkName}</div>
          <div>Park Address: {transaction.parkAddress}</div>
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
