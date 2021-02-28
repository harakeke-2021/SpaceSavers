exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('parks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {
          id: 1,
          name: 'Test park 1',
          owner_id: 2,
          address: '1 test address',
          lat: -36.8646253,
          lng: 174.7672811,
          price: 10,
          occupied: 0,
          occupant_id: null
        },
        {
          id: 2,
          name: 'Test park 2',
          owner_id: 2,
          address: '2 test address',
          lat: -36.853105,
          lng: 174.7693262,
          price: 2,
          occupied: 0,
          occupant_id: null
        }
      ])
    })
}