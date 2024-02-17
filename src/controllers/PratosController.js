const AppError = require("../utils/AppError");
const knex = require('../database/knex');

class PratosController {
    async create(request, response) {
        const { nome, categoria_id, descricao, preco, path_image } = request.body;

        if (!nome || categoria_id == null || !descricao || preco == null || !path_image) {
            throw new AppError('É obrigatório completar todos os campos.');
        }

        const precoFloat = parseFloat(preco);
        if (isNaN(precoFloat)) {
            throw new AppError('O preço deve ser um número válido.');
        }

        try {
            const [pratoId] = await knex('prato').insert({
                nome,
                categoria_id,
                descricao, 
                preco: precoFloat,
                path_image
            });

            return response.status(201).json({ id: pratoId, message: 'Prato criado com sucesso' });
        } catch (error) {
            console.error(error);
            throw new AppError('Erro ao criar prato.');
        }
    }
}

module.exports = PratosController;
