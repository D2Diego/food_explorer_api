const AppError = require('../utils/AppError');
const { hash } = require('bcryptjs')
const knex = require('../database/knex');

class UsersController {
  async create(request, response) {
   const { name, email, password } = request.body;

   const checkUsersExists = await knex('users').where({ email: email }).first();

   if (checkUsersExists) {
    throw new AppError('Este email já está em uso')
  }


    const hashedPassword = await hash(password, 9)
  await knex('users').insert({
    name: name,
    email: email,
    password: hashedPassword,
  });

    return response.status(201).json()
  }
}

module.exports = UsersController;