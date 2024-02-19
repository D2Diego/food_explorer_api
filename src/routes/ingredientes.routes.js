const { Router } = require('express');

const IngredientesController = require('../controllers/IngredientesController');

const ingredientesRoutes = Router();

const ingredientesController = new IngredientesController();

ingredientesRoutes.post('/', ingredientesController.create);
ingredientesRoutes.delete('/:id', ingredientesController.delete);

module.exports = ingredientesRoutes;