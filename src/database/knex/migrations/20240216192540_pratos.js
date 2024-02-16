
exports.up = function(knex) {
  return knex.schema.createTable('prato', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.integer('categoria_id').unsigned().references('id').inTable('categorias');
    table.text('descrição');
    table.decimal('preco', 10, 2).notNullable();
    table.string('path_image');
    table.timestamps(true, true);
  })
};


exports.down = function(knex) {
  return knex.schema.dropTableIfExists('prato');
};
