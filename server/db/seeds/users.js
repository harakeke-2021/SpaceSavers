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
        { id: 1, name: 'Peter', email: 'peter@example.com', hash: PeterHash },
        { id: 2, name: 'Pete', email: 'pete@example.com', hash: PeteHash },
        { id: 3, name: 'Anna', email: 'anna@example.com', hash: AnnaHash },
        { id: 4, name: 'Clinton', email: 'clinton@example.com', hash: ClintonHash }
      ])
    )
}
