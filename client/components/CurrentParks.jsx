import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getActiveParks } from '../actions/user'

function CurrentParks (props) {
  useEffect(() => {
    getActiveParks()
  }, [])

  const { activeParks } = props.user
  console.log('Testing', activeParks)

  return (
    <>
      <h2 className='pt-10 pb-5 text-center text-4xl font-black uppercase font-work tracking-wider'>Current Parking</h2>
      <div className='w-3/4 my-10 block m-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
          {activeParks.map(park => {
            return (
              <div key={park.startTime} className='w-96 h-auto shadow-lg rounded-lg py-4 mx-auto p-5 my-20 text-center'>
                <div>
                  <img src='./images/park.png' alt='carpark symbol' className='h-20 block mx-auto m-full pb-3'/>
                </div>
                <ul className=''>
                  <li className='text-lg capitalize font-light'>{park.parkName}</li>
                  <li className='text-2xl capitalize font-medium'>{park.parkAddress}</li>
                  {/* <li className='text-lg py-1'>{`$ ${park.price}`}/hr</li> */}
                </ul>
                <button className='w-1/2 hover:shadow-lg bg-red-400 hover:bg-red-500 block mx-auto my-2 p-1 rounded-lg text-white'>
                  Finish Parking
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CurrentParks)
