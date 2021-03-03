exports.seed = function (knex) {
  return knex('park_history').del()
    .then(function () {
      return knex('park_history').insert([
        {
          id: 1,
          park_id: 1,
          user_id: 1,
          start_time: 1614456000,
          end_time: 1614484800,
          cost: 160.00,
          finished: true
        },
        {
          id: 2,
          park_id: 1,
          user_id: 2,
          start_time: 1614456000,
          end_time: 1614470400,
          cost: 80.00,
          finished: true
        },
        {
          id: 3,
          park_id: 3,
          user_id: 3,
          start_time: 1614456000,
          end_time: 1614470400,
          cost: 80.00,
          finished: true
        },
        {
          id: 4,
          park_id: 2,
          user_id: 4,
          start_time: 1614456000,
          end_time: 1614470400,
          cost: 18.00,
          finished: true
        },
        {
          id: 5,
          park_id: 2,
          user_id: 1,
          start_time: 1614456000,
          end_time: 1614474400,
          cost: 24.00,
          finished: true
        },
        {
          id: 6,
          park_id: 3,
          user_id: 2,
          start_time: 1614456000,
          end_time: 1614470300,
          cost: 20.00,
          finished: true
        },
        {
          id: 7,
          park_id: 1,
          user_id: 3,
          start_time: 1614456000,
          end_time: 1614460400,
          cost: 34.00,
          finished: true
        },
        {
          id: 8,
          park_id: 1,
          user_id: 4,
          start_time: 1614456000,
          end_time: 1614470400,
          cost: 80.00,
          finished: true
        }
      ])
    })
}
