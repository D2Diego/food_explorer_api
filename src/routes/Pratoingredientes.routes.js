const { Router } = require('express');

const PratoIngredientesController = require('../controllers/PratoIngredientesController');

const pratoIngredientesRoutes = Router();

const pratoIngredientesController = new PratoIngredientesController();

pratoIngredientesRoutes.get('/', pratoIngredientesController.create);
pratoIngredientesRoutes.delete('/', pratoIngredientesController.delete);
pratoIngredientesRoutes.get('/:prato_id', pratoIngredientesController.list);

module.exports = pratoIngredientesRoutes;