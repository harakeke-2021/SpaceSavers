exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('parks')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('parks').insert([
        {
          id: 1,
          name: 'Britomart Parking',
          price: 9.99,
          owner_id: 2,
          occupied: false,
          occupant_id: null,
          address: 'Britomart Train Station, Auckland Central, Auckland',
          lat: -36.8444044,
          lng: 174.7673453
        },
        {
          id: 2,
          name: 'Sky Tower Parking',
          price: 19.99,
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
          price: 8.09,
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
          price: 9.5,
          owner_id: 1,
          occupied: false,
          occupant_id: null,
          address: '33-43 Princes Street, Auckland Central, Auckland',
          lat: -36.850488045610895,
          lng: 174.76786664060185
        },
        {
          id: 5,
          name: '90 Sandringham Road',
          price: 8.99,
          owner_id: 6,
          occupied: false,
          occupant_id: null,
          address: '90 Sandringham Road, Sandringham, Auckland',
          lat: -36.87884,
          lng: 174.741731
        },
        {
          id: 6,
          name: '6 Rossmay Terrace',
          price: 7.99,
          owner_id: 4,
          occupied: false,
          occupant_id: null,
          address: '6 Rossmay Terrace, Mount Eden, Auckland',
          lat: -36.8743897,
          lng: 174.7405463
        },
        {
          id: 7,
          name: '45 Walters Road',
          price: 8.50,
          owner_id: 1,
          occupied: false,
          occupant_id: null,
          address: '45 Walters Road, Mount Eden, Auckland',
          lat: -36.8737888,
          lng: 174.7447412
        },
        {
          id: 8,
          name: 'Spark Arena Parking',
          price: 5.50,
          owner_id: 3,
          occupied: false,
          occupant_id: null,
          address: '42-80 Mahuhu Crescent, Parnell, Auckland',
          lat: -36.847183,
          lng: 174.776268
        },
        {
          id: 9,
          name: 'Near Newmarket Station',
          price: 3.99,
          owner_id: 4,
          occupied: false,
          occupant_id: null,
          address: '10 Durville Heights, Remuera, Auckland',
          lat: -36.8705889,
          lng: 174.7776582
        },
        {
          id: 10,
          name: 'Near Eden Park',
          price: 8.00,
          owner_id: 1,
          occupied: false,
          occupant_id: null,
          address: '6-12 Cricket Avenue, Mount Eden, Auckland',
          lat: -36.847183,
          lng: 174.776268
        },
        {
          id: 11,
          name: 'Jacinda\'s Parking Spot',
          price: 49.99,
          owner_id: 2,
          occupied: false,
          occupant_id: null,
          address: 'Beehive, Pipitea, Wellington',
          lat: -41.278342,
          lng: 174.7754181
        },
        {
          id: 12,
          name: 'Wellington Central Prime Location',
          price: 10.99,
          owner_id: 3,
          occupied: false,
          occupant_id: null,
          address: '33 Lambton Quay, Pipitea, Wellington',
          lat: -41.2791202,
          lng: 174.7768321
        },
        {
          id: 13,
          name: 'Xero Wellington',
          price: 8.62,
          owner_id: 4,
          occupied: false,
          occupant_id: null,
          address: '33 Lambton Quay, Pipitea, Wellington',
          lat: -41.2914363,
          lng: 174.7788587
        }
      ])
    })
}
