
exports.up = function(knex) {
  return knex.schema.createTable('categorias', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.timestamps(true, true);
  })
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('categorias')
};
