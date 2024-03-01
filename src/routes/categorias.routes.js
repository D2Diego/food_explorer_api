const { Router } = require('express');

const CategoriasController = require('../controllers/CategoriasController');

const ensureAutheticated = require('../middlewares/ensureAutheticated');
const isAdmin = require('../middlewares/isAdmin');

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();

categoriasRoutes.post('/',ensureAutheticated,isAdmin, categoriasController.create);
categoriasRoutes.delete('/:id',ensureAutheticated,isAdmin, categoriasController.delete);
categoriasRoutes.get('/',ensureAutheticated,isAdmin, categoriasController.list);

module.exports = categoriasRoutes;