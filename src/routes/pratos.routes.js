const { Router } = require('express');

const PratosController = require('../controllers/PratosController');

const pratosRoutes = Router();

const pratosController = new PratosController();

pratosRoutes.get('/', pratosController.create);
pratosRoutes.put('/:id', pratosController.updated);
pratosRoutes.delete('/:id', pratosController.delete);

module.exports = pratosRoutes;