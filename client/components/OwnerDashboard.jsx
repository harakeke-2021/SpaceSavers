import React, { useState, useEffect } from 'react'
import { getOwnerBalance } from '../api/ownerHelper'

function OwnerDashboard(props) {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getOwnerBalance()
      .then((res) => {
        setBalance(res.body.balance)
        return null
      })
      .catch((err) => console.log(err.message))
  }, [])

  return (
    <div className='owner-dashboard'>
      <div>dashboard component</div>
      <div>Account Balance: ${balance} </div>
    </div>
  )
}

export default OwnerDashboard
