exports.up = function (knex) {
  return knex.schema.createTable('park_history', (table) => {
    table.increments('id').primary()
    table.integer('park_id').references('parks.id')
    table.integer('user_id').references('users.id')
    table.timestamp('start_time')
    table.timestamp('end_time')
    table.decimal('cost', 2)
    table.boolean('finished').defaultTo(false)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('parks')
}
