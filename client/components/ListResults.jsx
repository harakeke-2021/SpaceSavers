import React from 'react'

function ListResults () {
  const results = [{
    address: '55 Wellesley Street East, Auckland Central, Auckland 1010',
    price: '$5.00'
  }, {
    address: 'Level 5/12 Morgan Street, Newmarket, Auckland 1023',
    price: '$4.50'
  }, {
    address: '2 Park Road, Grafton, Auckland 1023',
    price: '$5.50'
  }]

  return (
    <div>
      <ul>
        {results.map(result => {
          return <li key ={result.address}>{result.address} {result.price}</li>
        })}
      </ul>
    </div>
  )
}

export default ListResults
