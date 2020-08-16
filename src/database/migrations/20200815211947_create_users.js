
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('name').unique();
    table.string('password').notNullable();
    table.string('color').notNullable();
    table.string('title').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
