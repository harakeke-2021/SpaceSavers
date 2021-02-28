const { generateHash } = require('authenticare/server')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => Promise.all([
      generateHash('Peter'),
      generateHash('Pete'),
      generateHash('Anna'),
      generateHash('Clinton')
    ]))
    .then(([PeterHash, PeteHash, AnnaHash, ClintonHash]) =>
      knex('users').insert([
        { id: 1, username: 'Peter', name: 'Peter', email: 'peter@example.com', hash: PeterHash, balance: 0 },
        { id: 2, username: 'Pete', name: 'Pete', email: 'pete@example.com', hash: PeteHash, balance: 0 },
        { id: 3, username: 'Anna', name: 'Anna', email: 'anna@example.com', hash: AnnaHash, balance: 0 },
        { id: 4, username: 'Clinton', name: 'Clinton', email: 'clinton@example.com', hash: ClintonHash, balance: 0 }
      ])
    )
}
