const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class CategoriasController{
    async create (request, response){
        const { nome } = request.body;

        const checkCategoriasExists = await knex('categorias').where({ nome: nome }).first();

        if(checkCategoriasExists){
            throw new AppError('Essa categoria já existe');
        }

        await knex('categorias').insert({
            nome : nome
        })

        return response.status(201).json()
    }
}

module.exports = CategoriasController;