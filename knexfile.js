const path = require("path")

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done) 
      }
    },
      migrations:{
        directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
      },
    useNullAsDefault: true
  },
};
