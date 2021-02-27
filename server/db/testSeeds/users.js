exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, name: 'Kylie', email: 'kylie@example.com' },
        { id: 2, name: 'Freya', email: 'freya@example.com' },
        { id: 3, name: 'Paul', email: 'paul@example.com' }
      ])
    })
}
