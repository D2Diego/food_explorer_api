const { Router } = require('express');

const PratosController = require('../controllers/PratosController');

const pratosRoutes = Router();

const pratosController = new PratosController();

pratosRoutes.get('/', pratosController.create);
pratosRoutes.put('/:id', pratosController.updated);

module.exports = pratosRoutes;