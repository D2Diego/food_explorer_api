const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class IngredientesController {
    async create(request, response) {
        const { nomes } = request.body; 

        if (!nomes || nomes.length === 0) {
            throw new AppError('Ao menos um nome é obrigatório.', 400);
        }

        const ingredientesInseridos = [];

        for (const nome of nomes) {
            if (!nome) continue;

            const checkIngredientExists = await knex('ingredientes').where({ nome }).first();

            if (!checkIngredientExists) {
                
                const [ingredienteId] = await knex('ingredientes').insert({ nome }).returning('id');
                ingredientesInseridos.push({ id: ingredienteId, nome });
            } else {
                console.log(`Ingrediente '${nome}' já existe e foi ignorado.`);
            }
        }

        return response.status(201).json({ message: 'Ingredientes criados com sucesso', ingredientes: ingredientesInseridos });
    }

    async delete(request, response) {
        const { id } = request.params;

        const deleted = await knex('ingredientes').where({ id }).del();

        if (deleted) {
            response.status(200).json({ message: 'Ingrediente excluído com sucesso' });
        } else {
            response.status(404).json({ message: 'Ingrediente não encontrado' });
        }
    }
}

module.exports = IngredientesController;
