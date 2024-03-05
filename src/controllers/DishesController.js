const knex = require("../database/knex");
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
    constructor() {
        this.diskStorage = new DiskStorage();
    }

    async create(request, response) {
        const { title, description, category, price, ingredients } = request.body;

        const checkDishExists = await knex("dishes").where({ title }).first();
        if (checkDishExists) {
            throw new AppError("Este prato já existe no cardápio.");
        }

        const imageName = request.file.filename;
        const filename = await this.diskStorage.saveFile(imageName);

        const [dish_id] = await knex("dishes").insert({
            image: filename,
            title,
            description,
            price,
            category,
        }).returning("id");

        await this.handleIngredients(ingredients, dish_id);

        return response.status(201).json();
    }

    async update(request, response) {
        const { id } = request.params;
        const { title, description, category, price, ingredients } = request.body;

        const dish = await knex("dishes").where({ id }).first();
        if (!dish) throw new AppError("Prato não encontrado.", 404);

        const imageName = request.file?.filename;
        if (imageName) {
            if (dish.image) {
                await this.diskStorage.deleteFile(dish.image);
            }
            dish.image = await this.diskStorage.saveFile(imageName);
        }

        await knex("dishes").where({ id }).update({
            title: title ?? dish.title,
            description: description ?? dish.description,
            category: category ?? dish.category,
            price: price ?? dish.price,
            image: dish.image,
        });

        if (ingredients) {
            await knex("ingredients").where({ dish_id: id }).delete();
            await this.handleIngredients(ingredients, id);
        }

        return response.json({ message: 'Prato atualizado com sucesso' });
    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();
        if (!dish) return response.status(404).json({ error: "Prato não encontrado" });

        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");
        return response.json({ ...dish, ingredients });
    }

    async delete(request, response) {
        const { id } = request.params;
        await knex("dishes").where({ id }).delete();
        return response.json({ message: 'Prato deletado com sucesso' });
    }

    async index(request, response) {
        const { title, ingredients } = request.query;
        let query = knex("dishes");

        if (title) {
            query = query.whereLike("title", `%${title}%`);
        }

        if (ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
            query = query
                .join("ingredients", "dishes.id", "ingredients.dish_id")
                .whereIn("ingredients.name", filterIngredients)
                .distinct("dishes.*");
        }

        const dishes = await query;
        return response.json(dishes);
    }

    async handleIngredients(ingredients, dish_id) {
        if (typeof ingredients === 'string') {
            ingredients = [ingredients];
        }

        const ingredientsToInsert = ingredients.map(ingredient => ({
            name: ingredient,
            dish_id,
        }));

        await knex("ingredients").insert(ingredientsToInsert);
    }
}

module.exports = DishesController;
