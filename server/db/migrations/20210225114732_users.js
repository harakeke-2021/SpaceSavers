exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('username')
    table.string('name')
    table.string('email')
    table.binary('hash')
    table.binary('balance')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
