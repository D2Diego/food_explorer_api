const { Router } = require('express');

const CategoriasController = require('../controllers/CategoriasController');

const categoriasRoutes = Router();

const categoriasController = new CategoriasController();

categoriasRoutes.get('/', categoriasController.create);

module.exports = categoriasRoutes;