import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getHistoryByOwnerId } from '../actions/owner'
import { dateParser } from '../utility'
import { v4 } from 'uuid'

function OwnerHistory (props) {
  const { history } = props.owner
  useEffect(() => {
    getHistoryByOwnerId()
  }, [])

  return (
    <div className='sm-mx-2 md:mx-5 xl:mx-32'>
      <h3 className='pt-10 pb-5 text-center text-3xl font-semibold uppercase font-roboto tracking-wider'>Transaction History</h3>
      <div className='flex flex-col my-5 m-auto'>
        <div className='my-2 overflow-x-auto'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-blue-500'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                      Park
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                      Parker
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                      Length
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
                      Income
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>

                  { history.map((transaction) => {
                    return (
                      <tr key={v4()}>

                        <td key={v4()} className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>{transaction.parkName}</div>
                          <div className='text-sm text-gray-500'>{transaction.parkAddress}</div>
                        </td>

                        <td key={v4()} className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>ID: {transaction.parkerId}</div>
                        </td>

                        <td key={v4()} className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>Start: {dateParser(transaction.startTime)}</div>
                          <div className='text-sm font-medium text-gray-900'>End:   {dateParser(transaction.endTime)}</div>
                        </td>

                        <td key={v4()} className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>{transaction.finished ? 'Complete' : 'Incomplete'}</div>
                        </td>

                        <td key={v4()}className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>${transaction.cost} </div>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
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
