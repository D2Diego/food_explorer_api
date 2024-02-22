const { request, response } = require('express');
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

      async delete(request, response) {
        const { prato_id, ingrediente_ids } = request.body;
      
        // Verifica se prato_id ou ingrediente_ids não estão definidos ou se ingrediente_ids está vazio
        if (!prato_id || !ingrediente_ids || ingrediente_ids.length === 0) {
          return response.status(400).json({ message: 'O prato_id e ingrediente_ids são necessários e não podem ser vazios.' });
        }
      
        try {
          const deleted = await knex('prato_ingredientes')
            .where({ prato_id })
            .whereIn('ingrediente_id', ingrediente_ids)
            .del();
      
          if (deleted) {
            return response.status(200).json({ message: 'Ingredientes removidos do prato com sucesso!' });
          } else {
            // Se nenhum registro foi deletado, possivelmente não foi encontrado
            return response.status(404).json({ message: 'Relacionamento prato-ingrediente não encontrado' });
          }
        } catch (error) {
          console.error(error);
          return response.status(500).json({ message: 'Erro ao tentar deletar ingredientes do prato.' });
        }
      }
}
 
module.exports = PratoIngredientesController;