const { Router } = require('express');

const PratoIngredientesController = require('../controllers/PratoIngredientesController');

const pratoIngredientesRoutes = Router();

const pratoIngredientesController = new PratoIngredientesController();

pratoIngredientesRoutes.post('/', pratoIngredientesController.create);

module.exports = pratoIngredientesRoutes;