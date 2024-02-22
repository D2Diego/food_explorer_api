const knex = require('../database/knex');
const AppError = require('../utils/AppError');

async function isAdmin(request, response, next){
    const{ id: user_id } = request.user;

    const user = await knex('users').where({ id: user_id}).first();

    if(!user){
        throw new AppError('Usuário não encontrado', 404);
    }

    if( user.role !== 'admin'){
        throw new AppError('Usuário não tem permissão para realizar essa ação', 403)
    }

    return next();
}

module.exports = isAdmin;