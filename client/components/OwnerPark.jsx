import React, { useState } from 'react'
import { IfAuthenticated } from './Authenticated'
import EditOwnerPark from './EditOwnerPark'

function OwnerPark (props) {
  const [update, setUpdate] = useState(false)

  const { name, address, price, occupied, id } = props.park

  function openUpdateForm (e) {
    e.preventDefault()
    setUpdate(true)
  }

  function closeEditForm () {
    setUpdate(false)
  }

  return (
    <>
      <IfAuthenticated>
        {/* <div > */}
        {update ? (
          <EditOwnerPark
            id={id}
            setRender={props.setRender}
            render={props.render}
            closeEditForm={closeEditForm}
            parkName={name}
            price={price}
          />
        )
          : (
            <div className='w-80 h-80 text-center object-center grid-span-3 hover:bg-blue-500 hover:border-transparent hover:shadow-lg rounded-lg p-5 border border-blue-500 block mx-auto hover:text-white'>
              <button onClick={openUpdateForm} className='relative left-28'>
             Edit
              </button>

              <div className='my-2'>
                <div>
                  <img src='./images/park.png' alt='carpark symbol' className='h-14 block mx-auto pb-3'/>
                </div>
                <ul className='text-center'>
                  <li className='text-lg capitalize font-light'>{name}</li>
                  <li className='text-2xl capitalize font-medium'>{address}</li>
                  <li className='text-lg py-1'>{`$ ${price}`}/hr</li>
                </ul>
                { occupied
                  ? <div className='w-1/2 px-2 text-l py-1 rounded-lg  bg-red-500 mx-auto'>Occupied</div>
                  : <div className='w-1/2 px-2 text-l py-1 rounded-lg bg-green-500 text-white mx-auto'>Unoccupied</div>
                }
              </div>
            </div>
          )
        }
        {/* </div> */}

      </IfAuthenticated>
    </>
  )
}

export default OwnerPark
