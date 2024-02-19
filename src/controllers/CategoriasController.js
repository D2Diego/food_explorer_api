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

    async delete (request, response){
        const { id } = request.params;

        const deleted = await knex('categorias').where({ id: id }).del();

        if (deleted){
            response.status(200).json({ message: "Categoria excluída com sucesso"});
        } else {
            response.status(404).json({ message: "Categoria não encontrada"});
        }


    }
}

module.exports = CategoriasController;