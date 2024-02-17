const { Router } = require('express');

const CategoriasController = require('../controllers/CategoriasController');

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();

categoriasRoutes.get('/', categoriasController.create);
categoriasRoutes.delete('/:id', categoriasController.delete);

module.exports = categoriasRoutes;