
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('password');
    table.string('avatar').nullable();
    table.enum('role', ['common', 'admin']).defaultTo('common');
    table.timestamps(true, true);
  
});


exports.down = knex => knex.schema.dropTable("users", table => {
  
});
