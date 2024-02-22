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

    async updated(request,response){
        const { nome, categoria_id, descricao, preco, path_image } = request.body;
        const { id } = request.params;

        const prato = await knex('prato').where({id: id}).first();

        if(!prato){
            throw new AppError('Esse prato não existe!')
        }
        
        prato.nome = nome ?? prato.nome;
        prato.categoria_id = categoria_id ?? prato.categoria_id;
        prato.descricao = descricao ?? prato.descricao;
        prato.preco = preco ?? prato.preco;
        prato.path_image = path_image ?? prato.path_image;


        const precoFloat = parseFloat(preco);
        if (isNaN(precoFloat)) {
            throw new AppError('O preço deve ser um número válido.');
        }

            await knex('prato').update({
                nome,
                categoria_id,
                descricao, 
                preco: precoFloat,
                path_image,
                updated_at: knex.fn.now()
            });

            return response.status(201).json({ id, message: 'Prato alterado com sucesso' });
        
    }

    async read(request, response){
        const { id } = request.params;

        try{
            const prato = await knex('prato').where({ id }).first();

            if(!prato){
                throw new AppError('Prato não encontrado')
            }

            return response.json(prato)
        } catch {
            throw new AppError('Erro ao busucar prato', 500)
        }
    }

    async delete(request, response){
        const { id } =  request.params;

        const deleted = await knex('prato').where({ id: id}).del();

        if(deleted){
            response.status(200).json({ message: 'Prato deletado com sucesso!'})
        } else {
            reponse.status(404).json({ message: 'Prato não encontrado'}) 
        }
    }
}

module.exports = PratosController;
