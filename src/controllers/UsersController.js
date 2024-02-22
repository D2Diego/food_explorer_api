const AppError = require('../utils/AppError');
const { hash, compare } = require('bcryptjs')
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

  async update(request, response){
    const { name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const user = await knex('users').where({ id: user_id }).first();

    if(!user){
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await knex('users').where({ email: email }).first();

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError('Este e-mail já está em uso')
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError('Você precisa digitar a senha antiga')
    }

    if(password && old_password){
      const chekOldPassword = await compare(old_password, user.password)

      if(!chekOldPassword){
        throw new AppError('A senha antiga não confere')
      }

      user.password = await hash(password, 9)
    }

    await knex('users').where({ id: user_id }).update({
      name: name,
      email: email,
      password: user.password,
      updated_at: knex.fn.now()
      }).finally(() => {knex.destroy() });

      return response.json();
  }
}

module.exports = UsersController;