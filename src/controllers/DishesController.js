const knex = require("../database/knex");
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
    async create(request, response) {
        const { title, description, category, price, ingredients } = request.body;
        if (await knex("dishes").where({title}).first()) {
            throw new AppError("Este prato já existe no cardápio.");
        }
        const diskStorage = new DiskStorage();
        const filename = await diskStorage.saveFile(request.file.filename);
        const [dish_id] = await knex("dishes").insert({
            image: filename,
            title,
            description,
            price,
            category,
        }).returning("id");

        const ingredientsInsert = typeof ingredients === "string" ? [{name: ingredients, dish_id}] : ingredients.map(name => ({name, dish_id}));
        await knex("ingredients").insert(ingredientsInsert);

        return response.status(201).json(); 
    }

    async update(request, response) {
        const { id } = request.params;
        const { title, description, category, price, ingredients } = request.body;
        const diskStorage = new DiskStorage();
        const dish = await knex("dishes").where({ id }).first();
        if (!dish) {
            throw new AppError("Prato não encontrado.");
        }
        if (request.file) {
            if (dish.image) {
                await diskStorage.deleteFile(dish.image);
            }
            dish.image = await diskStorage.saveFile(request.file.filename);
        }
        await knex("dishes").where({ id }).update({
            image: dish.image,
            title: title ?? dish.title,
            description: description ?? dish.description,
            category: category ?? dish.category,
            price: price ?? dish.price,
        });

        await knex("ingredients").where({ dish_id: id }).delete();
        const ingredientsInsert = typeof ingredients === "string" ? [{name: ingredients, dish_id: id}] : ingredients.map(name => ({name, dish_id: id}));
        await knex("ingredients").insert(ingredientsInsert);

        return response.status(201).json('Prato atualizado com sucesso');
    }

    async show(request, response) {
        const { id } = request.params;
        const dish = await knex("dishes").where({ id }).first();
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");
        return response.status(201).json({ ...dish, ingredients });
    }

    async delete(request, response) {
        const { id } = request.params;
        await knex("dishes").where({ id }).delete();
        return response.status(202).json();
    }

    async index(request, response) {
        const { title, ingredients } = request.query;
        let dishesQuery = knex("dishes").orderBy("title");

        if (ingredients) {
            const filterIngredients = ingredients.split(',').map(ingredient => ingredient.trim());
            dishesQuery = dishesQuery
                .join("ingredients", "dishes.id", "ingredients.dish_id")
                .whereIn("ingredients.name", filterIngredients)
                .select("dishes.*")
                .distinct();
        }

        if (title) {
            dishesQuery = dishesQuery.whereLike("dishes.title", `%${title}%`);
        }

        const dishes = await dishesQuery;
        for (let dish of dishes) {
            const dishIngredients = await knex("ingredients").where({ dish_id: dish.id });
            dish.ingredients = dishIngredients;
        }
        
        return response.status(200).json(dishes);
    }
}

module.exports = DishesController;
