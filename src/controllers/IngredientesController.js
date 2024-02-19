const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class IngredientesController{
    async create(request, response){
        const { nome } = request.body;

        if(!nome){
            throw new AppError('O nome é obrigatório.', 400)
        }

        const checkIngredientExists = await knex('ingredientes').where({ nome }).first();

        if(checkIngredientExists){
            throw new AppError('Esse ingrediente já existe', 400)
        }

        await knex('ingredientes').insert({
            nome
        })

        return response.status(201).json({message: 'Ingediente criado com sucesso'});
    }

        async delete(request, response){
            const { id } = request.params;

            const deleted = await knex('ingredientes').where({ id: id }).del();

            if(deleted){
                response.status(200).json({ message: 'Ingrediente excluido com sucesso'})
            } else {
                response.status(404).json({ message: 'Ingrediente não encontrado'})
            }
        }

}

module.exports = IngredientesController;