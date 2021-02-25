exports.up = function (knex) {
  return knex.schema.createTable('parks', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.integer('owner_id')
    table.foreign('owner_id').references('users.id')
    table.string('address')
    table.string('latlng')
    table.decimal('price', 2)
    table.boolean('occupied')
    table.integer('occupant_id')
    table.foreign('occupant_id').references('users.id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('parks')
}
