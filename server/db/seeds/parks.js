exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('parks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {
          id: 1,
          name: 'EDA Parking',
          price: 20.0,
          owner_id: 2,
          occupied: false,
          occupant_id: null,
          address: '12 Morgan Place, Newmarket, Auckland',
          lat: -36.8646253,
          lng: 174.7672811
        },
        {
          id: 2,
          name: 'Sky Tower Parking',
          price: 50.0,
          owner_id: 3,
          occupied: false,
          occupant_id: null,
          address: 'Victoria Street West, Auckland Central, Auckland',
          lat: -36.8484437,
          lng: 174.7600023
        },
        {
          id: 3,
          name: 'UoA - OGG Building',
          price: 30.0,
          owner_id: 1,
          occupied: false,
          occupant_id: null,
          address: '12 Grafton Road, Auckland Central, Auckland',
          lat: -36.853105,
          lng: 174.7693262
        },
        {
          id: 4,
          name: 'Albert Park',
          price: 15.0,
          owner_id: 2,
          occupied: true,
          occupant_id: 1,
          address: '33-43 Princes Street, Auckland Central, Auckland',
          lat: -36.850488045610895,
          lng: 174.76786664060185
        }

      ])
    })
}
