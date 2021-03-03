import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getActiveParks, getUserHistory } from '../actions/user'
import { endParking } from '../api/currenParksHelper'

function CurrentParks (props) {
  useEffect(() => {
    getActiveParks()
  }, [onClick])

  const { activeParks } = props.user

  function onClick (e) {
    const historyId = Number(e.target.value)
    endParking(historyId)
    getUserHistory()
  }

  return (
    <div className='border-b-2 border-gray-200 pb-10'>
      <h3 className='pt-10 pb-5 text-center text-3xl font-semibold uppercase font-work'>Current Parking</h3>

      {activeParks.length === 0
        ? <div className='block mx-auto text-center'>
          <p className='capitalize'>You are not currently parking</p>
          <div className='my-4'>
            <Link to={'/'} className='rounded-lg py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          Find My Park
            </Link>
          </div>
        </div>
        : null }

      <div className='flex flex-wrap flex-auto mx-5 gap-10 my-5'>
        {activeParks.map(park => {
          return (
            <div key={park.startTime} className='w-96 h-72 text-center object-center border border-gray-200 shadow-lg rounded-lg py-6 m-auto px-5 text-center'>
              <img src='./images/park.png' alt='carpark symbol' className='h-20 block mx-auto m-full pb-3'/>
              <ul className=''>
                <li className='text-lg capitalize font-light'>{park.parkName}</li>
                <li className='text-2xl capitalize font-medium'>{park.parkAddress}</li>
              </ul>
              <button onClick={onClick} value={park.historyId} className='w-1/2 hover:shadow-lg bg-red-400 hover:bg-red-500 block mx-auto my-2 p-1 rounded-lg text-white'>
                  Finish Parking
              </button>
            </div>
          )
        })}
      </div>
    </div>

  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CurrentParks)
