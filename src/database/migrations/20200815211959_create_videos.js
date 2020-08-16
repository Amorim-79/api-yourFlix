
exports.up = function(knex) {
    return knex.schema.createTable('videos', function(table) {
        table.increments();
        table.string('title').notNullable();
        table.string('url').notNullable();
        
        table.string('category').notNullable();
        table.integer('user_id').notNullable();

        table.foreign('category').references('id').inTable('categorys');
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('videos');
};
