
exports.up = function(knex) {
    return knex.schema.createTable('categorys', function(table) {
        table.increments();
        table.string('category').notNullable();
        table.string('description').notNullable();
        
        table.integer('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categorys');
};
