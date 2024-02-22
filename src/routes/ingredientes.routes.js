const { Router } = require('express');

const IngredientesController = require('../controllers/IngredientesController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const ingredientesRoutes = Router();

const ingredientesController = new IngredientesController();

ingredientesRoutes.post('/',ensureAutheticated,isAdmin, ingredientesController.create);
ingredientesRoutes.delete('/:id',ensureAutheticated,isAdmin, ingredientesController.delete);

module.exports = ingredientesRoutes;