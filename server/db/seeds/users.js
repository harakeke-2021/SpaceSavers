exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Peter', email: 'peter@example.com' },
        { id: 2, name: 'Pete', email: 'pete@example.com' },
        { id: 3, name: 'Anna', email: 'anna@example.com' },
        { id: 4, name: 'Clinton', email: 'clinton@example.com' }
      ])
    })
}
