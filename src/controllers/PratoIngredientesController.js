const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class PratoIngredientesController{
    async create(request, response) {
        const { prato_id, ingrediente_ids } = request.body;
      
        if (!prato_id || !ingrediente_ids || ingrediente_ids.length === 0) {
          throw new AppError('Os IDs do prato e dos ingredientes são obrigatórios.', 400);
        }
      
        const pratoExists = await knex('prato').where({ id: prato_id }).first();
        if (!pratoExists) {
          throw new AppError('Prato não encontrado.', 404);
        }
      
        const pratoIngredientes = ingrediente_ids.map(ingrediente_id => ({
          prato_id,
          ingrediente_id
        }));
      
        await knex('prato_ingredientes').insert(pratoIngredientes);
      
        return response.status(201).json({ message: 'Ingredientes adicionados ao prato com sucesso.' });
      }
}

module.exports = PratoIngredientesController;