exports.up = function(knex) {
    return knex.schema.createTable('prato_ingredientes', table => {
        table.integer('prato_id').unsigned().references('id').inTable('prato');
        table.integer('ingrediente_id').unsigned().references('id').inTable('ingredientes')
        table.primary(['prato_id', 'ingrediente_id'])
    })
};


exports.down = function(knex) {
  knex.schema.dropTableIfExists('prato_ingredientes')
};
