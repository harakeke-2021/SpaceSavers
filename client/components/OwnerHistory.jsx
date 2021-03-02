import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHistoryByOwnerId } from '../actions/owner'
import { dateParser } from '../utility'

function OwnerHistory (props) {
  const { history } = props.owner
  useEffect(() => {
    getHistoryByOwnerId()
  }, [])

  return (
    <div className='xl:mx-32'>
      <h2 className='pt-20 pb-5 text-center text-4xl font-black uppercase font-work'>Transaction History</h2>
      <div className=''>
        {history.map((transaction) => {
          return <ul key={transaction.historyId} className='w-96 shadow-lg rounded-lg py-4 block m-auto p-5 my-20 divide-y divide-gray-200'>
            <li>History ID: {transaction.historyId}</li>
            <li>Park ID: {transaction.parkId}</li>
            <li>Parker ID: {transaction.parkerId}</li>
            <li>Start Time: {dateParser(transaction.startTime)}</li>
            <li>End Time: {dateParser(transaction.endTime)}</li>
            <li>Cost: {transaction.cost}</li>
            <li>Finished: {transaction.finished ? 'Yes' : 'No'}</li>
            <li>Park Name: {transaction.parkName}</li>
            <li>Park Address: {transaction.parkAddress}</li>
          </ul>
        })}
      </div>
    </div>
  )
}
function mapStateToProps (state) {
  return {
    owner: state.owner
  }
}

export default connect(mapStateToProps)(OwnerHistory)
