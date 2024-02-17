const { Router } = require('express');

const PratosController = require('../controllers/PratosController');

const pratosRoutes = Router();

const pratosController = new PratosController();

pratosRoutes.get('/', pratosController.create);

module.exports = pratosRoutes;