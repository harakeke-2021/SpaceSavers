exports.up = function (knex) {
  return knex.schema.createTable('parks', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('owner_id').references('users.id')
    table.string('address')
    table.float('lat')
    table.float('lng')
    table.decimal('price', 10, 2)
    table.boolean('occupied')
    table.integer('occupant_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('parks')
}
