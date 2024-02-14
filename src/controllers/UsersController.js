const AppError = require('../utils/AppError');

const sqliteConnection = require("../database/sqlite");
const knex = require('../database/knex');

class UsersController {
  async create(request, response) {
   const { name, email, password } = request.body;

   const database = await sqliteConnection();
   const checkUsersExists = await knex('users').where({ email: email }).select('*')

   if (checkUsersExists) {
    throw new AppError('Este email já está em uso')
  }

    return response.status(201).json()
  }
}

module.exports = UsersController;