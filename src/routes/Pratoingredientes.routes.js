const { Router } = require('express');

const PratoIngredientesController = require('../controllers/PratoIngredientesController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const pratoIngredientesRoutes = Router();

const pratoIngredientesController = new PratoIngredientesController();

pratoIngredientesRoutes.post('/',ensureAutheticated,isAdmin, pratoIngredientesController.create);
pratoIngredientesRoutes.delete('/',ensureAutheticated,isAdmin, pratoIngredientesController.delete);
pratoIngredientesRoutes.get('/:prato_id',ensureAutheticated, pratoIngredientesController.list);

module.exports = pratoIngredientesRoutes;